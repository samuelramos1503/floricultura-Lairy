// ==========================================================================
// FLORA LAILY FLORICULTURA — SCRIPT INTERATIVO (CARROSSEL & WHATSAPP)
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

  // --- 2. CARROSSEL DE AVALIAÇÕES (CLIQUE DAS SETAS & TOQUE) ---
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('revPrevBtn');
  const nextBtn = document.getElementById('revNextBtn');
  const dotsContainer = document.getElementById('reviewsDots');

  if (track) {
    const cards = Array.from(track.querySelectorAll('.review-card'));
    let currentIdx = 0;

    if (dotsContainer && dotsContainer.children.length === 0) {
      cards.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
          scrollToIndex(idx);
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel-dot')) : [];

    function scrollToIndex(index) {
      if (cards.length === 0) return;
      if (index < 0) index = 0;
      if (index >= cards.length) index = cards.length - 1;
      currentIdx = index;

      cards[currentIdx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });

      if (dots.length > 0) {
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
      }
    }

    function updateActiveDotOnScroll() {
      if (cards.length === 0) return;
      const trackRect = track.getBoundingClientRect();
      let closestIdx = 0;
      let minDiff = Infinity;

      cards.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect();
        const diff = Math.abs(cardRect.left - trackRect.left);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      currentIdx = closestIdx;
      if (dots.length > 0) {
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
      }
    }

    track.addEventListener('scroll', updateActiveDotOnScroll, { passive: true });

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        scrollToIndex(currentIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        scrollToIndex(currentIdx + 1);
      });
    }

    let autoTimer = setInterval(() => {
      let nextIdx = (currentIdx + 1) % cards.length;
      scrollToIndex(nextIdx);
    }, 6000);

    track.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.addEventListener('touchstart', () => clearInterval(autoTimer), { passive: true });
  }

});

// --- 3. ENVIO DO FORMULÁRIO DE ARRANJO PARA WHATSAPP ---
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
