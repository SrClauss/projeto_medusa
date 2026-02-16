use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Product {
    pub uuid: Option<String>,
    pub codigo_interno: String,
    pub nome: String,
    pub preco: f64,
    pub descricao: String,
}

pub fn parse_csv(content: &str) -> Result<Vec<Product>> {
    let mut reader = csv::Reader::from_reader(content.as_bytes());
    let mut products = Vec::new();
    
    for result in reader.deserialize() {
        let product: Product = result?;
        products.push(product);
    }
    
    Ok(products)
}
