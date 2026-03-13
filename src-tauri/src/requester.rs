use serde::{Deserialize, Serialize};

#[tauri::command]
pub async fn fetch_data(url: String) -> Result<serde_json::Value, String>{

    let response = reqwest::get(&url)
        .await
        .map_err(|e| e.to_string())?;
        
    let data: serde_json::Value = response
        .json()
        .await
        .map_err(|e| e.to_string())?;

    Ok(data)

}