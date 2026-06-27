use serde::{Deserialize, Serialize};
use std::time::Instant;
use crate::AppState;
use crate::body_builder::prepare_body;
use crate::client;
use crate::client::build_client;
use reqwest::header::{HeaderName,HeaderValue};
use thiserror::Error;
use base64::Engine;
use base64::engine::general_purpose::STANDARD as BASE64;
use serde_urlencoded;
use std::collections::HashMap;
use crate::errors::HttpError;
use crate::models::RequestBody;
use crate::models::ResponseBody;
use crate::models::MultipartPart;
use crate::models::HttpMethod;
use crate::models::HttpRequest;
use crate::models::HttpResponse;

fn decode_text(bytes: &[u8], charset: &Option<String>) -> String {
    if let Some(charset) = charset {
        match charset.as_str() {
            "utf-8" | "utf8" => String::from_utf8(bytes.to_vec())
                .unwrap_or_else(|_| String::from_utf8_lossy(bytes).into_owned()),
            "iso-8859-1" | "latin1" => bytes.iter().map(|&b| b as char).collect(),
            _ => String::from_utf8_lossy(bytes).into_owned(),
        }
    } else {
        String::from_utf8(bytes.to_vec())
            .unwrap_or_else(|_| String::from_utf8_lossy(bytes).into_owned())
    }
}

#[tauri::command]
pub async fn fetch_data( 
    state: tauri::State<'_, AppState>,
    req: HttpRequest
) -> Result<HttpResponse, HttpError>{

    let client = match build_client(&state, &req){
        Ok(client) => client,
        Err(err) => return Err(err)
    };

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

    let prepared_body = match prepare_body(req.body){
        Ok(prepared_body) => prepared_body,
        Err(err) => return Err(err)
    };

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

    if let Some(form) = prepared_body.multipart_form {
        request = request.multipart(form);
    } else if let Some(bytes) = prepared_body.body_bytes {
        if !user_set_content_type {
            if let Some(ct) = prepared_body.content_type {
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

    let response_headers: HashMap<String,String> = response
        .headers()
        .iter()
        .map(|(k,v)| (k.as_str().to_string(), v.to_str().unwrap_or("").to_string()))
        .collect();

    if let Some(max_size) = req.max_response_size {
        if let Some(content_length) = response.content_length() {
            if content_length > max_size as u64 {
                return Err(HttpError::ResponseTooLarge(max_size))
            }
        }
    }

    let bytes = response.bytes().await.map_err(|e| HttpError::Network(e.to_string()))?;

    let duration = start.elapsed().as_millis();

    let size = bytes.len();

    if let Some(max_size) = req.max_response_size {
        if size > max_size {
            return Err(HttpError::ResponseTooLarge(max_size))
        }
    }

    let content_type = response_headers
        .get("content-type")
        .cloned()
        .unwrap_or_default();

    let charset = content_type
        .split(';')
        .find(|part| part.trim().to_lowercase().starts_with("charset="))
        .and_then(|part| part.split('=').nth(1))
        .map(|s| s.trim().to_lowercase());

    let content_type_lower = content_type.to_lowercase();

    let response_body = if content_type_lower.contains("application/json") {
        serde_json::from_slice::<serde_json::Value>(&bytes)
            .map(ResponseBody::Json)
            .unwrap_or_else(|_| ResponseBody::Text(String::from_utf8_lossy(&bytes).into_owned()))
            
    } else if content_type_lower.contains("html") {
        // Detectado como HTML (text/html, application/xhtml+xml, etc.)
        let text = decode_text(&bytes, &charset);
        ResponseBody::Html(text)
        
    } else if content_type_lower.starts_with("text/")
        || content_type_lower.contains("xml")
        || content_type_lower.contains("javascript")
        || content_type_lower.contains("css")
    {
        // Resto de tipos textuales
        let text = decode_text(&bytes, &charset);
        ResponseBody::Text(text)
        
    } else {
        ResponseBody::Binary(BASE64.encode(bytes.as_ref()))
    };
        
    Ok(HttpResponse {
        status,
        time: duration,
        size,
        body: response_body,
        headers: response_headers,
    })

}