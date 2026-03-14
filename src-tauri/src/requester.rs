use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct HttpRequest {
    pub url: String,
    pub method: String,
    pub params: Option<std::collections::HashMap<String, String>>,
    pub body: Option<serde_json::Value>
}

#[tauri::command]
pub async fn fetch_data(req: HttpRequest) -> Result<serde_json::Value, String>{

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

    let response = request
        .send()
        .await
        .map_err(|e| e.to_string())?;
        
    let data: serde_json::Value = response
        .json()
        .await
        .map_err(|e| e.to_string())?;

    Ok(data)

}