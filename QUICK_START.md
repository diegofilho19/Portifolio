# 🚀 Quick Start — 5 Minutos para Deploy

## 1️⃣ Prepare os Arquivos Localmente

```bash
# Certifique-se de estar no diretório do projeto
cd ~/Documents/Portifolio

# Verifique se os arquivos estão prontos
ls -la index.html assets/
```

## 2️⃣ Conecte ao cPanel via FTP

### Instale **FileZilla** (gratuito)
https://filezilla-project.org/

### Conecte:
```
Host: seu-dominio.com  (ou ftp.seu-dominio.com)
Usuario: seu-usuario-cpanel
Senha: sua-senha-ftp
Porta: 21 (ou 22 para SFTP)
```

## 3️⃣ Upload dos Arquivos

**Estrutura esperada em `public_html/`:**
```
public_html/
├── index.html
```
├── package.json
├── README.md
├── DEPLOY.md
├── DEPLOY_CPANEL.md
├── .gitignore
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── imgs/
│   ├── script/
│   │   └── script.js           ← JÁ ATUALIZADO
│   └── downloads/
└── ... (outros arquivos)
```

**Arquivos a NÃO copiar:**
```
❌ server.js        (Node.js — não serve em cPanel)
❌ .env             (Contém senhas — já compactado)
❌ node_modules/    (Dependencies — não necessário)
```

## 4️⃣ Teste Rápido

### A. Verifique a chave do Web3Forms
1. Confirme que você colocou sua `access_key` em `index.html` (`#web3forms-key`).
2. Se não tiver uma chave, crie uma conta em https://web3forms.com e gere a `access_key`.

### B. Teste o Formulário
1. Abra https://dgmedeiros26.site
2. Scroll até **"Entre em Contato"**
3. Resolva o reCAPTCHA
4. Preencha os campos
5. Clique **Enviar Mensagem**

**Você deve receber email em:**  
📧 diegoalves11demedeiros@gmail.com

---

## ✅ Status Checklist

- [ ] Fiz download do projeto atualizado
- [ ] Abri FileZilla e conectei no cPanel
- [ ] Copiei os arquivos para `public_html/`
- [ ] Verifiquei que `send-email.php` está lá
- [ ] Testei `https://seu-dominio.com/send-email.php`
- [ ] Testei o formulário no site
- [ ] Recebi um email de teste

---

## 🆘 Algo deu errado?

### Email não chega
```
1. Verifique a pasta SPAM
2. cPanel > Mail > Email Filtering (verificar regras de bloqueio)
3. Tente enviar novamente
```

### Erro ao enviar o formulário
```
1. Abra Developer Tools (F12)
2. Vá para Console
3. Procure por erros em vermelho
4. Copie e compartilhe comigo
```

### Arquivo não encontrado (404)
```
1. Verifique se `send-email.php` está em `public_html/`
2. Se sim, tente renomear para `send_email.php` (sem hífen)
3. Vá em cPanel > File Manager > change permissions para 755
```

---

## 📞 Documentação Completa

Para detalhes: veja [DEPLOY.md](./DEPLOY.md) ou [DEPLOY_CPANEL.md](./DEPLOY_CPANEL.md)

---

**Está pronto? Comece pelo Passo 1!** 🎯
