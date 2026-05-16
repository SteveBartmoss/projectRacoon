use std::fs;
use std::path::PathBuf;
use serde::{Serialize, Deserialize};
use tauri::Manager;

#[derive(Serialize, Deserialize, Clone)]
pub struct AppConfig {
    theme: String,
    path: String,
    token: String,
}

#[tauri::command]
pub fn load_config(app: tauri::AppHandle) -> Result<AppConfig, String>{

    let config_dir = app
        .path()
        .app_config_dir()
        .map_err(|e| e.to_string())?;

    fs::create_dir_all(&config_dir).unwrap();

    let config_path = config_dir.join("config.json");

    if(!config_path.exists()){

        let default = AppConfig{
            theme: "dark".into(),
            path: "".into(),
            token: "".into(),
        };

        let json = serde_json::to_string_pretty(&default).unwrap();
        fs::write(&config_path,json).unwrap();

        return Ok(default)
    }

    let content = fs::read_to_string(config_path)
        .map_err(|e| e.to_string())?;

    let config: AppConfig = 
        serde_json::from_str(&content)
        .map_err(|e| e.to_string())?;

    Ok(config)

}

#[tauri::command]
pub fn save_config(app: tauri::AppHandle, config: AppConfig,) -> Result<(), String> {

    let config_dir = app
        .path()
        .app_config_dir()
        .map_err(|e| e.to_string())?;

    fs::create_dir_all(&config_dir)
        .map_err(|e| e.to_string())?;

    let config_path = config_dir.join("config.json");

    let json = serde_json::to_string_pretty(&config)
        .map_err(|e| e.to_string())?;

    fs::write(config_path, json)
        .map_err(|e| e.to_string())?;
    
    Ok(())
}