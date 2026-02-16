# 🔄 Guia de Migração entre Variantes

## Objetivo

Este documento explica como trabalhar com ambas as variantes do projeto e como migrar recursos entre elas.

## 📋 Cenários Comuns

### Cenário 1: Testar Ambas as Variantes

Se você quer testar tanto o MedusaJS quanto o WooCommerce:

```bash
# Terminal 1 - MedusaJS
cd original
npm install
npm run dev

# Terminal 2 - WooCommerce (em outra janela)
cd woocommerce
npm install
npm run dev
```

Ambos podem rodar simultaneamente em portas diferentes.

### Cenário 2: Focar em Uma Variante

Se você decidir focar apenas em uma das variantes:

```bash
# Apenas MedusaJS
cd original
npm install
npm run dev

# OU apenas WooCommerce
cd woocommerce
npm install
npm run dev
```

### Cenário 3: Contribuir para Ambas

Você pode contribuir para ambas as variantes mantendo branches separadas:

```bash
# Branch para features do MedusaJS
git checkout -b feature/medusa-new-feature
cd original
# ... faça suas mudanças

# Branch para features do WooCommerce
git checkout -b feature/woocommerce-new-feature
cd woocommerce
# ... faça suas mudanças
```

## 🔀 Compartilhando Código entre Variantes

Alguns componentes podem ser compartilhados entre as variantes:

### Componentes Reutilizáveis

Componentes UI genéricos podem ser copiados entre projetos:

```bash
# Copiar um componente do original para woocommerce
cp original/src/components/wizard/WizardStepper.jsx \
   woocommerce/src/components/wizard/WizardStepper.jsx
```

### Módulos Rust Compartilháveis

Alguns módulos Rust podem ser aproveitados:

```bash
# SSH module é similar em ambos
cp original/src-tauri/src/modules/ssh.rs \
   woocommerce/src-tauri/src/modules/ssh.rs

# Adapte conforme necessário
```

### Assets e Estilos

Recursos visuais podem ser compartilhados:

```bash
# Compartilhar ícones
cp -r original/public/* woocommerce/public/

# Compartilhar configurações de estilo
cp original/tailwind.config.js woocommerce/tailwind.config.js
```

## 🚀 Decisão: Qual Variante Usar?

### Use MedusaJS (`original/`) se:

✅ **Performance é crítica**
- Aplicações de alto tráfego
- Necessidade de respostas rápidas da API
- Arquitetura headless para múltiplos frontends

✅ **Customização profunda necessária**
- Controle total sobre UI/UX
- Lógica de negócio específica
- Integrações complexas com sistemas externos

✅ **Equipe técnica qualificada**
- Desenvolvedores Node.js/React experientes
- Capacidade de manter código personalizado
- Conforto com desenvolvimento moderno

✅ **Projeto de longo prazo**
- Investimento em arquitetura escalável
- Evolução contínua do produto
- Necessidade de múltiplos canais (web, mobile, IoT)

### Use WooCommerce (`woocommerce/`) se:

✅ **Velocidade de entrega é prioridade**
- Lançamento rápido no mercado
- Prototipagem e validação de conceito
- Orçamento limitado para desenvolvimento

✅ **Ecossistema maduro importante**
- Necessidade de plugins específicos
- Integrações com serviços populares
- Temas profissionais prontos

✅ **Equipe menos técnica**
- Operação por não-desenvolvedores
- Interface administrativa conhecida
- Menor necessidade de manutenção técnica

✅ **Funcionalidades padrão suficientes**
- Loja tradicional de e-commerce
- Não requer customizações complexas
- Uso de funcionalidades WordPress existentes

## 📊 Matriz de Decisão Rápida

| Critério | MedusaJS | WooCommerce | Decisão |
|----------|----------|-------------|---------|
| Orçamento < $5k | ❌ | ✅ | WooCommerce |
| Orçamento > $20k | ✅ | ✅ | Ambos viáveis |
| Prazo < 1 mês | ❌ | ✅ | WooCommerce |
| Prazo > 3 meses | ✅ | ✅ | Avaliar outros critérios |
| Equipe < 3 devs | ❌ | ✅ | WooCommerce |
| Equipe > 5 devs | ✅ | ✅ | MedusaJS |
| Tráfego > 100k/mês | ✅ | ⚠️ | MedusaJS |
| Integrações complexas | ✅ | ⚠️ | MedusaJS |
| UI 100% personalizada | ✅ | ❌ | MedusaJS |
| Plugins específicos | ❌ | ✅ | WooCommerce |

