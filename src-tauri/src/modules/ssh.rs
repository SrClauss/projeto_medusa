use anyhow::{Context, Result};
use ssh2::Session;
use std::net::TcpStream;
use std::path::PathBuf;

pub async fn connect(ip: &str) -> Result<String> {
    // For now, return a mock success
    // In production, this would establish actual SSH connection
    tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
    
    Ok(format!("Successfully connected to {}", ip))
}

pub fn get_default_ssh_key() -> Result<PathBuf> {
    let home = std::env::var("HOME")
        .or_else(|_| std::env::var("USERPROFILE"))
        .context("Could not determine home directory")?;
    
    Ok(PathBuf::from(home).join(".ssh").join("id_rsa"))
}

pub struct SshConnection {
    session: Session,
}

impl SshConnection {
    pub fn new(ip: &str, key_path: Option<&str>) -> Result<Self> {
        let tcp = TcpStream::connect(format!("{}:22", ip))
            .context("Failed to connect to server")?;
        
        let mut session = Session::new()
            .context("Failed to create SSH session")?;
        
        session.set_tcp_stream(tcp);
        session.handshake()
            .context("SSH handshake failed")?;
        
        let key_path = if let Some(path) = key_path {
            PathBuf::from(path)
        } else {
            get_default_ssh_key()?
        };
        
        session.userauth_pubkey_file("root", None, &key_path, None)
            .context("SSH authentication failed")?;
        
        if !session.authenticated() {
            anyhow::bail!("SSH authentication failed");
        }
        
        Ok(Self { session })
    }
    
    pub fn execute(&self, command: &str) -> Result<String> {
        let mut channel = self.session.channel_session()
            .context("Failed to create channel")?;
        
        channel.exec(command)
            .context("Failed to execute command")?;
        
        let mut output = Vec::new();
        std::io::Read::read_to_end(&mut channel, &mut output)
            .context("Failed to read command output")?;
        
        let output = String::from_utf8(output)
            .context("Failed to convert output to UTF-8")?;
        
        channel.wait_close()
            .context("Failed to close channel")?;
        
        let exit_status = channel.exit_status()
            .context("Failed to get exit status")?;
        
        if exit_status != 0 {
            anyhow::bail!("Command failed with exit code {}: {}", exit_status, output);
        }
        
        Ok(output)
    }
}
