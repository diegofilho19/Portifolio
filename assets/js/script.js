/**
 * Portfólio Diego Medeiros - JavaScript
 * Funcionalidades: Navegação, Smooth Scroll, Menu Mobile, Formulário de Contato
 */

document.addEventListener("DOMContentLoaded", function() {
    // ===== VARIÁVEIS GLOBAIS =====
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    
    // ===== NAVEGAÇÃO FIXA =====
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // ===== MENU MOBILE =====
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Previne scroll do body quando menu está aberto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
    
    // ===== NAVEGAÇÃO SMOOTH SCROLL =====
    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 70; // Altura da navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // ===== ATIVAR LINK ATIVO =====
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===== FORMULÁRIO DE CONTATO =====
    function handleContactForm(event) {
        event.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validação básica
        if (!name || !email || !message) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        // Simular envio do formulário
        showNotification('Enviando mensagem...', 'info');
        
        // Simular delay de envio
        setTimeout(() => {
            // Aqui você pode integrar com um serviço de e-mail como EmailJS
            // ou enviar para um backend
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            contactForm.reset();
        }, 2000);
    }
    
    // ===== VALIDAÇÃO DE E-MAIL =====
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ===== SISTEMA DE NOTIFICAÇÕES =====
    function showNotification(message, type = 'info') {
        // Remove notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Adiciona estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Anima entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove após 5 segundos
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Botão de fechar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });
    }
    
    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // ===== ANIMAÇÕES DE SCROLL =====
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .contact-method');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // ===== EFEITO DE DIGITAÇÃO =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // ===== CONTADOR ANIMADO =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // ===== LAZY LOADING DE IMAGENS =====
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ===== MODO ESCURO (OPCIONAL) =====
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }
    
    // ===== INICIALIZAÇÃO =====
    function init() {
        // Event Listeners
        window.addEventListener('scroll', () => {
            handleNavbarScroll();
            setActiveNavLink();
            handleScrollAnimations();
        });
        
        navToggle.addEventListener('click', toggleMobileMenu);
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                
                // Fecha menu mobile se estiver aberto
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                smoothScrollTo(target);
            });
        });
        
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactForm);
        }
        
        // Fecha menu mobile ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
        
        // Inicializa funcionalidades
        handleNavbarScroll();
        setActiveNavLink();
        handleScrollAnimations();
        lazyLoadImages();
        
        // Carrega modo escuro se salvo
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
        
        console.log('Portfólio carregado com sucesso! 🚀');
    }
    
    // ===== UTILITÁRIOS =====
    
    // Debounce function para otimizar performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function para scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Otimiza eventos de scroll
    const optimizedScrollHandler = throttle(() => {
        handleNavbarScroll();
        setActiveNavLink();
        handleScrollAnimations();
    }, 16); // ~60fps
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // ===== INICIALIZAÇÃO FINAL =====
    init();
    
    // ===== EXPORT PARA USO EXTERNO (se necessário) =====
    window.Portfolio = {
        showNotification,
        smoothScrollTo,
        toggleDarkMode,
        typeWriter,
        animateCounter
    };
});

// ===== SERVICE WORKER (PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
}

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    // Mede tempo de carregamento
    const loadTime = performance.now();
    console.log(`Página carregada em ${Math.round(loadTime)}ms`);
    
    // Monitora erros JavaScript
    window.addEventListener('error', (e) => {
        console.error('Erro JavaScript:', e.error);
    });
    
    // Monitora recursos não carregados
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Promise rejeitada:', e.reason);
    });
});