
use std::collections::HashMap;

pub fn apply_headers(
    mut req: reqwest::RequestBuilder,
    headers: Option<&Vec<(String, String)>>
)-> Resutl<(reqwest::RequestBuilder, bool),HttpError>{

    let mut user_set_content_type = false;

    if let Some(hdrs) = headers {

        for(key, value) in hdrs {

            let name = HeaderName::from_bytes(key.trim().as_bytes())
                .map_err(|e| HttpError::HeaderParse(format!("Invalid header name '{}': {}",key, e)))?;

            let val = HeaderValue::from_str(value.trim())
                .map_err(|e| HttpError::HeaderParse(format!("Invalid header value '{}': {}",value,e)))?;

            if name.as_str().eq_ignore_ascii_case("content-type") {
                user_set_content_type = true;
            }

            req = req.header(name, val);

        }

    }

    Ok(req, user_set_content_type)

}

pub fn apply_body(
    mut req: reqwest::RequestBuilder,
    prepared_body: &PreparedBody,
    user_set_content_type: bool,
)-> Result<reqwest::RequestBuilder,HttpError>{

    if let Some(form) = &prepad_body.multipart_form {
        req = req.multipart(form);
    } else if let Some(bytes) = &prepared_body.body_bytes {
        if !user_set_content_type {
            if let Some(ct) = prepared_body.content_type {
                req = req.header("content-type", ct);
            }
        }
        req = req.body(bytes);
    }

    Ok(req)
}

pub fn build_request(
    client: &request::Client,
    req: &HttpRequest,
    prepared_body: PreparedBody,
) -> Result<reqwest::RequestBuilder, HttpError> {

    let mut request = match req.method {
        HttpMethod::GET => client.get(&req.url),
        HttpMethod::POST => client.post(&req.url),
        HttpMethod::PUT => client.put(&req.url),
        HttpMethod::PATCH => client.patch(&req.url),
        HttpMethod::DELETE => client.delete(&req.url),
    };

    if let Some(ref params ) = req.params {
        request = request.query(&params);
    }

    request = apply_headers(request, req.headers.as_ref())?;

    let (request, user_set_content_type) = apply_headers(request, req.headers.as_ref())?;

    let request = apply_body(request,prepared_body)?;

    Ok(
        request.timeout(
            Duration::from_millis(
                req.timeout_ms.unwrap_or(30000)
            )
        )
    )
}