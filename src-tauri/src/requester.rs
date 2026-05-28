use serde::{Deserialize, Serialize};
use std::time::Instant;
use crate::AppState;
use reqwest::header::{HeaderName,HeaderValue};
use thiserror::Error;
use base64::Engine;
use base64::engine::general_purpose::STANDARD as BASE64;
use serde_urlencoded;

#[derive(Debug, Error, Serialize)]
pub enum HttpError {
    #[error("Network error: {0}")]
    Network(String),

    #[error("Invalid header: {0}")]
    HeaderParse(String),

    #[error("Failed to parse JSON response: {0}")]
    JsonParse(String),

    #[error("{0}")]
    Other(String),
}

#[derive(Serialize, Deserialize)]
#[serde(tag="type", content="value")]
pub enum RequestBody {
    Json(serde_json::Value),
    Text(String),
    Form(std::collections::HashMap<String, String>),
    Multipart(Vec<MultipartPart>),
    Binary {
        data: String,
        mime_type: String,
    },
}

#[derive(Serialize, Deserialize)]
pub struct MultipartPart {
    pub name: String,
    #[serde(default)]
    pub value: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub file_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub content_type: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub enum HttpMethod{
    GET,
    POST,
    PUT,
    PATCH,
    DELETE
}

#[derive(Serialize, Deserialize)]
pub struct HttpRequest {
    pub url: String,
    pub method: HttpMethod,
    pub params: Option<std::collections::HashMap<String, String>>,
    pub body: Option<RequestBody>,
    pub headers: Option<Vec<(String,String)>>,
    #[serde(default)]
    pub timeout_ms: Option<u64>,
}

#[derive(Serialize, Deserialize)]
pub struct HttpResponse {
    pub status: u16,
    pub time: u128,
    pub size: usize,
    pub body: serde_json::Value
}

#[tauri::command]
pub async fn fetch_data( 
    state: tauri::State<'_, AppState>,
    req: HttpRequest
) -> Result<HttpResponse, HttpError>{

    let client = &state.client;

    let mut request = match req.method {
        HttpMethod::GET => client.get(&req.url),
        HttpMethod::POST => client.post(&req.url),
        HttpMethod::PUT => client.put(&req.url),
        HttpMethod::PATCH => client.patch(&req.url),
        HttpMethod::DELETE => client.delete(&req.url),
    };

    if let Some(params) = req.params {
        request = request.query(&params);
    }

    let mut body_bytes: Option<Vec<u8>> = None;
    let mut multipart_form: Option<reqwest::multipart::Form> = None;
    let mut inferred_content_type: Option<String> = None;

    if let Some(body) = req.body {

        match body {
            RequestBody::Json(val) => {
                body_bytes = Some(serde_json::to_vec(&val).map_err(|e| HttpError::Other(e.to_string()))?);

                inferred_content_type = Some("application/json".into());
            }
            RequestBody::Text(s) => {
                body_bytes = Some(s.as_bytes().to_vec());
                inferred_content_type = Some("text/plain; charset=utf-8".into());
            }
            RequestBody::Form(map) => {
                let encoded = serde_urlencoded::to_string(map).map_err(|e| HttpError::Other(format!("Base64 decode error: {}", e)))?;
                body_bytes = Some(encoded.into_bytes());
                inferred_content_type = Some("application/x-www-form-urlencoded".into());
            }
            RequestBody::Binary { data, mime_type} => {
                let bin = BASE64.decode(data).map_err(|e| HttpError::Other(format!("Base64 decode error: {}", e)))?;
                body_bytes = Some(bin);
                inferred_content_type = Some(mime_type.clone());
            }
            RequestBody::Multipart(parts) => {
                let mut form = reqwest::multipart::Form::new();
                for part in parts {
                    if let Some(file_data_b64) = &part.data {
                        let file_bytes = BASE64.decode(file_data_b64).map_err(|e| HttpError::Other(format!("Base64 decode: {}", e)))?;

                        let mut file_part = reqwest::multipart::Part::bytes(file_bytes).file_name(part.file_name.clone().unwrap_or_else(|| "file".into()));

                        if let Some(ct) = &part.content_type {
                            file_part = file_part.mime_str(ct).map_err(|e| HttpError::Other(format!("Invalid mime: {}", e)))?;
                        }
                        form = form.part(part.name.clone(), file_part);
                    } else {
                        form = form.text(part.name.clone(), part.value.clone());
                    }
                }
                multipart_form = Some(form);
            }
        }

    }

    let mut user_set_content_type = false;

    if let Some(headers) = &req.headers {
        for (key, value) in headers {
            let name = HeaderName::from_bytes(key.trim().as_bytes())
                .map_err(|e| HttpError::HeaderParse(format!("Invalid header name '{}': {}", key, e)))?;
            let val = HeaderValue::from_str(value.trim())
                .map_err(|e| HttpError::HeaderParse(format!("Invalid header value '{}': {}", value, e)))?;

            if name.as_str().eq_ignore_ascii_case("content-type") {
                user_set_content_type = true;
            }

            request = request.header(name, val);
        }
    }

    if let Some(form) = multipart_form {
        request = request.multipart(form);
    } else if let Some(bytes) = body_bytes {
        if !user_set_content_type {
            if let Some(ct) = inferred_content_type {
                request = request.header("content-type", ct);
            }
        }
        request = request.body(bytes);
    }

    let timeout_duration = std::time::Duration::from_millis(req.timeout_ms.unwrap_or(30_000));
    request = request.timeout(timeout_duration);

    let start = Instant::now();

    let response = request.send().await.map_err(|e| HttpError::Network(e.to_string()))?;

    let status = response.status().as_u16();

    let content_type = response
        .headers()
        .get("content-type")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_string();

    let bytes = response.bytes().await.map_err(|e| HttpError::Network(e.to_string()))?;

    let duration = start.elapsed().as_millis();

    let size = bytes.len();

    let body = if content_type.contains("application/json") {
        serde_json::from_slice(&bytes).map_err(|e| HttpError::JsonParse(e.to_string()))?
    } else {
        serde_json::Value::String(String::from_utf8_lossy(&bytes).into_owned())
    };
        
    Ok(HttpResponse {
        status,
        time: duration,
        size,
        body
    })

}