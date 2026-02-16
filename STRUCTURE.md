# 📂 Estrutura do Repositório

## Visão Geral

Este repositório foi reorganizado para conter duas variantes do projeto de deployment de e-commerce:

```
projeto_medusa/
│
├── README.md                 # Documentação principal (você está aqui!)
├── .gitignore               # Ignora arquivos comuns (node_modules, etc)
│
├── original/                # 🚀 Projeto MedusaJS (headless)
│   ├── src/                # Frontend React
│   ├── src-tauri/          # Backend Rust
│   ├── package.json        # Dependências Node
│   ├── README.md           # Documentação completa do Medusa
│   ├── DEVELOPMENT.md      # Guia de desenvolvimento
│   └── ...                 # Outros arquivos de config
│
└── woocommerce/            # 🛍️ Projeto WooCommerce (WordPress)
    ├── src/                # Frontend React
    ├── src-tauri/          # Backend Rust
    ├── package.json        # Dependências Node
    ├── README.md           # Documentação completa do WooCommerce
    ├── DEVELOPMENT.md      # Guia de desenvolvimento
    └── ...                 # Outros arquivos de config
```

## 🎯 Qual Variante Escolher?

### 🚀 MedusaJS (pasta `original/`)

**Melhor para:**
- Projetos que precisam de alta performance
- Arquiteturas API-first/headless
- Equipes com desenvolvedores experientes
- Integrações complexas e customizações profundas
- Controle total sobre o frontend

**Stack:**
- Node.js + PostgreSQL + Redis + MinIO
- Next.js frontend
- API-first architecture

**[📖 Ver documentação →](./original/README.md)**

---

### 🛍️ WooCommerce (pasta `woocommerce/`)

**Melhor para:**
- Projetos que valorizam ecossistema maduro
- Necessidade de milhares de plugins prontos
- Equipes com menos experiência técnica
- Interface administrativa familiar do WordPress
- Temas e plugins prontos para usar

**Stack:**
- WordPress + WooCommerce + MySQL
- Nginx web server
- Painel WordPress nativo

**[📖 Ver documentação →](./woocommerce/README.md)**

---

## 🚀 Como Começar

### Para o Projeto MedusaJS:

```bash
# Entre na pasta original
cd original

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Para o Projeto WooCommerce:

```bash
# Entre na pasta woocommerce
cd woocommerce

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

## 📊 Comparação Rápida

| Aspecto | MedusaJS | WooCommerce |
|---------|----------|-------------|
| **Tecnologia** | Node.js | WordPress (PHP) |
| **Arquitetura** | Headless | Monolítico |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Facilidade** | Média | Fácil |
| **Plugins** | Novo | 50,000+ |
| **Customização** | Total | Alta |
| **Escalabilidade** | Excelente | Boa |
| **SEO** | Manual | Nativo |

## 🔄 Desenvolvimento Independente

Cada projeto pode ser desenvolvido de forma completamente independente:

- **Diferentes dependências**: Cada pasta tem seu próprio `package.json` e `node_modules`
- **Diferentes configurações**: Configurações de build, Tauri, Rust são separadas
- **Diferentes releases**: Podem ser lançadas versões diferentes de cada variante
- **Diferentes branches**: Você pode criar branches específicas para cada variante

## 📝 Estrutura de Commits

Ao fazer commits, especifique qual variante você está modificando:

```bash
# Para mudanças no MedusaJS
git commit -m "original: Add new payment gateway"

# Para mudanças no WooCommerce
git commit -m "woocommerce: Update docker configuration"

# Para mudanças gerais (README raiz, etc)
git commit -m "docs: Update main README"
```

## 🤝 Contribuindo

Você pode contribuir para qualquer uma das variantes ou ambas!

1. Escolha a variante que quer contribuir
2. Entre na pasta correspondente (`original/` ou `woocommerce/`)
3. Leia o `DEVELOPMENT.md` da variante
4. Faça suas modificações
5. Teste localmente
6. Abra um Pull Request

## 📚 Documentação Adicional

### Documentação do MedusaJS:
- [📘 README](./original/README.md)
- [🔧 Guia de Desenvolvimento](./original/DEVELOPMENT.md)
- [📝 Sumário do Projeto](./original/PROJECT_SUMMARY.md)
- [✅ TODO List](./original/TODO.md)

### Documentação do WooCommerce:
- [📗 README](./woocommerce/README.md)
- [🔧 Guia de Desenvolvimento](./woocommerce/DEVELOPMENT.md)

## 🐛 Problemas e Suporte

### Problemas com MedusaJS
- Abra uma issue com tag `[original]`
- Verifique [original/DEVELOPMENT.md](./original/DEVELOPMENT.md) primeiro

### Problemas com WooCommerce
- Abra uma issue com tag `[woocommerce]`
- Verifique [woocommerce/DEVELOPMENT.md](./woocommerce/DEVELOPMENT.md) primeiro

## 📜 Histórico de Mudanças

### 2026-02-16 - Reorganização do Repositório
- ✅ Movido projeto original para pasta `original/`
- ✅ Criado projeto WooCommerce na pasta `woocommerce/`
- ✅ Cada projeto mantém sua estrutura independente
- ✅ Documentação completa para ambas variantes

## 📄 Licença

MIT License - Ambos os projetos

## 👤 Autor

**SrClauss**
- GitHub: [@SrClauss](https://github.com/SrClauss)

---

💡 **Dica:** Escolha a variante que melhor se adapta ao seu caso de uso e foque nela. Ambas oferecem experiências completas de deployment automatizado!

⭐️ Se este projeto foi útil, considere dar uma estrela no GitHub!
