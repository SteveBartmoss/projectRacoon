use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::time::Instant;

#[derive(Serialize, Deserialize)]
pub struct HttpRequest {
    pub url: String,
    pub method: String,
    pub params: Option<std::collections::HashMap<String, String>>,
    pub body: Option<serde_json::Value>
}

#[derive(Serialize, Deserialize)]
pub struct HttpResponse {
    pub status: u16,
    pub time: u128,
    pub size: usize,
    pub body: serde_json::Value
}

#[tauri::command]
pub async fn fetch_data(req: HttpRequest) -> Result<HttpResponse, String>{

    let client = Client::new();

    let mut request = match req.method.as_str() {
        "GET" => client.get(&req.url),
        "POST" => client.post(&req.url),
        "PUT" => client.put(&req.url),
        "PATCH" => client.patch(&req.url),
        "DELETE" => client.delete(&req.url),
        _ => return Err("Unsupported method".into())
    };

    if let Some(params) = req.params {
        request = request.query(&params);
    }

    if let Some(body) = req.body {
        request = request.json(&body);
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