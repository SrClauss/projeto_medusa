# MedusaProject - Versão WooCommerce

## 🛍️ Visão Geral

Esta é uma variante do **MedusaProject** que permite implantar lojas virtuais completas baseadas em **WordPress + WooCommerce** ao invés do MedusaJS. O wizard mantém a mesma experiência "zero DevOps" mas agora com o ecossistema WooCommerce.

## ✨ Diferenciais da Versão WooCommerce

- **WordPress + WooCommerce**: A plataforma de e-commerce mais popular do mundo
- **Compatibilidade**: Suporte para milhares de plugins e temas
- **Gateway de Pagamento**: Integração com Mercado Pago, PayPal, Stripe e outros
- **SEO Otimizado**: WordPress nativo com plugins SEO
- **Painel Administrativo**: Interface familiar do WordPress
- **Temas Personalizados**: Customização visual através de temas WooCommerce

## 🏗️ Stack Implantada no Servidor

### Infraestrutura Docker
- **WordPress 6.x**: CMS e backend da loja
- **WooCommerce 9.x**: Plugin de e-commerce
- **MySQL 8.x**: Banco de dados
- **Nginx**: Servidor web com cache FastCGI
- **Redis**: Cache de objetos (opcional)
- **Certbot**: SSL/TLS automático via Let's Encrypt

### Plugins Incluídos
- **WooCommerce**: Plugin principal de e-commerce
- **WooCommerce Mercado Pago**: Gateway de pagamento brasileiro
- **WP Super Cache**: Cache para performance
- **Yoast SEO**: Otimização para motores de busca
- **Contact Form 7**: Formulários de contato
- **Wordfence Security**: Segurança e firewall

## 📋 Pré-requisitos

### Servidor
- Servidor Linux (Ubuntu 20.04+, Debian 11+, ou similar)
- Acesso SSH via chave pública
- Portas 80 e 443 abertas
- Mínimo 2GB RAM, 30GB disco
- Docker e Docker Compose

### Desenvolvimento
- Node.js 18+ e npm
- Rust 1.70+ e Cargo
- Sistema operacional: Windows, macOS ou Linux

## 🚀 Como Usar o Wizard WooCommerce

### Passo 1: Tipo de Implantação
- Escolha entre "Remote Server", "Local Container" ou **"WooCommerce"**
- A opção WooCommerce ativa o fluxo específico para WordPress/WooCommerce

### Passo 2: Configuração do Servidor
- Informe o IP do servidor e o domínio da loja
- Configure as credenciais SSH
- Escolha o ambiente (produção ou desenvolvimento)

### Passo 3: Identidade da Loja
- Nome da loja
- Slogan/Tagline
- Email do administrador
- Senha inicial do WordPress

### Passo 4: Configuração do Tema
- Escolha entre temas WooCommerce populares:
  - **Storefront**: Tema oficial do WooCommerce
  - **Astra**: Leve e customizável
  - **OceanWP**: Rico em recursos
  - **Neve**: Moderno e rápido
  - **Flatsome**: Premium e completo
- Personalização de cores primárias e secundárias
- Seleção de tipografia

### Passo 5: Plugins e Funcionalidades
- Gateway de pagamento principal:
  - Mercado Pago (Brasil)
  - PayPal
  - Stripe
  - PagSeguro
- Plugins adicionais:
  - Cache e performance
  - SEO
  - Segurança
  - Backup automático

### Passo 6: Configuração de Pagamento
- Credenciais do gateway selecionado
- Modo de teste/produção
- Configuração de moedas
- Taxas de envio

### Passo 7: Upload de Produtos (CSV)
- Formato compatível com WooCommerce Product CSV Import
- Campos: SKU, Nome, Preço, Descrição, Categorias, Tags, etc.
- Suporte para variações de produto
- Atributos personalizados

### Passo 8: Seleção de Imagens
- Upload de imagens de produtos
- Organização por SKU
- Otimização automática para web
- Geração de thumbnails

### Passo 9: Implantação
- Deploy automatizado do stack completo
- Configuração do WordPress
- Instalação e ativação de plugins
- Importação de produtos
- Configuração de permalinks e .htaccess
- Setup de cache

### Passo 10: Conclusão
- URLs de acesso:
  - Loja: `https://seu-dominio.com`
  - Painel Admin: `https://seu-dominio.com/wp-admin`
- Credenciais de acesso
- Próximos passos e recomendações

## 📄 Formato do CSV de Produtos (WooCommerce)

```csv
SKU,Name,Type,Published,Featured,Visibility,Description,Tax status,Stock,Regular price,Categories,Images
PROD-001,Camiseta Básica,simple,1,0,visible,Camiseta 100% algodão,taxable,100,29.90,Roupas > Camisetas,camiseta-001.jpg|camiseta-001-2.jpg
PROD-002,Calça Jeans,simple,1,0,visible,Calça jeans moderna,taxable,50,89.90,Roupas > Calças,calca-002.jpg
PROD-003,Tênis Esportivo,variable,1,1,visible,Tênis para corrida,taxable,75,149.90,Calçados > Tênis,tenis-003.jpg|tenis-003-2.jpg|tenis-003-3.jpg
```

### Campos Principais

