# 🛠️ Guia de Desenvolvimento - WooCommerce Wizard

## 📋 Visão Geral

Este documento descreve como desenvolver e contribuir com a versão WooCommerce do Medusa Deployment Wizard.

## 🚀 Configuração do Ambiente

### Pré-requisitos

- **Node.js** 18+ e npm
- **Rust** 1.70+ e Cargo
- **Sistema operacional:** Windows, macOS ou Linux

### Instalação (Linux/Ubuntu)

```bash
# Instalar dependências do sistema
sudo apt-get update
sudo apt-get install -y libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev libssl-dev

# Instalar dependências do projeto
cd woocommerce
npm install

# Verificar instalação do Rust
rustc --version
cargo --version
```

## 🏃 Executando o Projeto

### Modo de Desenvolvimento

```bash
cd woocommerce
npm run dev
```

Isso iniciará:
1. Servidor Vite no modo hot-reload
2. Aplicação Tauri em modo debug
3. Console de logs do Rust

### Build para Produção

```bash
npm run build
npm run tauri build
```

Os instaladores estarão em: `src-tauri/target/release/bundle/`

## 📁 Estrutura do Projeto

```
woocommerce/
├── src/                          # Frontend React
│   ├── components/               # Componentes React
│   │   └── wizard/              # Componentes do wizard
│   │       └── Wizard.jsx       # Componente principal
│   ├── contexts/                # Context API
│   │   └── WizardContext.jsx   # Estado global do wizard
│   ├── utils/                   # Utilitários
│   ├── App.jsx                  # Componente raiz
│   ├── main.jsx                 # Entry point React
│   └── index.css                # Estilos globais
│
├── src-tauri/                   # Backend Rust
│   ├── src/
│   │   ├── modules/            # Módulos Rust
│   │   │   ├── deployment.rs  # Lógica de deployment
│   │   │   ├── ssh.rs         # Conexões SSH
│   │   │   ├── csv_parser.rs  # Parser de CSV
│   │   │   └── images.rs      # Processamento de imagens
│   │   ├── lib.rs             # Comandos Tauri
│   │   └── main.rs            # Entry point
│   ├── Cargo.toml             # Dependências Rust
│   └── tauri.conf.json        # Configuração Tauri
│
├── public/                     # Assets estáticos
├── examples/                   # Arquivos de exemplo
│   └── produtos-exemplo.csv   # CSV exemplo
├── package.json               # Dependências Node
├── vite.config.js            # Configuração Vite
├── tailwind.config.js        # Configuração Tailwind
└── README.md                 # Documentação

```

## 🔧 Tecnologias Utilizadas

### Frontend
- **React 19** - Framework UI
- **Tailwind CSS** - Estilização
- **Vite** - Build tool
- **Lucide React** - Ícones
- **PapaCSV** - Parse de CSV

### Backend (Rust)
- **Tauri 2.x** - Framework desktop
- **Tokio** - Runtime assíncrono
- **SSH2** - Cliente SSH
- **Serde** - Serialização
- **Image** - Processamento de imagens
- **CSV** - Parse de CSV

## 🎨 Desenvolvimento do Frontend

### Adicionando um Novo Passo no Wizard

1. Crie um novo componente em `src/components/wizard/`:

```jsx
// src/components/wizard/MyNewStep.jsx
import { useWizard } from '../../contexts/WizardContext';

export default function MyNewStep() {
  const { config, updateConfig, nextStep } = useWizard();
  
  return (
    <div>
      <h2>My New Step</h2>
      {/* Your step content */}
      <button onClick={nextStep}>Next</button>
    </div>
  );
}
```

2. Importe e use no componente `Wizard.jsx`

### Atualizando o Estado Global

```jsx
import { useWizard } from '../../contexts/WizardContext';

function MyComponent() {
  const { config, updateConfig } = useWizard();
  
  const handleChange = (e) => {
    updateConfig('storeName', e.target.value);
  };
  
  return <input value={config.storeName} onChange={handleChange} />;
}
```

## ⚙️ Desenvolvimento do Backend (Rust)

### Adicionando um Novo Comando Tauri

1. Defina a função em `src-tauri/src/lib.rs`:

```rust
#[tauri::command]
fn my_new_command(param: String) -> Result<String, String> {
    // Sua lógica aqui
    Ok(format!("Success: {}", param))
}
```

