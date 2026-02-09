    document.addEventListener("DOMContentLoaded", function () {
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
    });
