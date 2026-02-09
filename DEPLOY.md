# 📤 Guia de Deploy em cPanel

## ✅ Resumo da Solução

Para cPanel, adotamos uma solução front-end com **Web3Forms** (não é necessário PHP). Isso reduz manutenção e melhora entregabilidade.

### Arquivos Criados/Modificados:
- ✅ `assets/script/script.js` — Atualizado para enviar para Web3Forms quando `access_key` estiver preenchida
- ✅ `index.html` — Contém reCAPTCHA e campo oculto `#web3forms-key` para a `access_key`
- ❌ `server.js` — **Não usar em produção** (apenas local)
- ❌ `send-email.php` — **Removido** (não é mais necessário)

---

## 🚀 Passo a Passo de Deploy

### 1. **Preparar Arquivos Localmente**

```bash
# 1. Certifique-se de ter todos os arquivos git
git status

# 2. Faça commit das mudanças (opcional, se usar git)
git add .
git commit -m "Implementar formulário de contato com PHP e reCAPTCHA"
```

### 2. **Upload para cPanel (3 Opções)**

#### **Opção A: FTP (Mais Comum)**
```bash
# Use um cliente FTP como FileZilla ou WinSCP
# Conecte com:
# Host: seu-dominio.com ou ftp.seu-dominio.com
# Usuário: seu-usuario-cpanel
# Senha: sua-senha-ftp
# Porta: 21 (ou 22 para SFTP, mais seguro)

# Quadro de pastas:
# public_html/
#   ├── index.html
#   ├── send-email.php          ← NOVO!
#   ├── package.json
#   ├── assets/
#   │   ├── css/
#   │   ├── imgs/
#   │   └── script/
#   └── ... (resto dos arquivos)

# NÃO FAÇA UPLOAD:
# ❌ server.js
# ❌ .env (contém credenciais)
# ❌ node_modules/ (se existir)
```

#### **Opção B: cPanel File Manager**
1. Entre no **cPanel**
2. Vá para **File Manager** → **public_html**
3. Clique em **Upload** e selecione os arquivos (exceto `server.js` e `.env`)
4. Ou use **Upload de Arquivo** → selecione `send-email.php`

#### **Opção C: Git (GitHub → cPanel)**
```bash
# 1. Adicione .env e server.js ao .gitignore para não fazer commit
echo "server.js" >> .gitignore
echo ".env" >> .gitignore
echo "node_modules/" >> .gitignore

# 2. Faça commit e push
git add .gitignore
git commit -m "Ignorar arquivos de produção"
git push origin main

# 3. No cPanel, vá para Git Version Control ou Terminal
# e faça um git clone/pull do seu repositório
```

---

## ✨ Verificação Pós-Deploy

### Teste o Formulário (Web3Forms)
1. Crie uma conta em https://web3forms.com e gere sua `access_key`.
2. Cole a `access_key` em `index.html` no input oculto `#web3forms-key`.
3. Abra seu site: `https://dgmedeiros26.site` e envie o formulário.
4. Verifique a dashboard do Web3Forms ou o email configurado na conta para confirmação de envio.

---

## 🔒 Segurança

### ⚠️ Credenciais Sensíveis
- **reCAPTCHA Secret Key** não é necessário armazenar no servidor quando se usa Web3Forms (o token é gerado no cliente). Se você usar um proxy servidor, armazene secrets em variáveis de ambiente seguras.
- Mantenha `.env` fora do repositório Git

### 📋 Checklist Segurança
- ✅ `.env` adicionado ao `.gitignore` quando aplicável
- ✅ `server.js` **não deve** estar em produção
- ✅ reCAPTCHA protege contra spam/bots
- ✅ Verificação básica de campos vazios

---

## 🐛 Troubleshooting

### Email não chega
```
1. Verifique a pasta SPAM do email
2. cPanel > Email > Accounts > Verificar se existe account para receber
3. cPanel > Mail > Email Filtering > Verificar regras
```

### Erro "Falha na validação do captcha"
```
1. Verifique a secret key em send-email.php (linha ~30)
2. Confirme que o site key em index.html está correto (linha ~614)
3. Acesse: https://www.google.com/recaptcha/admin/
```

### Formulário não envia
```
1. Verifique no Console do navegador (F12) se há erros de rede ao chamar `https://api.web3forms.com/submit`.
2. Confirme que a `access_key` está preenchida em `index.html` (`#web3forms-key`).
3. Se necessário, use a dashboard do Web3Forms para ver logs de submissões.
```

---

## 📱 Local vs Produção

### Desenvolvimento Local (opcional)
Se quiser testar com Node.js antes de enviar:
```bash
npm install express dotenv cors nodemailer
npm start
# Acesse http://localhost:3000
```

### Produção (cPanel)
```bash
# Apenas upload dos arquivos PHP/HTML/CSS/JS
# Nenhum server.js rodando
# Nenhum npm install necessário
```

---

## ✅ Checklist Final de Deploy

- [ ] `assets/script/script.js` está configurado para Web3Forms quando `#web3forms-key` for preenchido
- [ ] `index.html` tem o formulário e reCAPTCHA
- [ ] `.env` **não está** no repositório Git
- [ ] `server.js` **não está** em produção
- [ ] Testou o formulário via Web3Forms e recebeu confirmação

---

**Dúvidas?** Teste localmente com `npm start` antes de fazer upload! 🚀
