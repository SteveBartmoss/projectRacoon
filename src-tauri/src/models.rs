use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize,Deserialize)]
#[serde(tag="type", content="value")]
pub enum RequestBody {
    Json(serde_json::Value),
    Text(String),
    Form(std::collections::HashMap<String,String>),
    Multipart(Vec<MultipartPart>),
    Binary {
        data: String,
        mime_type: String,
    },
}

#[derive(Serialize, Deserialize)]
#[serde(tag="type",content="value")]
pub enum ResponseBody {
    Json(serde_json::Value),
    Html(String),
    Text(String),
    Binary(String),
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
    DELETE,
}

#[derive(Serialize, Deserialize)]
pub struct HttpRequest {
    pub url: String,
    pub method: HttpMethod,
    pub params: Option<std::collections::HashMap<String,String>>,
    pub body: Option<RequestBody>,
    pub headers: Option<Vec<(String,String)>>,
    #[serde(default)]
    pub timeout_ms: Option<u64>,
    #[serde(default)]
    pub max_response_size: Option<usize>,
    #[serde(default="default_follow_redirects")]
    pub follow_redirects: bool,
    #[serde(default)]
    pub verify_tls: Option<bool>
}

fn default_follow_redirects() -> bool {
    true
}

#[derive(Serialize,Deserialize)]
pub struct HttpResponse {
    pub status: u16,
    pub time: u128,
    pub size: usize,
    pub headers: std::collections::HashMap<String, String>,
    pub body: ResponseBody,
}