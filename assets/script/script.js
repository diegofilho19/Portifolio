document.addEventListener("DOMContentLoaded", function () {
            // ===== INICIALIZAÇÃO DAS ANIMAÇÕES AOS =====
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100,
                delay: 0,
                anchorPlacement: 'top-bottom'
            });

            // ===== NAVEGAÇÃO FIXA COM EFEITO SCROLL =====
            const navbar = document.querySelector('.custom-navbar');

            function handleNavbarScroll() {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }

            // ===== BOTÃO VOLTAR AO TOPO =====
            const backToTopButton = document.getElementById('backToTop');

            function handleBackToTop() {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }
            }

            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // ===== FORMULÁRIO DE CONTATO =====
            const contactForm = document.getElementById('contact-form');

            if (contactForm) {
                contactForm.addEventListener('submit', function (event) {
                    event.preventDefault();

                    // Simular envio do formulário
                    const submitButton = contactForm.querySelector('button[type="submit"]');
                    const originalText = submitButton.innerHTML;

                    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Enviando...';
                    submitButton.disabled = true;

                    // Simular delay de envio
                    setTimeout(() => {
                        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
                        contactForm.reset();

                        // Restaurar botão
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, 2000);
                });
            }

            // ===== ATIVAR LINK ATIVO NA NAVEGAÇÃO =====
            const navLinks = document.querySelectorAll('.nav-link');

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

            // ===== EVENT LISTENERS =====
            window.addEventListener('scroll', () => {
                handleNavbarScroll();
                handleBackToTop();
                setActiveNavLink();
            });

            // Inicializar
            handleNavbarScroll();
            handleBackToTop();
            setActiveNavLink();

            console.log('🚀 Portfólio Diego Medeiros carregado com sucesso!');
        });