// ==========================================================================
// FLORA LAILY FLORICULTURA — SCRIPT INTERATIVO (MENU & PEDIDO WHATSAPP)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. MENU MOBILE RESPONSIVO EM 'X' ---
  const burger = document.getElementById('burger');
  const navWrapper = document.getElementById('navWrapper');

  if (burger && navWrapper) {
    burger.addEventListener('click', () => {
      const isActive = navWrapper.classList.toggle('active');
      burger.classList.toggle('active', isActive);
      burger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    navWrapper.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        navWrapper.classList.remove('active');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

});

// --- 2. ENVIO DO FORMULÁRIO DE ARRANJO PARA WHATSAPP ---
function sendFloraQuote(event) {
  event.preventDefault();
  const occasion = document.getElementById('quoteOccasion').value;
  const flowerType = document.getElementById('quoteFlowerType').value;
  const detail = document.getElementById('quoteDetail').value;

  let text = `Olá! Gostaria de encomendar flores na Flora Laily:%0A%0A`;
  text += `🌸 *Ocasião:* ${encodeURIComponent(occasion)}%0A`;
  text += `💐 *Preferência:* ${encodeURIComponent(flowerType)}%0A`;
  if (detail) {
    text += `📝 *Mensagem / Detalhes:* ${encodeURIComponent(detail)}%0A`;
  }
  text += `%0AAguardo atendimento para finalizar a entrega!`;

  window.open(`https://api.whatsapp.com/send?phone=5537984136082&text=${text}`, '_blank');
}
