use std::time::Instant;
use crate::AppState;
use crate::body_builder::prepare_body;
use crate::client::build_client;
use crate::request_builder::build_request;
use base64::Engine;
use base64::engine::general_purpose::STANDARD as BASE64;
use std::collections::HashMap;
use crate::errors::HttpError;
use crate::models::ResponseBody;
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

    let client = build_client(&state, &req)?;

    let prepared_body = prepare_body(req.body.clone())?;
    
    let request = build_request(&client, &req, prepared_body)?;

    let start = Instant::now();
    let response = request.send().await.map_err(|e| HttpError::Network(e.to_string()))?;
    let status = response.status().as_u16();

    let response_headers: HashMap<String, String> = response
        .headers()
        .iter()
        .map(|(k,v)| (k.as_str().to_string(), v.to_str().unwrap_or("").to_string()))
        .collect();

    if let Some(max_size) = req.max_response_size {
        if let Some(content_length) = response.content_length() {
            if content_length > max_size as u64 {
                return Err(HttpError::ResponseTooLarge(max_size));
            }
        }
    }

    let bytes = response.bytes().await.map_err(|e| HttpError::Network(e.to_string()))?;
    let duration = start.elapsed().as_millis();
    let size = bytes.len();

    if let Some(max_size) = req.max_response_size {
        if size > max_size {
            return Err(HttpError::ResponseTooLarge(max_size));
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
        let text = decode_text(&bytes, &charset);
        ResponseBody::Html(text)
    } else if content_type_lower.starts_with("image/"){
        ResponseBody::Image(BASE64.encode(bytes.as_ref()))
    } else if content_type_lower.starts_with("text/")
        || content_type_lower.contains("xml")
        || content_type_lower.contains("javascript")
        || content_type_lower.contains("css")
    {
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