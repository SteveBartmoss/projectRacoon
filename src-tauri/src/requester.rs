use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::time::Instant;
use crate::AppState;

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
) -> Result<HttpResponse, String>{

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

    if let Some(headers) = req.headers {
        for(key, value ) in headers {
            request = request.header(&key, &value);
        }
    }

    let start = Instant::now();

    let response = request
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let status = response.status().as_u16();

    let text = response
        .text()
        .await
        .map_err(|e| e.to_string())?;

    let duration = start.elapsed().as_millis();

    let size = text.len();
    
    let body: serde_json::Value =
        serde_json::from_str(&text).unwrap_or(serde_json::Value::String(text));
        
    Ok(HttpResponse {
        status,
        time: duration,
        size,
        body
    })

}