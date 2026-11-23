document.addEventListener('DOMContentLoaded', () => {
  // 1. Registrar GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // 2. Navbar Fixa & Menu Mobile
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    mobileToggle.classList.toggle('active', isOpen);
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // 3. Animação de Entrada na Hero Section
  gsap.from('.hero-stagger', {
    y: 28,
    opacity: 0,
    duration: 0.85,
    stagger: 0.12,
    ease: 'power3.out'
  });

  gsap.from('.hero-visual-anim', {
    scale: 0.94,
    opacity: 0,
    duration: 1,
    delay: 0.25,
    ease: 'power3.out'
  });

  // 4. Flutuação Contínua dos Elementos da Brasa
  gsap.to('.float-core', {
    y: -8,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.float-node-1', {
    y: -6,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.float-node-2', {
    y: 6,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // 5. Revelação no Scroll com ScrollTrigger
  gsap.utils.toArray('.reveal-up').forEach((elem) => {
    gsap.from(elem, {
      scrollTrigger: {
        trigger: elem,
        start: 'top 86%',
        toggleActions: 'play none none none'
      },
      y: 32,
      opacity: 0,
      duration: 0.75,
      ease: 'power2.out'
    });
  });

  // 6. Abas Interativas do Cardápio
  const menuData = [
    {
      title: 'Principais & Grelha de Lenha',
      subtitle: 'Preparados na parrilla aberta a 380 °C',
      badge: 'Menu de Outono',
      rows: [
        { num: '01', name: 'Ancho Dry-Aged 45 Dias', desc: 'Tutano assado, emulsão de alho negro e farofa de brioche', price: 'R$ 168', tag: 'Assinatura' },
        { num: '02', name: 'Polvo na Brasa de Laranjeira', desc: 'Mousseline de mandioquinha defumada, azeite de páprica e crisp de couve', price: 'R$ 144', tag: 'Sem Glúten' },
        { num: '03', name: 'Couve-Flor Tostada Inteiramente', desc: 'Tahine de castanha-do-pará, romã fresca e ervas da horta', price: 'R$ 96', tag: 'Vegetariano' },
        { num: '04', name: 'Pato Laqueado no Mel de Jataí', desc: 'Demi-glace de tucupi preto e cenouras glaceadas na brasa', price: 'R$ 156', tag: 'Sazonal' }
      ]
    },
    {
      title: 'Coquetelaria Autoral & Infusões',
      subtitle: 'Criações do chefe de bar Gabriel Nogueira',
      badge: 'Carta de Inverno/Outono',
      rows: [
        { num: '01', name: 'Negroni de Brasa', desc: 'Gin botânico, vermute tinto infusionado com casca de laranja tostada e Campari', price: 'R$ 54', tag: 'Defumado' },
        { num: '02', name: 'Old Fashioned de Amburana', desc: 'Cachaça extra-premium, bitter de cacau e mel silvestre', price: 'R$ 58', tag: 'Intenso' },
        { num: '03', name: 'Sour de Cambuci & Gengibre', desc: 'Destilado nacional, redução ácida de cambuci e espuma cítrica', price: 'R$ 49', tag: 'Refrescante' },
        { num: '04', name: 'Elixir Bosque Noturno (Sem Álcool)', desc: 'Chá preto defumado lapsang, xarope de jabuticaba e tônica artesanal', price: 'R$ 38', tag: 'Zero Álcool' }
      ]
    },
    {
      title: 'Experiência Degustação 7 Tempos',
      subtitle: 'Servido exclusivamente para toda a mesa até às 21h30',
      badge: 'Chef Henrique Vasconcelos',
      rows: [
        { num: 'I', name: 'Percurso Completo (7 Tempos)', desc: 'Sequência autoral da entrada à sobremesa guiada pela sazonalidade', price: 'R$ 340', tag: 'Por Pessoa' },
        { num: 'II', name: 'Harmonização Vinhos Naturais', desc: 'Seleção de 5 taças de pequenos produtores sul-americanos e europeus', price: '+ R$ 210', tag: 'Opcional' },
        { num: 'III', name: 'Harmonização Botânica Zero Álcool', desc: 'Kombuchas da casa, infusões frias e fermentados de frutas nativas', price: '+ R$ 135', tag: 'Opcional' },
        { num: 'IV', name: 'Chef’s Table no Balcão', desc: 'Experiência comentada frente à grelha com taça de boas-vindas', price: 'R$ 390', tag: '12 Lugares' }
      ]
    }
  ];

  const tabCards = document.querySelectorAll('.tab-card');
  const showcaseContent = document.getElementById('showcaseContent');

  tabCards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = Number(card.dataset.tab);
      tabCards.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-selected', 'true');

      const data = menuData[idx];
      gsap.to(showcaseContent, {
        opacity: 0,
        y: 6,
        duration: 0.15,
        onComplete: () => {
          showcaseContent.innerHTML = `
            <div class="app-content__header">
              <div>
                <h4>${data.title}</h4>
                <p>${data.subtitle}</p>
              </div>
              <span class="status-pill">${data.badge}</span>
            </div>
            <div class="token-table">
              ${data.rows.map(r => `
                <div class="token-row">
                  <span class="dish-num">${r.num}</span>
                  <div>
                    <strong>${r.name}</strong>
                    <span class="dish-sub">${r.desc}</span>
                  </div>
                  <span class="token-val">${r.price}</span>
                  <span class="token-tag">${r.tag}</span>
                </div>
              `).join('')}
            </div>
          `;
          gsap.to(showcaseContent, { opacity: 1, y: 0, duration: 0.25 });
        }
      });
    });
  });

  // 7. Formulário de Reserva Interativo
  const resDate = document.getElementById('resDate');
  const resForm = document.getElementById('reservationForm');
  const formFeedback = document.getElementById('formFeedback');

  if (resDate) {
    const today = new Date().toISOString().split('T')[0];
    resDate.value = today;
    resDate.min = today;
  }

  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dateVal = resDate.value;
      const timeVal = document.getElementById('resTime').value;
      const guestsVal = document.getElementById('resGuests').value;
      formFeedback.textContent = `Solicitação recebida! Mesa para ${guestsVal} pessoa(s) no dia ${dateVal} às ${timeVal}. Nossa equipe enviará a confirmação em instantes.`;
    });
  }
});
