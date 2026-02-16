# MedusaProject - Wizard de Implantação Automatizada

## 🚀 Visão Geral

**MedusaProject** é uma aplicação desktop desenvolvida com **Tauri** (Rust + React) que atua como um assistente gráfico (wizard) para implantação instantânea de lojas virtuais completas baseadas no ecossistema MedusaJS.

O produto oferece uma experiência "zero DevOps": o usuário fornece apenas um servidor Linux limpo, as configurações da loja (identidade visual, produtos e imagens) e, em poucos minutos, recebe uma loja funcional com backend Medusa e frontend Next.js personalizado.

## ✨ Diferenciais

- **Backend MedusaJS**: e-commerce headless, pronto para ser administrado via dashboard
- **Frontend Next.js**: loja virtual moderna, otimizada para SEO, com as melhores práticas de performance
- **Automação completa**: desde a configuração do servidor (Docker, PostgreSQL, Redis, MinIO) até o build e deploy do frontend
- **10 Escolas de Design**: Glassmorphism, Material Design 3, Neumorphism, Brutalismo, Minimalismo Nórdico, Luxury, Cyberpunk, Bento Grid, Retro/Vintage, Claymorphism
- **Integração Mercado Pago**: Gateway de pagamento configurado automaticamente com webhooks
- **Customização Visual**: Escolha de cores e tipografia para personalizar completamente sua loja

## 🎯 Público-alvo

- Desenvolvedores que querem prototipar lojas rapidamente
- Agências que entregam lojas para clientes sem se preocupar com infraestrutura
- Empreendedores técnicos com servidor próprio

## 📋 Pré-requisitos

