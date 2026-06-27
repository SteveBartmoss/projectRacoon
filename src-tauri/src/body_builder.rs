use crate::models::RequestBody;
use crate::errors::HttpError;
use base64::Engine;
use base64::engine::general_purpose::STANDARD as BASE64;

pub struct PreparedBody {
    pub body_bytes: Option<Vec<u8>>,
    pub multipart_form: Option<reqwest::multipart::Form>,
    pub content_type: Option<String>,
}

pub fn prepare_body(
    body: Option<RequestBody>,
) -> Result<PreparedBody, HttpError> {


    let mut body_bytes = None;
    let mut multipart_form = None;
    let mut content_type = None;

    match body {

        Some(RequestBody::Json(val)) => {
            body_bytes = Some(serde_json::to_vec(&val).map_err(|e| HttpError::Other(e.to_string()))?);

            content_type = Some("application/json".into());
        }

        Some(RequestBody::Text(text)) => {
            body_bytes = Some(text.as_bytes().to_vec());

            content_type = Some("text/plain; charset=utf-8".into());

        }

        Some(RequestBody::Form(form)) => {

            let encoded = serde_urlencoded::to_string(form).map_err(|e| HttpError::Other(format!("Base64 decode error: {}", e)))?;

            body_bytes = Some(encoded.into_bytes());

            content_type = Some("application/x-www-form-urlencoded".into());

        }

        Some(RequestBody::Binary {data, mime_type}) => {
            
            let bin = BASE64.decode(data).map_err(|e| HttpError::Other(format!("Base64 decode error: {}", e)))?;

            body_bytes = Some(bin);

            content_type = Some(mime_type.clone());

        }

        Some(RequestBody::Multipart(parts)) => {

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

        None => {}
    }
    
    Ok(PreparedBody {
        body_bytes,
        multipart_form,
        content_type,
    })

}