# Guia de Desenvolvimento - MedusaProject

## 📦 Estrutura do Projeto

```
projeto_medusa/
├── src/                          # Frontend React
│   ├── components/
│   │   ├── wizard/              # Componentes do wizard
│   │   │   ├── Wizard.jsx       # Componente principal
│   │   │   ├── WizardStepper.jsx
│   │   │   ├── ServerStep.jsx
│   │   │   ├── IdentityStep.jsx
│   │   │   ├── DesignSchoolStep.jsx
│   │   │   ├── ThemeStep.jsx
│   │   │   ├── PaymentStep.jsx
│   │   │   ├── ProductsStep.jsx
│   │   │   ├── ImagesStep.jsx
│   │   │   ├── DeployStep.jsx
│   │   │   └── CompletionStep.jsx
│   │   └── shared/              # Componentes reutilizáveis
│   ├── contexts/
│   │   └── WizardContext.jsx    # Gerenciamento de estado global
│   ├── hooks/                    # Custom hooks
│   ├── services/                 # Serviços de comunicação com Rust
│   ├── utils/                    # Utilidades
│   ├── App.jsx                   # Componente raiz
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Estilos globais (Tailwind)
│
├── src-tauri/                    # Backend Rust
│   ├── src/
│   │   ├── modules/
│   │   │   ├── ssh.rs           # Módulo SSH
│   │   │   ├── csv_parser.rs    # Parser de CSV
│   │   │   ├── images.rs        # Processamento de imagens
│   │   │   ├── deployment.rs    # Orquestração de deploy
│   │   │   └── mod.rs
│   │   ├── lib.rs               # Biblioteca principal
│   │   └── main.rs              # Entry point
│   ├── Cargo.toml               # Dependências Rust
│   └── tauri.conf.json          # Configuração Tauri
│
├── examples/                     # Exemplos para teste
│   └── produtos-exemplo.csv
│
├── public/                       # Assets estáticos
├── package.json                  # Dependências NPM
├── tailwind.config.js           # Configuração Tailwind
├── postcss.config.js            # Configuração PostCSS
├── vite.config.js               # Configuração Vite
└── README.md                     # Documentação

```

## 🔧 Tecnologias Utilizadas

### Frontend
- **React 19**: Framework de UI
- **Tailwind CSS**: Framework CSS utilitário
- **Lucide React**: Biblioteca de ícones
- **PapaCSV**: Parser de CSV
- **Vite**: Build tool e dev server

### Backend
- **Tauri 2.x**: Framework desktop
- **Tokio**: Runtime assíncrono
- **SSH2**: Cliente SSH
- **CSV**: Parser de CSV
- **Image**: Processamento de imagens
- **Serde/Serde JSON**: Serialização

## 🚀 Fluxo de Desenvolvimento

### 1. Desenvolvimento Frontend

```bash
# Terminal 1: Iniciar dev server do Vite
npm run dev
```

Isso inicia o servidor de desenvolvimento do Vite e abre a aplicação Tauri.

### 2. Hot Reload

O Vite oferece hot reload automático para mudanças no frontend. Para mudanças no Rust:

```bash
# Recompilar Rust
cd src-tauri
cargo build
```

O Tauri detectará mudanças e recarregará automaticamente.

### 3. Debugging

#### Frontend (Chrome DevTools)
- Use as ferramentas de desenvolvedor do navegador embutido
- Console, Network, Elements, etc.

#### Backend (Rust)
```bash
# Executar com logs de debug
RUST_LOG=debug npm run dev
```

## 📝 Convenções de Código

### React/JavaScript
- Use componentes funcionais com hooks
- Nomeie componentes em PascalCase
- Use arrow functions para componentes
- Mantenha componentes pequenos e focados
- Use destructuring para props

```javascript
// ✅ Bom
export const MyComponent = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// ❌ Evitar
function MyComponent(props) {
  return <div>{props.prop1}</div>;
}
```

### Rust
- Siga as diretrizes do Rustfmt
- Use `anyhow` para error handling
- Prefira async/await quando possível
- Documente funções públicas

