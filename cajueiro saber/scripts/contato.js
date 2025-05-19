// Código para o funcionamento do modal de contato
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o modal já existe na página
    const modalExists = document.getElementById('modalContato');
    
    // Somente adicionar o modal se ele não existir
    if (!modalExists) {
        // 1. Adicionar o modal ao final do body
        const modalHTML = `
        <!-- Modal de Contato -->
        <div class="modal fade" id="modalContato" tabindex="-1" aria-labelledby="modalContatoLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalContatoLabel">Entre em Contato</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <form id="contactForm" class="needs-validation" novalidate>
                            <div class="form-group mb-3">
                                <label for="nome" class="form-label">Nome completo</label>
                                <input type="text" class="form-control" id="nome" placeholder="Seu nome" required>
                                <div class="invalid-feedback">
                                    Por favor, digite seu nome.
                                </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="email" class="form-label">E-mail</label>
                                <input type="email" class="form-control" id="email" placeholder="seu@email.com" required>
                                <div class="invalid-feedback">
                                    Por favor, digite um e-mail válido.
                                </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="assunto" class="form-label">Assunto</label>
                                <select class="form-select" id="assunto" required>
                                    <option value="" selected disabled>Selecione um assunto</option>
                                    <option>Dúvida</option>
                                    <option>Sugestão</option>
                                    <option>Reclamação</option>
                                    <option>Elogio</option>
                                    <option>Outro</option>
                                </select>
                                <div class="invalid-feedback">
                                    Por favor, selecione um assunto.
                                </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="mensagem" class="form-label">Mensagem</label>
                                <textarea class="form-control" id="mensagem" rows="5" placeholder="Escreva sua mensagem aqui..." required></textarea>
                                <div class="invalid-feedback">
                                    Por favor, escreva sua mensagem.
                                </div>
                            </div>
                            
                            <div class="form-group form-check mb-3">
                                <input type="checkbox" class="form-check-input" id="concordo" required>
                                <label class="form-check-label" for="concordo">Concordo com os termos de privacidade</label>
                                <div class="invalid-feedback">
                                    Você deve concordar para continuar.
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="btnEnviarContato">Enviar Mensagem</button>
                    </div>
                </div>
            </div>
        </div>

    <!-- Toast de confirmação -->
    <div class="position-fixed bottom-0 start-0 p-3" style="z-index: 11">
        <div id="confirmacaoToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-success text-white">
                <strong class="me-auto">Mensagem Enviada</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
        </div>
    </div>
        `;
        
        // Adiciona o modal ao final do body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // 2. Modificar os links de contato para abrir o modal
    const contatoLinks = document.querySelectorAll('a[href="#contato"]');
    contatoLinks.forEach(link => {
        if (!link.hasAttribute('data-bs-toggle')) {
            link.setAttribute('data-bs-toggle', 'modal');
            link.setAttribute('data-bs-target', '#modalContato');
            
            // Prevenimos que o link role para a seção de contato (footer)
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        }
    });
    
    // 3. Adicionar a lógica para o envio do formulário
    const btnEnviar = document.getElementById('btnEnviarContato');
    const contactForm = document.getElementById('contactForm');
    const modalContato = document.getElementById('modalContato');
    const confirmacaoToast = document.getElementById('confirmacaoToast');
    
    if (btnEnviar) {
        btnEnviar.addEventListener('click', () => {
            if (contactForm.checkValidity()) {
                // Múltiplas tentativas de fechar o modal para garantir que ele feche
                
                // Método 1: Usar bootstrap.Modal.getInstance
                const modalInstance = bootstrap.Modal.getInstance(modalContato);
                if (modalInstance) {
                    modalInstance.hide();
                }
                
                // Método 2: Força o fechamento usando jQuery (se disponível)
                if (typeof jQuery !== 'undefined') {
                    jQuery('#modalContato').modal('hide');
                }
                
                // Método 3: Remover manualmente os elementos do modal
                document.body.classList.remove('modal-open');
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
                if (modalContato) {
                    modalContato.classList.remove('show');
                    modalContato.style.display = 'none';
                    modalContato.setAttribute('aria-hidden', 'true');
                }
                
                // Mostrar toast de confirmação
                const toast = new bootstrap.Toast(confirmacaoToast);
                toast.show();
                
                // Limpar o formulário
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            } else {
                // Marcar campos inválidos
                contactForm.classList.add('was-validated');
            }
        });
    }
    
    // Resetar validação quando o modal for fechado
    if (modalContato) {
        modalContato.addEventListener('hidden.bs.modal', () => {
            if (contactForm) {
                contactForm.classList.remove('was-validated');
                contactForm.reset();
            }
        });
    }
});