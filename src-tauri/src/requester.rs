use serde::{Deserialize, Serialize};
use std::time::Instant;
use crate::AppState;
use reqwest::header::{HeaderName,HeaderValue};
use thiserror::Error;

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
    pub body: Option<serde_json::Value>,
    pub headers: Option<std::collections::HashMap<String, String>>,
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

    if let Some(body) = req.body {
        request = request.json(&body);
    }

    if let Some(headers) = &req.headers {

        for(key, value) in headers {

            let name = HeaderName::from_bytes(key.trim().as_bytes())
                .map_err(|e| HttpError::HeaderParse(format!("... {}", e)))?;

            let val = HeaderValue::from_str(value.trim())
                .map_err(|e| HttpError::HeaderParse(format!("... {}", e)))?;

            request = request.header(name, val);

        }

        
    }

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