- **SKU** (obrigatório): Código único do produto
- **Name** (obrigatório): Nome do produto
- **Type**: simple, variable, grouped, external
- **Published**: 1 para publicado, 0 para rascunho
- **Featured**: 1 para produto em destaque
- **Visibility**: visible, catalog, search, hidden
- **Description** (obrigatório): Descrição completa
- **Short Description**: Descrição curta para listagens
- **Tax status**: taxable, shipping, none
- **Stock**: Quantidade em estoque
- **Regular price** (obrigatório): Preço regular
- **Sale price**: Preço promocional
- **Categories**: Categorias separadas por >
- **Tags**: Tags separadas por vírgula
- **Images**: Imagens separadas por |
- **Weight**: Peso para cálculo de frete
- **Dimensions**: Comprimento x Largura x Altura

## 🔧 Configuração Pós-Implantação

### 1. Configurar Gateway de Pagamento

**Mercado Pago:**
1. Acesse: WooCommerce > Configurações > Pagamentos
2. Ative "Mercado Pago"
3. Clique em "Gerenciar"
4. Insira suas credenciais (Public Key e Access Token)
5. Configure webhooks: `https://seu-dominio.com/?wc-api=WC_WooMercadoPago_Gateway`

### 2. Configurar Envio

1. Acesse: WooCommerce > Configurações > Envio
2. Configure zonas de envio
3. Adicione métodos de envio (Correios, transportadora, etc.)
4. Configure taxas e regras

### 3. Configurar Impostos

1. Acesse: WooCommerce > Configurações > Impostos
2. Ative cálculo de impostos
3. Configure taxas por país/estado
4. Configure classes de impostos se necessário

### 4. Personalizar Tema

1. Acesse: Aparência > Personalizar
2. Configure cores e tipografia
3. Configure layout da página inicial
4. Configure cabeçalho e rodapé
5. Configure widgets

### 5. Configurar Permalinks

1. Acesse: Configurações > Links Permanentes
2. Escolha estrutura (recomendado: "Nome do post")
3. Configure base de categorias e produtos
4. Salve para gerar .htaccess

## 🔒 Segurança

### Medidas Implementadas Automaticamente

- SSL/TLS via Let's Encrypt
- Firewall de aplicação web (Wordfence)
- Proteção contra força bruta
- Hardening do WordPress (wp-config.php protegido)
- Permissões de arquivos corretas
- Backups automáticos diários
- Atualizações de segurança automáticas

### Recomendações Adicionais

- Altere a senha padrão imediatamente
- Use autenticação de dois fatores
- Mantenha WordPress e plugins atualizados
- Faça backups regulares
- Monitore logs de acesso

## 🚀 Performance

### Otimizações Incluídas

- **Nginx FastCGI Cache**: Cache de página completa
- **Redis Object Cache**: Cache de objetos WordPress
- **WP Super Cache**: Cache de página adicional
- **Otimização de imagens**: Compressão automática
- **CDN Ready**: Configurado para usar CDN
- **Gzip/Brotli**: Compressão de assets
- **HTTP/2**: Suportado via Nginx
- **Lazy Loading**: Carregamento tardio de imagens

## 📊 Diferenças: MedusaJS vs WooCommerce

| Característica | MedusaJS | WooCommerce |
|----------------|----------|-------------|
| **Tecnologia** | Node.js headless | WordPress PHP |
| **Curva de Aprendizado** | Média/Alta | Baixa |
| **Customização** | Alta (código) | Alta (plugins/temas) |
| **Ecossistema** | Novo | Maduro (milhares de plugins) |
| **Performance** | Excelente | Boa (com cache) |
| **SEO** | Manual | Nativo + Plugins |
| **Custo** | Menor | Médio (plugins premium) |
| **Suporte** | Comunidade menor | Comunidade enorme |
| **Escalabilidade** | Excelente | Boa |
| **Facilidade Manutenção** | Média | Alta |

## 🎯 Quando Escolher WooCommerce

✅ **Escolha WooCommerce se:**
- Precisa de milhares de plugins prontos
- Quer interface administrativa familiar
- Não tem equipe técnica avançada
- Precisa de recursos específicos (marketplace, afiliados, etc.)
- Valoriza ecossistema maduro
- Quer temas prontos e customizáveis
- Precisa de compatibilidade com ferramentas existentes

✅ **Escolha MedusaJS se:**
- Quer performance máxima
- Precisa de API-first/headless
- Tem equipe de desenvolvimento
- Quer customização total
- Valoriza tecnologia moderna
- Planeja integrações complexas
- Quer menor overhead

## 🐛 Troubleshooting WooCommerce

### Erro 500 no WordPress
- Verifique logs: `/var/www/html/wp-content/debug.log`
- Aumente memória PHP em wp-config.php
- Desative plugins temporariamente

### Produtos não aparecem
- Verifique permalinks (Configurações > Links Permanentes)
- Limpe cache
- Verifique permissões de arquivos

### Gateway de pagamento não funciona
- Verifique credenciais
- Confirme webhook configurado
- Teste em modo sandbox primeiro

### Lentidão na loja
- Ative cache (WP Super Cache + Nginx)
- Otimize imagens
- Use CDN
- Aumente recursos do servidor

## 📚 Recursos Adicionais

- [Documentação WooCommerce](https://woocommerce.com/documentation/)
- [WordPress Codex](https://codex.wordpress.org/)
- [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [Mercado Pago WooCommerce](https://www.mercadopago.com.br/developers/pt/docs/woocommerce/introduction)

## 🤝 Contribuindo

Contribuições para melhorar a integração WooCommerce são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MelhoriaWooCommerce`)
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Licença

MIT License - Mesma licença do projeto principal

## 👤 Autor

**SrClauss**
- GitHub: [@SrClauss](https://github.com/SrClauss)

---

⭐️ WooCommerce + Docker + Automação = Sucesso! ⭐️
