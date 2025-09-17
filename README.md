# Portfólio Diego Medeiros

Um portfólio pessoal moderno, minimalista e totalmente responsivo desenvolvido com HTML5, CSS3 e JavaScript vanilla.

## 🎨 Design

### Paleta de Cores
- **#040F0F** - Preto profundo (textos principais)
- **#6C0000** - Vermelho escuro (destaques)
- **#A20A0A** - Vermelho intenso (botões e acentos)
- **#2D3A3A** - Cinza escuro (textos secundários)
- **#FCFFFC** - Branco gelo (fundo principal)

### Características
- Design moderno e minimalista
- Layout responsivo (mobile-first)
- Tipografia elegante com fonte Inter
- Animações suaves e transições
- Navegação smooth scroll
- Menu mobile hambúrguer

## 🚀 Funcionalidades

### Navegação
- Menu fixo com efeito glassmorphism
- Navegação smooth scroll entre seções
- Menu mobile responsivo
- Indicador de seção ativa

### Seções
1. **Home** - Apresentação principal com foto e call-to-actions
2. **Sobre** - Informações pessoais e habilidades
3. **Projetos** - Galeria de projetos com overlay de links
4. **Contato** - Formulário funcional e links para redes sociais

### Interatividade
- Formulário de contato com validação
- Sistema de notificações
- Animações de scroll
- Efeitos hover nos cards
- Lazy loading de imagens

## 📱 Responsividade

O portfólio é totalmente responsivo com breakpoints para:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com variáveis CSS e Grid/Flexbox
- **JavaScript ES6+** - Interatividade e funcionalidades
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Inter)

## 📁 Estrutura de Arquivos

```
Portifolio/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos principais
│   ├── js/
│   │   └── script.js       # Funcionalidades JavaScript
│   ├── imgs/               # Imagens do portfólio
│   └── downloads/          # Arquivos para download
└── README.md               # Documentação
```

## 🎯 Como Usar

1. **Clone ou baixe** os arquivos do projeto
2. **Abra** o arquivo `index.html` em um navegador
3. **Personalize** as informações nas seções:
   - Nome e profissão na seção Home
   - Descrição pessoal na seção Sobre
   - Projetos na seção Projetos
   - Informações de contato na seção Contato

## 🔧 Personalização

### Cores
As cores podem ser alteradas nas variáveis CSS no arquivo `style.css`:

```css
:root {
    --color-deep-black: #040F0F;
    --color-dark-red: #6C0000;
    --color-intense-red: #A20A0A;
    --color-dark-gray: #2D3A3A;
    --color-ice-white: #FCFFFC;
}
```

### Conteúdo
- **Imagens**: Substitua as imagens na pasta `assets/imgs/`
- **Projetos**: Edite os cards de projetos no HTML
- **Links**: Atualize os links para redes sociais e projetos
- **Formulário**: Configure o envio do formulário de contato

### Funcionalidades JavaScript
O arquivo `script.js` contém todas as funcionalidades interativas:
- Navegação smooth scroll
- Menu mobile
- Formulário de contato
- Sistema de notificações
- Animações de scroll

## 📧 Integração de E-mail

Para tornar o formulário de contato funcional, você pode integrar com:
- **EmailJS** - Serviço gratuito para envio de e-mails
- **Netlify Forms** - Se hospedar no Netlify
- **Backend próprio** - PHP, Node.js, etc.

### Exemplo com EmailJS:
```javascript
// No script.js, substitua a função handleContactForm
function handleContactForm(event) {
    event.preventDefault();
    
    emailjs.sendForm('service_id', 'template_id', contactForm)
        .then(() => {
            showNotification('Mensagem enviada com sucesso!', 'success');
            contactForm.reset();
        })
        .catch(() => {
            showNotification('Erro ao enviar mensagem.', 'error');
        });
}
```

## 🌐 Hospedagem

O portfólio pode ser hospedado em:
- **GitHub Pages** (gratuito)
- **Netlify** (gratuito)
- **Vercel** (gratuito)
- **Qualquer servidor web**

## 📄 Licença

Este projeto é de uso livre para fins educacionais e pessoais.

## 👨‍💻 Autor

**Diego Medeiros**
- Email: dgmedeirosaafilho@gmail.com
- LinkedIn: [Diego Medeiros](https://www.linkedin.com/in/diego-medeiros-alves-de-ara%C3%BAjo-filho-71ba2a306/)
- GitHub: [diegofilho19](https://github.com/diegofilho19)
- Instagram: [@dgmedeirosf_](https://www.instagram.com/dgmedeirosf_/)

---

*Desenvolvido com ❤️ por Diego Medeiros*
