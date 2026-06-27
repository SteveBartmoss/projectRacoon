use crate::AppState;
use crate::models::HttpRequest;
use crate::errors::HttpError;


pub fn build_client(
    state: &AppState,
    req: &HttpRequest,
) -> Result<reqwest::Client, HttpError> {

    if !req.follow_redirects || req.verify_tls == Some(false) {
        let mut builder = reqwest::Client::builder()
            .redirect(
                if req.follow_redirects {
                    reqwest::redirect::Policy::default()
                } else {
                    reqwest::redirect::Policy::none()                }
            );

        if let Some(verify) = req.verify_tls {
            builder = builder.danger_accept_invalid_certs(!verify);
        }

        return builder
            .build()
            .map_err(|e| HttpError::Other(e.to_string()));

    }

    Ok(state.client.clone())

}