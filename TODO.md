# TODO - MedusaProject

## 🔴 Prioridade Alta (Funcionalidades Críticas)

### Backend - Implementações Reais
- [ ] **SSH Module - Conexão Real**
  - [ ] Implementar conexão SSH real (atualmente mock)
  - [ ] Adicionar pool de conexões para reutilização
  - [ ] Implementar reconnection logic
  - [ ] Adicionar timeout configurations
  
- [ ] **File Transfer**
  - [ ] Implementar SCP para enviar arquivos
  - [ ] Alternativa: implementar rsync over SSH
  - [ ] Transfer de docker-compose.yml
  - [ ] Transfer de Caddyfile
  - [ ] Transfer do frontend buildado
  
- [ ] **Server Provisioning**
  - [ ] Script de instalação do Docker
  - [ ] Script de instalação do Docker Compose
  - [ ] Verificação de portas (80, 443, 22)
  - [ ] Verificação de espaço em disco
  - [ ] Configuração de firewall (ufw)

- [ ] **MinIO Integration**
  - [ ] Implementar upload real de imagens para MinIO
  - [ ] Criar bucket automaticamente
  - [ ] Gerar URLs públicas das imagens
  - [ ] Implementar retry logic para uploads

- [ ] **Database Seeding**
  - [ ] Conectar ao PostgreSQL via tunnel SSH
  - [ ] Criar produtos via API do Medusa
  - [ ] Associar imagens aos produtos
  - [ ] Implementar transações para rollback

### Frontend Next.js Template
- [ ] **Criar Template Base**
  - [ ] Inicializar projeto Next.js 14
  - [ ] Configurar Tailwind CSS
  - [ ] Criar layout base (header, footer)
  - [ ] Implementar navegação

- [ ] **Páginas Principais**
  - [ ] Home page com produtos em destaque
  - [ ] Página de listagem de produtos
  - [ ] Página de detalhes do produto
  - [ ] Página do carrinho
  - [ ] Página de checkout

- [ ] **Integração Medusa**
  - [ ] Instalar @medusajs/medusa-js
  - [ ] Configurar cliente da API
  - [ ] Implementar busca de produtos
  - [ ] Implementar carrinho de compras
  - [ ] Integrar checkout

- [ ] **Integração Mercado Pago**
  - [ ] Instalar SDK do Mercado Pago
  - [ ] Implementar botão de pagamento
  - [ ] Implementar webhook handler
  - [ ] Processar notificações de pagamento

- [ ] **Tematização Dinâmica**
  - [ ] Sistema de tokens de design
  - [ ] Gerador de tailwind.config.js dinâmico
  - [ ] Variáveis CSS customizáveis
  - [ ] Aplicação de design schools

## 🟡 Prioridade Média (Melhorias)

### User Experience
- [ ] **Progress Persistence**
  - [ ] Salvar estado do wizard em arquivo local
  - [ ] Permitir retomar deploy interrompido
  - [ ] Implementar checkpoints por etapa
  
- [ ] **Error Recovery**
  - [ ] Retry automático para falhas transientes
  - [ ] Rollback de operações falhadas
  - [ ] Sugestões contextuais de correção
  
- [ ] **Validações**
  - [ ] Validação avançada de CSV
  - [ ] Preview de produtos antes do deploy
  - [ ] Validação de URLs de imagens
  - [ ] Teste de conectividade antes do deploy

### Funcionalidades Adicionais
- [ ] **Modo Simulação**
  - [ ] Deploy simulado sem servidor real
  - [ ] Logs mockados para demonstração
  - [ ] Preview do resultado final

- [ ] **Logs e Monitoramento**
  - [ ] Export de logs para arquivo
  - [ ] Histórico de deploys realizados
  - [ ] Dashboard de status pós-deploy

- [ ] **Customizações Extras**
  - [ ] Upload de logo da loja
  - [ ] Upload de favicon
  - [ ] Configuração de redes sociais
  - [ ] Configuração de analytics (GA4)

### Developer Experience
- [ ] **Testes**
  - [ ] Testes unitários React (Vitest)
  - [ ] Testes de integração Rust
  - [ ] E2E tests com Playwright
  - [ ] Coverage > 80%

- [ ] **CI/CD**
  - [ ] GitHub Actions para builds
  - [ ] Automatic releases
  - [ ] Changelog automático
  - [ ] Code quality checks

