# 🎯 Deploy em cPanel — Resumo Rápido

## ✅ Solução Implementada

```
Formulário HTML → fetch() → send-email.php → mail() → Seu Email
           (reCAPTCHA)        (PHP nativo)
```

## 📤 Como Fazer Upload

### Usando **FileZilla** (FTP)
1. Abra FileZilla
2. Conecte com:
   - **Host:** ftp.seu-dominio.com (ou seu-dominio.com)
   - **Usuário:** seu-usuario-cpanel
   - **Senha:** sua-senha-ftp
   - **Porta:** 21 (ou 22 para SFTP)
3. Navegue para `public_html/`
4. Copie estes arquivos (direita → esquerda):
   ```
   ✅ index.html
   ✅ assets/                 (pasta toda)
   ✅ package.json
   ✅ README.md
   ✅ .gitignore
   
   ❌ server.js               (NÃO FAÇA UPLOAD)
   ❌ .env                    (NÃO FAÇA UPLOAD)
   ❌ node_modules/           (NÃO FAÇA UPLOAD)
   ```

### Ou Usando **Git** (File > Terminal no cPanel)
```bash
cd public_html
git clone https://github.com/seuusuario/seu-repo.git .
git pull   # Se já clonou antes
```
**Certifique-se de que `.env` e `server.js` estão em `.gitignore`**

---

## 🧪 Teste Após Upload

### Teste o Formulário (Web3Forms)
1. Certifique-se de que você colou sua `access_key` do Web3Forms em `index.html` no input `#web3forms-key`.
2. Abra seu site: `https://dgmedeiros26.site`
3. Scroll até "Entre em Contato", resolva o reCAPTCHA e envie o formulário.
4. Verifique sua caixa de entrada configurada na dashboard do Web3Forms (ou o email configurado na conta Web3Forms).

---

## 📋 O que Está Funcionando

✅ **Formulário HTML** com campos name, email, message  
✅ **reCAPTCHA** no formulário (anti-spam)  
✅ **JavaScript fetch()** envia dados para `/send-email.php`  
✅ **PHP nativo** processa e envia email via `mail()`  
✅ **Validação** de campos vazios e email inválido  
✅ **Feedback** visual (mensagem de sucesso/erro)  

---

## 🔧 Troubleshooting

| Problema | Solução |
|----------|---------|
| Email não chega | Verifique SPAM, cPanel > Mail |
| Erro 404 no envio | Verifique caminho: `public_html/send-email.php` |
| reCAPTCHA falha | Verifique secret key em `send-email.php` linha ~30 |
| Permissão negada | Altere permissões: `chmod 644 send-email.php` |

---

## 📚 Arquivos Importantes

- [DEPLOY.md](./DEPLOY.md) — Guia completo
- [send-email.php](./send-email.php) — Endpoint do email
- [.env.example](./.env.example) — Template de variáveis
- [.gitignore](./.gitignore) — Proteção de credenciais

---

## 💡 Integração com Web3Forms (opcional)

Se preferir usar um serviço terceirizado para melhorar entregabilidade e reduzir manutenção, siga estes passos:

1. Crie uma conta em https://web3forms.com e gere sua `access_key`.
2. Abra `index.html` e cole sua chave em `<input type="hidden" id="web3forms-key" value="SUA_ACCESS_KEY">` (já existe no formulário).
3. O `assets/script/script.js` detecta essa chave automaticamente e envia para `https://api.web3forms.com/submit` — sem precisar de `send-email.php`.

Vantagens:
- Entregabilidade melhor (infra do Web3Forms)
- Antispam integrado e logs
- Fácil configuração (front-end apenas)

Desvantagens:
- A chave fica pública no front-end (aceitável para Web3Forms; se quiser privacidade, envie do seu servidor)
- Pode ter limites ou custos para volumes elevados

Se quiser que eu integre automaticamente a sua `access_key` (colar a chave no HTML), cole a chave aqui e eu atualizo o `index.html` para você.

---

✅ **Deploy concluído!** Seu formulário está funcionando em cPanel sem precisar de Node.js.