```rust
// ✅ Bom
/// Connects to SSH server
pub async fn connect(ip: &str) -> Result<String> {
    // implementation
}

// ❌ Evitar
pub fn connect(ip: String) -> String {
    // implementation
}
```

## 🔨 Comandos Úteis

### NPM Scripts
```bash
npm run dev           # Inicia modo desenvolvimento
npm run build         # Build do frontend
npm run tauri dev     # Inicia Tauri em modo dev
npm run tauri build   # Build completo da aplicação
```

### Cargo Commands
```bash
cargo check           # Verifica compilação
cargo build           # Build debug
cargo build --release # Build otimizado
cargo test            # Executa testes
cargo fmt             # Formata código
cargo clippy          # Linter Rust
```

## 🧪 Testes

### Frontend (A implementar)
```bash
npm run test          # Executa testes
npm run test:watch    # Modo watch
npm run test:coverage # Cobertura de testes
```

### Backend
```bash
cd src-tauri
cargo test            # Testes unitários
cargo test --release  # Testes otimizados
```

## 📦 Build para Produção

### Build Completo
```bash
npm run tauri build
```

Isso cria:
- **Windows**: `.msi` e `.exe` em `src-tauri/target/release/bundle/`
- **macOS**: `.dmg` e `.app` em `src-tauri/target/release/bundle/`
- **Linux**: `.deb`, `.AppImage` em `src-tauri/target/release/bundle/`

### Build apenas Frontend
```bash
npm run build
```

Output em `dist/`

## 🐛 Debugging Avançado

### VSCode
Crie `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Development Debug",
      "cargo": {
        "args": [
          "build",
          "--manifest-path=./src-tauri/Cargo.toml",
          "--no-default-features"
        ]
      },
      "cwd": "${workspaceFolder}"
    }
  ]
}
```

### Chrome DevTools
No modo desenvolvimento, pressione:
- **Windows/Linux**: `Ctrl+Shift+I`
- **macOS**: `Cmd+Option+I`

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
# Desenvolvimento
VITE_API_URL=http://localhost:9000
VITE_DEBUG=true

# Rust logging
RUST_LOG=debug
```

## 📚 Recursos de Aprendizado

### Tauri
- [Documentação Oficial](https://tauri.app/v1/guides/)
- [API Reference](https://tauri.app/v1/api/js/)
- [Exemplos](https://github.com/tauri-apps/tauri/tree/dev/examples)

### React
- [Documentação Oficial](https://react.dev/)
- [React Hooks](https://react.dev/reference/react)

### Rust
- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Implemente suas mudanças
3. Escreva testes se aplicável
4. Execute os linters:
   ```bash
   npm run lint        # Frontend
   cargo clippy        # Backend
   ```
5. Commit com mensagens descritivas
6. Abra um Pull Request

## 📋 Checklist de PR

- [ ] Código compila sem warnings
- [ ] Testes passam
- [ ] Linters passam (eslint, clippy)
- [ ] Documentação atualizada
- [ ] Changelog atualizado (se aplicável)
- [ ] Screenshots/GIFs para mudanças visuais

## 🚨 Troubleshooting Comum

### Erro: "webkit2gtk not found"
```bash
# Ubuntu/Debian
sudo apt-get install libwebkit2gtk-4.1-dev

# Fedora
sudo dnf install webkit2gtk4.1-devel
```

### Erro: "Cannot find module '@tauri-apps/api'"
```bash
npm install
```

### Erro de compilação Rust
```bash
cd src-tauri
cargo clean
cargo build
```

### Erro de hot reload
Reinicie o dev server:
```bash
npm run dev
```

## 💡 Dicas de Performance

### Frontend
- Use `React.memo()` para componentes pesados
- Implemente `useMemo()` e `useCallback()` quando necessário
- Lazy load componentes grandes

### Backend
- Use `async` para operações de I/O
- Implemente caching quando apropriado
- Profile com `cargo flamegraph`

## 📊 Métricas de Qualidade

### Code Coverage
```bash
cargo tarpaulin --out Html
```

### Bundle Size Analysis
```bash
npm run build
npx vite-bundle-visualizer
```

## 🎯 Próximos Passos

Ver [TODO.md](./TODO.md) para lista completa de tarefas pendentes.