## 🟢 Prioridade Baixa (Nice to Have)

### Funcionalidades Avançadas
- [ ] **Multi-idioma**
  - [ ] i18n para o wizard
  - [ ] Template Next.js multi-idioma
  - [ ] Suporte PT, EN, ES

- [ ] **Integrações Adicionais**
  - [ ] Suporte a outros gateways (Stripe, PayPal)
  - [ ] Integração com CRM (RD Station, HubSpot)
  - [ ] Google Shopping integration
  - [ ] Facebook Pixel integration

- [ ] **Templates de Email**
  - [ ] Email de confirmação de pedido
  - [ ] Email de rastreamento
  - [ ] Email de abandono de carrinho
  - [ ] Newsletter

- [ ] **SEO Avançado**
  - [ ] Sitemap automático
  - [ ] Meta tags otimizadas
  - [ ] Schema.org markup
  - [ ] OpenGraph tags

### DevOps
- [ ] **Provisionamento Avançado**
  - [ ] Suporte a múltiplos servidores
  - [ ] Load balancing
  - [ ] Backup automático
  - [ ] Monitoring (Prometheus/Grafana)

- [ ] **Alternativas de Hosting**
  - [ ] Deploy em AWS
  - [ ] Deploy em DigitalOcean
  - [ ] Deploy em Vercel (frontend)
  - [ ] Deploy em Railway

### UI/UX
- [ ] **Melhorias Visuais**
  - [ ] Animações Framer Motion
  - [ ] Skeleton loaders
  - [ ] Toast notifications
  - [ ] Dark mode

- [ ] **Acessibilidade**
  - [ ] ARIA labels completos
  - [ ] Navegação por teclado
  - [ ] Screen reader support
  - [ ] Contraste de cores (WCAG AA)

## 🐛 Bugs Conhecidos

- [ ] Unused functions warnings no Rust (optimize_image, etc)
- [ ] Necessário tratamento de erros mais robusto no SSH
- [ ] CSV parser precisa validar tipos de dados
- [ ] Image scanner pode falhar com nomes de arquivo especiais

## 📚 Documentação Pendente

- [ ] Tutorial em vídeo
- [ ] Guia de troubleshooting expandido
- [ ] API documentation para módulos Rust
- [ ] Diagramas de arquitetura
- [ ] Casos de uso e exemplos reais
- [ ] FAQ

## 🔧 Refatorações

- [ ] Extrair lógica de negócio dos componentes React
- [ ] Criar custom hooks reutilizáveis
- [ ] Melhorar tipagem TypeScript
- [ ] Adicionar error boundaries no React
- [ ] Melhorar organização de módulos Rust

## 🎯 Métricas de Sucesso

- [ ] Build < 5MB (compressed)
- [ ] Deploy completo < 10 minutos
- [ ] First contentful paint < 2s
- [ ] Time to interactive < 3s
- [ ] Lighthouse score > 90

## 📊 Roadmap de Versões

### v0.2.0 - MVP Completo
- ✅ Wizard UI completo
- ✅ Estrutura Rust básica
- [ ] SSH real implementation
- [ ] File transfer working
- [ ] Template Next.js básico

### v0.3.0 - Deploy Funcional
- [ ] Deploy end-to-end working
- [ ] Mercado Pago integration
- [ ] Image optimization
- [ ] Database seeding

### v0.4.0 - Polish
- [ ] Error recovery
- [ ] Progress persistence
- [ ] Better error messages
- [ ] Documentation complete

### v1.0.0 - Production Ready
- [ ] All features implemented
- [ ] Tests coverage > 80%
- [ ] Performance optimized
- [ ] Security audit passed
- [ ] Documentation complete
- [ ] CI/CD setup

### v1.1.0 - Enhancements
- [ ] Multi-language support
- [ ] Additional payment gateways
- [ ] Advanced customization
- [ ] Analytics integration

## 💡 Ideias para o Futuro

- Plugin system para extensibilidade
- Marketplace de temas
- Integração com Shopify/WooCommerce (migração)
- Mobile app para gestão da loja
- White-label version
- SaaS offering (hosted wizard)

---

**Última atualização:** 2026-02-14

**Contribuidores:** Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para contribuir!
