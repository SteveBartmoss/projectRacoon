

#[derive(Serialize, Deserialize)]
#[serde(tag="type",content="value")]
pub enum ResponseBody {
    Json(serde_json::Value),
    Html(String),
    Text(String),
    Image{
        mime: String,
        data: String,
    },
    Binary(String),
}