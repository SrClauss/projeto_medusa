// WooCommerce Deployment Wizard - Main Entry Point
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod modules;

use modules::deployment::deploy_woocommerce;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct WooCommerceConfig {
    deployment_type: String,
    server: Option<ServerConfig>,
    store_name: String,
    store_tagline: String,
    admin_email: String,
    admin_password: String,
    theme: String,
    payment_gateway: String,
    payment_credentials: PaymentCredentials,
}

#[derive(Debug, Serialize, Deserialize)]
struct ServerConfig {
    host: String,
    domain: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct PaymentCredentials {
    gateway_type: String,
    token: String,
    test_mode: bool,
}

#[tauri::command]
fn test_ssh_connection(host: String, ssh_key_path: String) -> Result<String, String> {
    // TODO: Implement SSH connection test
    Ok(format!("SSH connection test to {} successful", host))
}

#[tauri::command]
async fn deploy_woocommerce_store(config: WooCommerceConfig) -> Result<String, String> {
    deploy_woocommerce(config).await
}

#[tauri::command]
fn parse_products_csv(csv_path: String) -> Result<Vec<serde_json::Value>, String> {
    // TODO: Implement CSV parsing for WooCommerce products
    Ok(vec![])
}

#[tauri::command]
fn scan_images_directory(dir_path: String) -> Result<serde_json::Value, String> {
    // TODO: Implement image directory scanning
    Ok(serde_json::json!({"images": []}))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            test_ssh_connection,
            deploy_woocommerce_store,
            parse_products_csv,
            scan_images_directory
        ])
        .run(tauri::generate_context!())
        .expect("error while running WooCommerce deployment wizard");
}
