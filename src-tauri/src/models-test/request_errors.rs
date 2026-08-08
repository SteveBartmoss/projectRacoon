

#[derive(Debug, Error,Serialize)]
pub enum HttpError {
    #[error("Network error: {0}")]
    Network(String),

    #[error("Invalid header: {0}")]
    HeaderParse(String),

    #[error("Failed to parse JSON response: {0}")]
    JsonParse(String),

    #[error("Response body exceeded size limit of {0} butes")]
    ResponseTooLarge(usize),

    #[error("{0}")]
    Other(String),
    
}