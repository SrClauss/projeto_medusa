use serde::{Deserialize, Serialize};
use tauri::Manager;

mod modules;
use modules::ssh;
use modules::csv_parser;
use modules::images;
use modules::deployment;

#[derive(Debug, Serialize, Deserialize)]
struct ServerConfig {
    ip: String,
    domain: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct DeployConfig {
    server: ServerConfig,
    identity: serde_json::Value,
    design: serde_json::Value,
    payment: serde_json::Value,
    products: Vec<serde_json::Value>,
    #[serde(rename = "imagesMapping")]
    images_mapping: serde_json::Value,
}

#[derive(Debug, Serialize)]
struct DeployResult {
    url: String,
    #[serde(rename = "webhookUrl")]
    webhook_url: String,
}

// SSH Connection Command
#[tauri::command]
async fn connect_ssh(ip: String, _domain: String) -> Result<String, String> {
    ssh::connect(&ip).await
        .map_err(|e| format!("Failed to connect: {}", e))
}

// Read CSV File Command
#[tauri::command]
async fn read_csv_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(&path)
        .map_err(|e| format!("Failed to read CSV file: {}", e))
}

// Scan Images Directory Command
#[tauri::command]
async fn scan_images_directory(
    directory: String,
    products: Vec<serde_json::Value>,
) -> Result<serde_json::Value, String> {
    images::scan_directory(&directory, &products)
        .await
        .map_err(|e| format!("Failed to scan directory: {}", e))
}

// Deploy Store Command
#[tauri::command]
async fn deploy_store(
    config: DeployConfig,
    app: tauri::AppHandle,
) -> Result<DeployResult, String> {
    deployment::deploy(config, app)
        .await
        .map_err(|e| format!("Deployment failed: {}", e))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            connect_ssh,
            read_csv_file,
            scan_images_directory,
            deploy_store,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
