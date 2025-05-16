// script.js - Funções personalizadas para Cajueiro Tech

document.addEventListener('DOMContentLoaded', function() {
    // Adiciona animação de fade ao banner quando a página carrega
    const banner = document.querySelector('.hero-banner');
    if (banner) {
        setTimeout(() => {
            banner.style.opacity = 1;
        }, 100);
    }

    // Adiciona efeito de destaque nos cards ao passar o mouse
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('shadow');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('shadow');
        });
    });

    // Validação simples para o formulário de contato (será usado na página de contato)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Validar campos obrigatórios
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // Validar e-mail
            const emailField = this.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('is-invalid');
                }
            }
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    }

    // Rolagem suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Função para mostrar mensagem de confirmação após envio do formulário
function showConfirmationMessage(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert alert-success alert-dismissible fade show';
    alertBox.setAttribute('role', 'alert');
    alertBox.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.prepend(alertBox);
        
        // Auto-fechar após 5 segundos
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertBox);
            bsAlert.close();
        }, 5000);
    }
}