2. Registre o comando no builder:

```rust
.invoke_handler(tauri::generate_handler![
    my_new_command,
    // ... outros comandos
])
```

3. Chame do frontend:

```javascript
import { invoke } from '@tauri-apps/api/core';

const result = await invoke('my_new_command', { param: 'value' });
```

### Trabalhando com Módulos

Adicione funcionalidades em `src-tauri/src/modules/`:

```rust
// src-tauri/src/modules/deployment.rs
pub async fn deploy_woocommerce(config: WooCommerceConfig) -> Result<String, String> {
    // Sua lógica de deployment
}
```

## 🐳 Docker Templates

### Editando o docker-compose.yml

Modifique a função em `deployment.rs`:

```rust
pub fn generate_docker_compose_woocommerce(config: &WooCommerceConfig) -> String {
    // Retorne o template YAML
}
```

## 🧪 Testing

### Frontend

```bash
# Instalar dependências de teste
npm install --save-dev vitest @testing-library/react

# Rodar testes
npm test
```

### Backend (Rust)

```bash
cd src-tauri
cargo test
```

## 📝 Convenções de Código

### JavaScript/React
- Use functional components com hooks
- Prefira `const` sobre `let`
- Use destructuring quando apropriado
- Mantenha componentes pequenos e focados
- Use Tailwind CSS para estilos

### Rust
- Siga as convenções do Rust (rustfmt)
- Use `Result<T, E>` para operações que podem falhar
- Prefira `async/await` para operações I/O
- Documente funções públicas com `///`

## 🔍 Debug

### Frontend
- Use React DevTools no navegador
- Console logs: `console.log()`
- Vite debug: Verifique o terminal

### Backend (Rust)
- Logs: Use `println!()` ou `eprintln!()`
- Rust debugger: Use rust-lldb ou rust-gdb
- Tauri DevTools: Acesse via menu da aplicação

## 📦 Build

### Development Build
```bash
npm run tauri dev
```

### Production Build
```bash
npm run tauri build
```

Plataformas suportadas:
- Windows (`.exe`, `.msi`)
- macOS (`.dmg`, `.app`)
- Linux (`.deb`, `.AppImage`)

## 🚧 Roadmap de Desenvolvimento

### Fase 1: UI Básica ✅
- [x] Estrutura do projeto
- [x] Componente Wizard base
- [x] WizardContext
- [x] README e documentação

### Fase 2: Steps do Wizard 🚧
- [ ] DeploymentTypeStep
- [ ] ServerStep
- [ ] StoreIdentityStep
- [ ] ThemeStep
- [ ] PaymentStep
- [ ] ProductsStep
- [ ] ImagesStep
- [ ] DeployStep
- [ ] CompletionStep

### Fase 3: Backend Rust 🚧
- [ ] SSH connection real
- [ ] File transfer (SCP)
- [ ] Docker Compose generation
- [ ] WordPress installation
- [ ] WooCommerce configuration
- [ ] Product import via WP-CLI
- [ ] Image upload

### Fase 4: Integrações 📅
- [ ] Mercado Pago gateway
- [ ] PayPal gateway
- [ ] Stripe gateway
- [ ] Theme installation
- [ ] Plugin installation
- [ ] SSL configuration

### Fase 5: Testing & Polish 📅
- [ ] Unit tests (Frontend)
- [ ] Unit tests (Backend)
- [ ] Integration tests
- [ ] E2E tests
- [ ] UI polish
- [ ] Documentation complete

## 🆘 Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: Rust compilation failed
```bash
cd src-tauri
cargo clean
cargo build
```

### Erro: Tauri command not found
Certifique-se de que o comando está:
1. Definido com `#[tauri::command]`
2. Registrado em `invoke_handler`
3. Sendo chamado com o nome correto no frontend

## 📚 Recursos Adicionais

- [Tauri Documentation](https://tauri.app/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [WordPress Codex](https://codex.wordpress.org/)
- [WP-CLI Documentation](https://wp-cli.org/)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📧 Suporte

Para dúvidas e suporte:
- Abra uma issue no GitHub
- Entre em contato com [@SrClauss](https://github.com/SrClauss)

---

**Happy Coding! 🚀**
