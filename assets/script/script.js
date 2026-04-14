    document.addEventListener("DOMContentLoaded", function () {
    // ===== MODO ESCURO (DARK MODE) =====
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle.querySelector("i");
    const body = document.body;

    // Verificar preferência salva ou do sistema
    const currentTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (currentTheme === "dark" || (!currentTheme && systemPrefersDark)) {
        body.classList.add("dark-mode");
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
            localStorage.setItem("theme", "light");
            themeIcon.classList.replace("fa-sun", "fa-moon");
        }
    });

    // ===== INICIALIZAÇÃO DAS ANIMAÇÕES AOS =====
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        offset: 100,
        delay: 0,
        anchorPlacement: "top-bottom",
    });

    // ===== NAVEGAÇÃO FIXA COM EFEITO SCROLL =====
    const navbar = document.querySelector(".custom-navbar");

    function handleNavbarScroll() {
        if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
        } else {
        navbar.classList.remove("scrolled");
        }
    }

    // ===== BOTÃO VOLTAR AO TOPO =====
    const backToTopButton = document.getElementById("backToTop");

    function handleBackToTop() {
        if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
        } else {
        backToTopButton.classList.remove("show");
        }
    }

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    });

    // ===== FORMULÁRIO DE CONTATO =====
    const form = document.getElementById("contact-form");
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const nameVal = formData.get("name") || "";
        const emailVal = formData.get("email") || "";
        const messageVal = formData.get("message") || "";

        // Email em formato texto simples
        const plainTextBody = `Nome: ${nameVal}
    E-mail: ${emailVal}

    Mensagem:
    ${messageVal}`;

        // Configuração para o Web3Forms
        formData.set("subject", `📧 Novo contato: ${nameVal}`);
        formData.set("message", plainTextBody);

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;

        const alertBox = document.getElementById("contact-alert");
        if (alertBox) {
        alertBox.classList.remove("alert-success", "alert-danger");
        alertBox.textContent = "";
        alertBox.style.display = "none";
        }

        try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            // Salvar TODOS os dados que a tela de confirmação espera
            try {
            localStorage.setItem("contact_message", messageVal);
            // Chave extra usada pelo seu botão de copiar/baixar no HTML
            localStorage.setItem("contact_message_full", messageVal);
            } catch (e) {
            console.error("Erro ao salvar no localStorage", e);
            }

            // Redirecionar para a página de confirmação
            window.location.href = "./confirm.html";
        } else {
            throw new Error(data.message || "Erro ao enviar a mensagem");
        }
        } catch (error) {
        console.error(error);
        if (alertBox) {
            alertBox.classList.add("alert-danger");
            alertBox.textContent =
            error.message || "Erro ao enviar. Tente novamente.";
            alertBox.style.display = "block";
        }
        } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        }
    });

    // ===== ATIVAR LINK ATIVO NA NAVEGAÇÃO =====
    const navLinks = document.querySelectorAll(".nav-link");

    function setActiveNavLink() {
        const sections = document.querySelectorAll("section[id]");
        const scrollPos = window.scrollY + 100;

        sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
                link.classList.add("active");
            }
            });
        }
        });
    }

    // ===== EVENT LISTENERS =====
    window.addEventListener("scroll", () => {
        handleNavbarScroll();
        handleBackToTop();
        setActiveNavLink();
    });

    // Inicializar estados
    handleNavbarScroll();
    handleBackToTop();
    setActiveNavLink();

    console.log("🚀 Portfólio Diego Medeiros carregado com sucesso!");

    // ===== EFEITO DE RAIOS ELÉTRICOS (LIGHTNING EFFECT) =====
    const canvas = document.getElementById("lightning-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let width, height;
        let cards = [];
        let lightnings = [];

        function resizeCanvas() {
            const section = document.getElementById("projetos");
            width = canvas.width = section.offsetWidth;
            height = canvas.height = section.offsetHeight;
            updateCardPositions();
        }

        function updateCardPositions() {
            const cardElements = document.querySelectorAll(".project-card");
            const sectionRect = document.getElementById("projetos").getBoundingClientRect();
            
            cards = Array.from(cardElements).map(el => {
                const rect = el.getBoundingClientRect();
                return {
                    x: rect.left - sectionRect.left + rect.width / 2,
                    y: rect.top - sectionRect.top + rect.height / 2,
                    width: rect.width,
                    height: rect.height,
                    active: false
                };
            });

            // Adicionar listeners de hover para intensificar o efeito
            cardElements.forEach((el, index) => {
                el.onmouseenter = () => { if(cards[index]) cards[index].active = true; };
                el.onmouseleave = () => { if(cards[index]) cards[index].active = false; };
            });
        }

        class Lightning {
            constructor(startX, startY, endX, endY, intensity = 1) {
                this.startX = startX;
                this.startY = startY;
                this.endX = endX;
                this.endY = endY;
                this.segments = [];
                this.life = 1.0;
                this.alpha = 0.5 * intensity;
                this.intensity = intensity;
                this.generate();
            }

            generate() {
                let x = this.startX;
                let y = this.startY;
                const segmentsCount = 8 + Math.random() * 5;
                const dx = (this.endX - this.startX) / segmentsCount;
                const dy = (this.endY - this.startY) / segmentsCount;
                const jitter = 30 * (1 / this.intensity);

                this.segments.push({x, y});

                for (let i = 1; i < segmentsCount; i++) {
                    x += dx + (Math.random() - 0.5) * jitter;
                    y += dy + (Math.random() - 0.5) * jitter;
                    this.segments.push({x, y});
                }

                this.segments.push({x: this.endX, y: this.endY});
            }

            draw() {
                ctx.beginPath();
                ctx.moveTo(this.segments[0].x, this.segments[0].y);
                for (let i = 1; i < this.segments.length; i++) {
                    ctx.lineTo(this.segments[i].x, this.segments[i].y);
                }

                // Estilo do raio
                const color = this.intensity > 1.5 ? "255, 50, 50" : "162, 10, 10";
                ctx.shadowBlur = 15 * this.intensity;
                ctx.shadowColor = `rgba(${color}, ${this.alpha})`;
                ctx.strokeStyle = `rgba(${color}, ${this.alpha})`;
                ctx.lineWidth = (1 + Math.random()) * this.intensity;
                ctx.stroke();
            }

            update() {
                this.life -= 0.05;
                this.alpha -= 0.02;
                return this.life > 0;
            }
        }

        function createRandomLightning() {
            if (cards.length < 2) return;
            
            // Escolher dois cards aleatórios ou um card e um ponto aleatório
            const c1 = cards[Math.floor(Math.random() * cards.length)];
            const c2 = cards[Math.floor(Math.random() * cards.length)];
            
            if (c1 === c2 && !c1.active) return;

            const intensity = (c1.active || c2.active) ? 2.5 : 1.0;
            
            // Ponto de origem e destino com um pouco de variação dentro do card
            const sX = c1.x + (Math.random() - 0.5) * c1.width * 0.8;
            const sY = c1.y + (Math.random() - 0.5) * c1.height * 0.8;
            const eX = c2.x + (Math.random() - 0.5) * c2.width * 0.8;
            const eY = c2.y + (Math.random() - 0.5) * c2.height * 0.8;

            lightnings.push(new Lightning(sX, sY, eX, eY, intensity));
        }

        function animate() {
            // Efeito de trail (rastro) suave
            ctx.clearRect(0, 0, width, height);
            
            if (Math.random() < 0.15) {
                createRandomLightning();
            }

            lightnings = lightnings.filter(l => {
                l.draw();
                return l.update();
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener("resize", resizeCanvas);
        setTimeout(() => {
            resizeCanvas();
            animate();
        }, 500); // Delay pequeno para garantir que o layout carregou
    }
    });