### Servidor
- Servidor Linux (Ubuntu 20.04+, Debian 11+, ou similar)
- Acesso SSH via chave pública
- Portas 80 e 443 abertas (para SSL automático via Let's Encrypt)
- Mínimo 2GB RAM, 20GB disco
- Docker e Docker Compose (serão instalados automaticamente se necessário)

### Desenvolvimento
- Node.js 18+ e npm
- Rust 1.70+ e Cargo
- Sistema operacional: Windows, macOS ou Linux

## 🛠️ Instalação para Desenvolvimento

### 1. Clone o repositório

```bash
git clone https://github.com/SrClauss/projeto_medusa.git
cd projeto_medusa
```

### 2. Instale as dependências

```bash
# Instalar dependências do frontend
npm install

# As dependências do Rust serão instaladas automaticamente pelo Cargo
```

### 3. Instale dependências do sistema (apenas Linux)

Para Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install -y libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev libssl-dev
```

Para Fedora:
```bash
sudo dnf install webkit2gtk4.1-devel gtk3-devel libappindicator-gtk3-devel librsvg2-devel openssl-devel
```

Para Arch:
```bash
sudo pacman -S webkit2gtk-4.1 gtk3 libappindicator-gtk3 librsvg openssl
```

## 🚀 Executando o Projeto

### Modo de Desenvolvimento

```bash
npm run dev
```

Isso iniciará o servidor Vite e abrirá a aplicação Tauri.

### Build para Produção

```bash
npm run build
npm run tauri build
```

Os instaladores estarão disponíveis em `src-tauri/target/release/bundle/`.

## 📖 Como Usar o Wizard

### Passo 1: Configuração do Servidor
- Informe o IP do servidor e o domínio da loja
- O sistema detecta automaticamente sua chave SSH em `~/.ssh/id_rsa`
- Clique em "Conectar" para verificar a conectividade

### Passo 2: Identidade da Loja
- Defina o nome e o slogan da sua loja
- Estes dados serão usados no frontend e no backend

### Passo 3: Escola de Design
- Escolha entre 10 escolas de design pré-configuradas
- Cada escola tem uma paleta de cores e estilo visual único

### Passo 4: Personalização do Tema
- Ajuste as cores primária, secundária e de fundo
- Escolha a combinação de fontes que melhor representa sua marca

### Passo 5: Configuração de Pagamento
- Insira seu token de acesso do Mercado Pago
- Escolha entre modo de teste ou produção
- Configure o webhook para notificações de pagamento

### Passo 6: Upload de Produtos (CSV)
- Selecione um arquivo CSV com seus produtos
- Campos obrigatórios: `nome`, `preco`, `descricao`
- Campos opcionais: `uuid`, `codigo_interno`

### Passo 7: Seleção de Imagens
- Escolha o diretório raiz contendo as imagens
- Cada subpasta deve ter o nome igual ao `codigo_interno` do produto
- O sistema valida automaticamente a correspondência

### Passo 8: Implantação
- Revise o resumo da configuração
- Clique em "Iniciar Implantação"
- Acompanhe os logs em tempo real

### Passo 9: Conclusão
- Acesse sua loja através da URL fornecida
- Configure o webhook no painel do Mercado Pago
- Faça login no painel administrativo com as credenciais padrão

## 📄 Formato do CSV de Produtos

Crie um arquivo CSV com os seguintes campos:

```csv
codigo_interno,nome,preco,descricao
1,Camiseta Básica,29.90,Camiseta 100% algodão em diversas cores
2,Calça Jeans,89.90,Calça jeans com modelagem moderna
3,Tênis Esportivo,149.90,Tênis ideal para corrida e caminhada
```

### Campos

- **codigo_interno** (opcional): Código usado para associar imagens. Se vazio, será gerado sequencialmente
- **nome** (obrigatório): Nome do produto
- **preco** (obrigatório): Preço do produto em formato decimal (ex: 29.90)
- **descricao** (obrigatório): Descrição detalhada do produto
- **uuid** (opcional): ID único. Se vazio, será gerado automaticamente

## 📁 Estrutura de Imagens

Organize suas imagens da seguinte forma:

```
imagens/
├── 1/
│   ├── foto1.jpg
│   ├── foto2.jpg
│   └── foto3.png
├── 2/
│   ├── produto.jpg
│   └── detalhe.webp
└── 3/
    └── imagem.jpg
```

- Os nomes das subpastas devem corresponder ao `codigo_interno` dos produtos
- Formatos suportados: JPG, JPEG, PNG, WEBP, GIF
- As imagens serão automaticamente otimizadas durante o upload

## 🔧 Configuração do Mercado Pago

### 1. Obtenha suas credenciais

Acesse: https://www.mercadopago.com.br/developers/panel/credentials

- Para testes: Use o "Access Token" de teste
- Para produção: Use o "Access Token" de produção

### 2. Configure os webhooks

Após a implantação, acesse: https://www.mercadopago.com.br/developers/panel/webhooks

Configure a URL fornecida no wizard (ex: `https://sua-loja.com/api/webhooks/mercadopago`)

Eventos a configurar:
- `payment.created`
- `payment.updated`
- `merchant_order.updated`

## 🏗️ Arquitetura do Sistema

### Frontend (Wizard Desktop)
- **React 19**: Interface do usuário moderna e responsiva
- **Tailwind CSS**: Estilização rápida e consistente
- **Tauri**: Wrapper nativo para desktop
- **Lucide React**: Ícones modernos

### Backend (Rust)
- **Tauri Core**: Gerenciamento da aplicação desktop
- **SSH2**: Conexão e execução de comandos remotos
- **Image**: Processamento e otimização de imagens
- **CSV**: Parser de arquivos CSV
- **Tokio**: Runtime assíncrono

### Stack Implantada no Servidor
- **MedusaJS**: Backend de e-commerce headless
- **PostgreSQL**: Banco de dados relacional
- **Redis**: Cache e filas
- **MinIO**: Armazenamento de objetos (S3-compatible)
- **Caddy**: Servidor web com SSL automático
- **Next.js**: Frontend da loja (a ser implementado)

## 🔐 Segurança

- Todas as conexões SSH usam autenticação por chave pública
- SSL/TLS automático via Let's Encrypt
- Tokens de pagamento são armazenados de forma segura no servidor
- Webhooks validados por secret compartilhado

## 🐛 Troubleshooting

### Erro de conexão SSH
- Verifique se sua chave SSH está em `~/.ssh/id_rsa`
- Confirme que o IP do servidor está correto
- Verifique se a porta 22 está aberta no firewall

### Erro ao processar CSV
- Certifique-se de que o arquivo está codificado em UTF-8
- Verifique se os campos obrigatórios estão presentes
- Use vírgula (`,`) como separador

### Imagens não aparecem
- Verifique se os nomes das pastas correspondem aos códigos internos
- Confirme que as imagens estão em formatos suportados
- Certifique-se de que o MinIO está rodando corretamente

## 📚 Recursos Adicionais

- [Documentação do MedusaJS](https://docs.medusajs.com/)
- [Documentação do Tauri](https://tauri.app/)
- [Mercado Pago Developers](https://www.mercadopago.com.br/developers/)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👤 Autor

**SrClauss**

- GitHub: [@SrClauss](https://github.com/SrClauss)

## 🙏 Agradecimentos

- Equipe do MedusaJS pelo excelente framework de e-commerce
- Equipe do Tauri pelo framework desktop incrível
- Mercado Pago pela API de pagamentos robusta
- Comunidade open source

---

⭐️ Se este projeto foi útil para você, considere dar uma estrela no GitHub!
