use anyhow::Result;
use serde_json::{json, Value};
use std::collections::HashMap;
use std::path::Path;

pub async fn scan_directory(directory: &str, products: &[Value]) -> Result<Value> {
    let dir_path = Path::new(directory);
    
    if !dir_path.exists() || !dir_path.is_dir() {
        anyhow::bail!("Directory does not exist or is not a directory");
    }
    
    let mut products_with_images = 0;
    let mut products_without_images = 0;
    let mut total_images = 0;
    let mut missing_folders = Vec::new();
    let mut orphan_folders = Vec::new();
    let mut details = Vec::new();
    
    // Create a map of codigo_interno -> product info
    let mut product_map: HashMap<String, (String, String)> = HashMap::new();
    for product in products {
        if let (Some(codigo), Some(nome)) = (
            product.get("codigo_interno").and_then(|v| v.as_str()),
            product.get("nome").and_then(|v| v.as_str()),
        ) {
            product_map.insert(codigo.to_string(), (codigo.to_string(), nome.to_string()));
        }
    }
    
    // Scan subdirectories
    if let Ok(entries) = std::fs::read_dir(dir_path) {
        let mut found_folders = Vec::new();
        
        for entry in entries.flatten() {
            if let Ok(file_type) = entry.file_type() {
                if file_type.is_dir() {
                    if let Some(folder_name) = entry.file_name().to_str() {
                        found_folders.push(folder_name.to_string());
                        
                        if product_map.contains_key(folder_name) {
                            // Count images in this folder
                            let image_count = count_images(&entry.path())?;
                            if image_count > 0 {
                                products_with_images += 1;
                                total_images += image_count;
                            }
                            
                            let (_, product_name) = &product_map[folder_name];
                            details.push(json!({
                                "codigo_interno": folder_name,
                                "productName": product_name,
                                "imageCount": image_count,
                            }));
                        } else {
                            orphan_folders.push(folder_name.to_string());
                        }
                    }
                }
            }
        }
        
        // Find missing folders
        for (codigo, (_, product_name)) in &product_map {
            if !found_folders.contains(codigo) {
                missing_folders.push(codigo.clone());
                products_without_images += 1;
                details.push(json!({
                    "codigo_interno": codigo,
                    "productName": product_name,
                    "imageCount": 0,
                }));
            }
        }
    }
    
    Ok(json!({
        "productsWithImages": products_with_images,
        "productsWithoutImages": products_without_images,
        "totalImages": total_images,
        "missingFolders": missing_folders,
        "orphanFolders": orphan_folders,
        "details": details,
    }))
}

fn count_images(path: &Path) -> Result<usize> {
    let mut count = 0;
    let image_extensions = ["jpg", "jpeg", "png", "webp", "gif"];
    
    if let Ok(entries) = std::fs::read_dir(path) {
        for entry in entries.flatten() {
            if let Ok(file_type) = entry.file_type() {
                if file_type.is_file() {
                    if let Some(extension) = entry.path().extension().and_then(|e| e.to_str()) {
                        if image_extensions.contains(&extension.to_lowercase().as_str()) {
                            count += 1;
                        }
                    }
                }
            }
        }
    }
    
    Ok(count)
}

pub async fn optimize_image(input_path: &Path, output_path: &Path) -> Result<()> {
    // Load image
    let img = image::open(input_path)?;
    
    // Resize if larger than 1200px width
    let img = if img.width() > 1200 {
        img.resize(1200, (1200.0 * img.height() as f32 / img.width() as f32) as u32, image::imageops::FilterType::Lanczos3)
    } else {
        img
    };
    
    // Save optimized image
    img.save(output_path)?;
    
    Ok(())
}
