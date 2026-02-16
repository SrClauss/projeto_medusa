# 🏪 Projeto Medusa - E-commerce Deployment Wizard

## 📁 Estrutura do Repositório

Este repositório contém **duas variantes** do assistente de implantação de lojas virtuais:

```
projeto_medusa/
├── original/          # 🚀 Versão MedusaJS (headless e-commerce)
└── woocommerce/       # 🛍️ Versão WooCommerce (WordPress)
```

## 🎯 Sobre o Projeto

O **Projeto Medusa** é uma aplicação desktop desenvolvida com **Tauri** (Rust + React) que atua como um assistente gráfico (wizard) para implantação automatizada de lojas virtuais completas.

### 🚀 Versão Original - MedusaJS

**Localização:** [`/original`](./original)

Wizard para implantar lojas baseadas em **MedusaJS**, um e-commerce headless moderno construído com Node.js.

#### Características:
- ✅ Backend MedusaJS (Node.js)
- ✅ Frontend Next.js customizável
- ✅ PostgreSQL + Redis + MinIO
- ✅ 10 escolas de design pré-configuradas
- ✅ Integração Mercado Pago
- ✅ Deploy automatizado via Docker

**[📖 Ver documentação completa →](./original/README.md)**

---

### 🛍️ Versão WooCommerce

**Localização:** [`/woocommerce`](./woocommerce)

Wizard para implantar lojas baseadas em **WordPress + WooCommerce**, a plataforma de e-commerce mais popular do mundo.

#### Características:
- ✅ WordPress + WooCommerce
- ✅ MySQL + Nginx + Redis
- ✅ Temas WooCommerce populares
- ✅ Múltiplos gateways de pagamento
- ✅ Plugins essenciais incluídos
- ✅ Deploy automatizado via Docker

**[📖 Ver documentação completa →](./woocommerce/README.md)**

---

## 🤔 Qual Versão Escolher?

### Escolha **MedusaJS** (`/original`) se:
- ✅ Você quer performance máxima
- ✅ Precisa de uma arquitetura API-first/headless
- ✅ Tem equipe de desenvolvimento
- ✅ Valoriza tecnologia moderna (Node.js, React)
- ✅ Planeja integrações complexas e customizações profundas
- ✅ Quer controle total sobre o frontend

### Escolha **WooCommerce** (`/woocommerce`) se:
- ✅ Prefere uma solução madura e testada
- ✅ Quer acesso a milhares de plugins prontos
- ✅ Precisa de interface administrativa familiar
- ✅ Não tem equipe técnica avançada
- ✅ Valoriza ecossistema grande e suporte comunitário
- ✅ Quer temas prontos e facilmente customizáveis

## 📊 Comparação Rápida

| Característica | MedusaJS (Original) | WooCommerce |
|----------------|---------------------|-------------|
| **Tecnologia** | Node.js + React | WordPress (PHP) |
| **Arquitetura** | Headless/API-first | Monolítico |
| **Curva de Aprendizado** | Média/Alta | Baixa |
| **Ecossistema** | Novo e crescente | Maduro (50k+ plugins) |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ (com cache) |
| **Customização** | Total (código) | Alta (plugins/temas) |
| **SEO** | Manual | Nativo + Plugins |
| **Ideal Para** | Projetos modernos | Lojas tradicionais |

## 🚀 Como Começar

### Para desenvolver a versão MedusaJS:

```bash
cd original
npm install
npm run dev
```

**[📖 Veja o guia completo de desenvolvimento →](./original/DEVELOPMENT.md)**

### Para desenvolver a versão WooCommerce:

```bash
cd woocommerce
npm install
npm run dev
```

**[📖 Veja o guia completo de desenvolvimento →](./woocommerce/README.md)**

## 🛠️ Tecnologias Utilizadas

### Frontend (Ambas as Versões)
- **React 19** - Framework UI moderno
- **Tailwind CSS** - Framework CSS utilitário
- **Tauri 2.x** - Framework desktop nativo
- **Vite** - Build tool rápido
- **Lucide React** - Biblioteca de ícones

### Backend (Ambas as Versões)
- **Rust** - Linguagem de sistemas
- **Tokio** - Runtime assíncrono
- **SSH2** - Cliente SSH
- **Docker** - Containerização

### Stack Implantada

#### MedusaJS
- MedusaJS (Node.js)
- PostgreSQL
- Redis
- MinIO
- Caddy

#### WooCommerce
- WordPress + WooCommerce
- MySQL
- Nginx
- Redis (opcional)
- Certbot

## 📋 Pré-requisitos

Para desenvolver qualquer uma das versões:

- **Node.js** 18+ e npm
- **Rust** 1.70+ e Cargo
- **Sistema:** Windows, macOS ou Linux

Para implantação (servidor):

- **Linux** (Ubuntu 20.04+, Debian 11+)
- **Acesso SSH** via chave pública
- **Portas 80 e 443** abertas
- **Mínimo:** 2GB RAM, 20GB disco
- **Docker** e Docker Compose

## 📖 Documentação Completa

### Versão MedusaJS (Original)
- [📘 README](./original/README.md)
- [🔧 Guia de Desenvolvimento](./original/DEVELOPMENT.md)
- [📝 Sumário do Projeto](./original/PROJECT_SUMMARY.md)
- [✅ TODO List](./original/TODO.md)
- [📸 Screenshots](./original/SCREENSHOTS.md)

### Versão WooCommerce
- [📗 README](./woocommerce/README.md)

## 🤝 Contribuindo

Contribuições são bem-vindas em ambas as versões! 

1. Faça um fork do projeto
2. Escolha a versão que quer contribuir (`original/` ou `woocommerce/`)
3. Crie uma branch para sua feature
4. Commit suas mudanças
5. Push para a branch
6. Abra um Pull Request

## 📝 Licença

MIT License - Veja o arquivo LICENSE para mais detalhes.

## 👤 Autor

**SrClauss**
- GitHub: [@SrClauss](https://github.com/SrClauss)

## 🙏 Agradecimentos

- Equipe do **MedusaJS** pelo framework de e-commerce headless
- Equipe do **WooCommerce/Automattic** pela plataforma robusta
- Equipe do **Tauri** pelo framework desktop incrível
- **Mercado Pago** pela API de pagamentos
- Comunidade open source

---

## 🚦 Status dos Projetos

| Projeto | Status | Versão |
|---------|--------|--------|
| MedusaJS (Original) | 🟡 Em Desenvolvimento (MVP) | 0.1.0 |
| WooCommerce | 🔵 Em Planejamento | 0.1.0 |

---

⭐️ **Se este projeto foi útil, considere dar uma estrela no GitHub!** ⭐️

**Última atualização:** 2026-02-16
