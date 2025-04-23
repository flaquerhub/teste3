// Funções essenciais para a página de vendas
document.addEventListener('DOMContentLoaded', function() {
    // Rolagem suave para links internos
    document.querySelectorAll('.scroll-to').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Iniciar contador regressivo
    startCountdown();
    
    // Adicionar listener para o vídeo (para tracking)
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('play', function() {
            // Você pode adicionar tracking de conversão aqui
            console.log('Video started playing');
        });
        
        video.addEventListener('ended', function() {
            // Rolar automaticamente para a oferta quando o vídeo terminar
            const offerElement = document.getElementById('oferta');
            if (offerElement) {
                window.scrollTo({
                    top: offerElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Função de contador regressivo
function startCountdown() {
    // Define 24 horas a partir de agora
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Elementos do contador
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Tempo inicial (24 horas)
    let hours = 24;
    let minutes = 0;
    let seconds = 0;
    
    // Atualizar contador a cada segundo
    const countdownInterval = setInterval(function() {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    // Contador chegou a zero
                    clearInterval(countdownInterval);
                    // Você pode adicionar alguma ação quando o tempo acabar
                }
            }
        }
        
        // Atualizar elementos do DOM
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Adicionar efeito de urgência quando o usuário tentar sair da página
window.addEventListener('mouseout', function(e) {
    // Verifica se o mouse está saindo para a área superior da janela
    if (e.clientY < 20 && !sessionStorage.getItem('exitShown')) {
        // Armazena que já mostramos uma vez
        sessionStorage.setItem('exitShown', true);
        
        // Mostra algum incentivo ou urgência para permanecer (opcional)
        // Neste exemplo, vamos apenas scrollar para a oferta
        const offerElement = document.getElementById('oferta');
        if (offerElement) {
            window.scrollTo({
                top: offerElement.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    }
});