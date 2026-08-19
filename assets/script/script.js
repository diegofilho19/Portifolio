document.addEventListener("DOMContentLoaded", function () {

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ===== TEMA CLARO / ESCURO =====
    // Tema escuro é o padrão (identidade "editor de código").
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle.querySelector("i");
    const body = document.body;

    // Escuro é sempre o padrão, a preferência do sistema é ignorada.
    // Só muda para claro se a pessoa clicar no botão (e a escolha fica salva).
    const savedTheme = localStorage.getItem("theme");

    function applyTheme(isLight) {
        body.classList.toggle("light-mode", isLight);
        themeIcon.classList.toggle("fa-sun", !isLight);
        themeIcon.classList.toggle("fa-moon", isLight);
    }

    applyTheme(savedTheme === "light");

    themeToggle.addEventListener("click", () => {
        const isLight = !body.classList.contains("light-mode");
        applyTheme(isLight);
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });

    // ===== ANIMAÇÃO DE DIGITAÇÃO DO CÓDIGO NO HERO =====
    const heroCode = document.getElementById("heroCode");
    if (heroCode) {
        const lines = heroCode.querySelectorAll(".code-line");
        if (prefersReducedMotion) {
            heroCode.classList.add("no-anim");
        } else {
            lines.forEach((line, i) => {
                line.style.animationDelay = `${i * 90}ms`;
            });
        }
    }

    // ===== INICIALIZAÇÃO DAS ANIMAÇÕES AOS =====
    AOS.init({
        duration: 700,
        easing: "ease-in-out",
        once: true,
        offset: 80,
        delay: 0,
        anchorPlacement: "top-bottom",
        disable: prefersReducedMotion,
    });

    // ===== NAVEGAÇÃO FIXA COM EFEITO SCROLL =====
    const navbar = document.querySelector(".custom-navbar");

    function handleNavbarScroll() {
        if (window.scrollY > 80) {
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
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
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

        const plainTextBody = `Nome: ${nameVal}
E-mail: ${emailVal}

Mensagem:
${messageVal}`;

        formData.set("subject", `📧 Novo contato: ${nameVal}`);
        formData.set("message", plainTextBody);

        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
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
                try {
                    localStorage.setItem("contact_message", messageVal);
                    localStorage.setItem("contact_message_full", messageVal);
                } catch (e) {
                    console.error("Erro ao salvar no localStorage", e);
                }

                window.location.href = "./confirm.html";
            } else {
                throw new Error(data.message || "Erro ao enviar a mensagem");
            }
        } catch (error) {
            console.error(error);
            if (alertBox) {
                alertBox.classList.add("alert-danger");
                alertBox.textContent = error.message || "Erro ao enviar. Tente novamente.";
                alertBox.style.display = "block";
            }
        } finally {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }
    });

    // ===== ABA ATIVA NA NAVEGAÇÃO =====
    const navLinks = document.querySelectorAll(".ide-tab");

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

    window.addEventListener("scroll", () => {
        handleNavbarScroll();
        handleBackToTop();
        setActiveNavLink();
    });

    handleNavbarScroll();
    handleBackToTop();
    setActiveNavLink();

    console.log("🚀 Portfólio Diego Medeiros carregado com sucesso!");
});