Legenda: ✅ Excelente | ⚠️ Possível com esforço | ❌ Não recomendado

## 🔧 Configuração de Desenvolvimento

### Recomendações de IDE

#### Para MedusaJS:
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "rust-lang.rust-analyzer",
    "tauri-apps.tauri-vscode"
  ]
}
```

#### Para WooCommerce:
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "rust-lang.rust-analyzer",
    "tauri-apps.tauri-vscode",
    "wordpresstoolbox.wordpress-toolbox"
  ]
}
```

## 📦 Gerenciamento de Dependências

### Atualizando Dependências

```bash
# MedusaJS
cd original
npm update
npm audit fix

# WooCommerce
cd woocommerce
npm update
npm audit fix
```

### Sincronizando Versões Comuns

Se quiser manter versões sincronizadas de dependências compartilhadas:

```bash
# Copiar versões do React, Tailwind, etc.
# Compare os package.json e atualize manualmente
diff original/package.json woocommerce/package.json
```

## 🧪 Testando Ambas as Variantes

### Testes Locais

```bash
# Script para testar ambos
#!/bin/bash

echo "Testing MedusaJS..."
cd original
npm test

echo "Testing WooCommerce..."
cd ../woocommerce
npm test
```

### Build de Ambos

```bash
# Script para build de ambos
#!/bin/bash

echo "Building MedusaJS..."
cd original
npm run build
npm run tauri build

echo "Building WooCommerce..."
cd ../woocommerce
npm run build
npm run tauri build
```

## 📝 Convenções de Commit

Use prefixos para identificar qual variante foi modificada:

```bash
# Commits no MedusaJS
git commit -m "medusa: Add new payment gateway"
git commit -m "medusa: Fix deployment bug"

# Commits no WooCommerce
git commit -m "woocommerce: Implement theme selector"
git commit -m "woocommerce: Update docker config"

# Commits que afetam ambos
git commit -m "docs: Update main README"
git commit -m "chore: Update .gitignore"

# Commits de refatoração compartilhada
git commit -m "refactor: Extract common SSH module"
```

## 🔄 Processo de Migração de Recursos

Se você desenvolveu algo no MedusaJS e quer portar para WooCommerce:

### 1. Identifique Componentes Portáveis

```bash
# Componentes de UI genéricos
original/src/components/wizard/WizardStepper.jsx

# Utilitários sem dependências específicas
original/src/utils/validation.js

# Módulos Rust genéricos
original/src-tauri/src/modules/ssh.rs
```

### 2. Copie e Adapte

```bash
# Copiar arquivo
cp original/src/components/wizard/WizardStepper.jsx \
   woocommerce/src/components/wizard/WizardStepper.jsx

# Editar e adaptar para WooCommerce
nano woocommerce/src/components/wizard/WizardStepper.jsx
```

### 3. Ajuste Importações

```javascript
// Adapte imports para o contexto WooCommerce
import { useWizard } from '../../contexts/WizardContext';
```

### 4. Teste

```bash
cd woocommerce
npm run dev
# Verifique que tudo funciona
```

## 🎯 Estratégia Híbrida

Para projetos que precisam de ambos:

1. **Desenvolvimento Paralelo**: Duas equipes trabalhando simultaneamente
2. **Código Compartilhado**: Extrair componentes comuns para biblioteca
3. **Branches Separadas**: Manter branches específicas por variante
4. **Releases Independentes**: Versionar cada variante separadamente

## 📚 Recursos Adicionais

- [Documentação MedusaJS](./original/README.md)
- [Documentação WooCommerce](./woocommerce/README.md)
- [Guia de Desenvolvimento Original](./original/DEVELOPMENT.md)
- [Guia de Desenvolvimento WooCommerce](./woocommerce/DEVELOPMENT.md)

## 🤝 Contribuindo

Contribuições são bem-vindas em ambas as variantes! Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes.

---

**Escolha a variante certa para seu projeto e bom desenvolvimento! 🚀**
