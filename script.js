// Estableix la data i hora del casament
const weddingDate = new Date("June 13, 2026 17:00:00").getTime();

// Elements del DOM
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const daysProgress = document.getElementById('days-progress');
const hoursProgress = document.getElementById('hours-progress');
const minutesProgress = document.getElementById('minutes-progress');
const secondsProgress = document.getElementById('seconds-progress');

// El radi del cercle de progrés
const radius = daysProgress.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

// Inicialitza els cercles
[daysProgress, hoursProgress, minutesProgress, secondsProgress].forEach(circle => {
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
});

const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        clearInterval(countdown);
        daysEl.innerHTML = "00";
        hoursEl.innerHTML = "00";
        minutesEl.innerHTML = "00";
        secondsEl.innerHTML = "00";
        // Assegura que els cercles quedin a 0
        [daysProgress, hoursProgress, minutesProgress, secondsProgress].forEach(c => c.style.strokeDashoffset = circumference);
        return;
    }

    // Càlculs de temps
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualitza els números (amb un 0 davant si cal)
    daysEl.innerHTML = String(days).padStart(2, '0');
    hoursEl.innerHTML = String(hours).padStart(2, '0');
    minutesEl.innerHTML = String(minutes).padStart(2, '0');
    secondsEl.innerHTML = String(seconds).padStart(2, '0');
    
    // Actualitza els cercles de progrés
    // (Considerant 365 dies en un any per al cercle de dies)
    daysProgress.style.strokeDashoffset = circumference - (days / 365) * circumference;
    hoursProgress.style.strokeDashoffset = circumference - (hours / 24) * circumference;
    minutesProgress.style.strokeDashoffset = circumference - (minutes / 60) * circumference;
    secondsProgress.style.strokeDashoffset = circumference - (seconds / 60) * circumference;

}, 1000);
const nav = document.querySelector('.sticky-nav');
const navLinks = document.querySelectorAll('.sticky-nav a');
const sections = document.querySelectorAll('header[id], section[id]');

// Función para el fondo del menú al hacer scroll
function handleNavBackground() {
    if (window.scrollY > 50) { // Si el scroll es mayor a 50px
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Función para el enlace activo al hacer scroll
function handleActiveLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // La altura del menú es ~60px, usamos ese offset
        if (pageYOffset >= sectionTop - 70) { 
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Escuchar el evento de scroll y ejecutar ambas funciones
window.addEventListener('scroll', function() {
    handleNavBackground();
    handleActiveLink();
});

// Ejecutar una vez al cargar la página por si no empieza arriba del todo
handleActiveLink();

document.getElementById('copy-button').addEventListener('click', function() {
    const ibanText = document.getElementById('iban-number').innerText;
    const popup = document.getElementById('copy-popup');

    navigator.clipboard.writeText(ibanText).then(() => {
        // Muestra el pop-up añadiendo la clase 'show'
        popup.classList.add('show');

        // Oculta el pop-up después de 1.5 segundos
        setTimeout(() => {
            popup.classList.remove('show');
        }, 1500);
    }).catch(err => {
        console.error('Error al copiar el IBAN: ', err);
    });
});

// ===== CÓDIGO SIMPLIFICADO PARA EL MENÚ MÓVIL =====
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks2 = document.getElementById('primary-navigation');

hamburgerBtn.addEventListener('click', () => {
    const isVisible = navLinks2.getAttribute('data-visible') === 'true';

    if (isVisible) {
        navLinks2.setAttribute('data-visible', 'false');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    } else {
        navLinks2.setAttribute('data-visible', 'true');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
});

// Cierra el menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks2.setAttribute('data-visible', 'false');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
});

// ===== CÓDIGO CORREGIDO PARA EL POP-UP DE LA IMAGEN DE HORARIOS =====
document.addEventListener('DOMContentLoaded', function() {
    // Obtener los elementos del DOM
    const modal = document.getElementById("image-modal");
    const triggerImage = document.getElementById("horaris-image");
    const modalImage = document.getElementById("modal-image");
    const closeBtn = document.querySelector(".modal-close-btn");
    const bodyElForModal = document.body;

    // Verificamos que la imagen y el modal existen antes de continuar
    if (triggerImage && modal) {
        
        // Abre el modal al hacer clic en la imagen de horarios
        triggerImage.onclick = function() {
        modal.style.display = "block";
        modalImage.src = this.src;
        bodyElForModal.classList.add("no-scroll");
        }

        // Cierra el modal con el botón 'X'
        closeBtn.onclick = function() {
        modal.style.display = "none";
        bodyElForModal.classList.remove("no-scroll");
        }

        // Cierra el modal al hacer clic en el fondo gris
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                bodyElForModal.classList.remove("no-scroll");
            }
        });
    }
});


// ===== CÓDIGO PARA COPIAR LA DIRECCIÓN =====
document.getElementById('copy-address-btn').addEventListener('click', function() {
    const addressText = document.getElementById('address-text').innerText;
    const popup = document.getElementById('copy-address-popup');

    navigator.clipboard.writeText(addressText).then(() => {
        // Muestra el pop-up
        popup.classList.add('show');

        // Oculta el pop-up después de 1.5 segundos
        setTimeout(() => {
            popup.classList.remove('show');
        }, 1500);
    }).catch(err => {
        console.error('Error al copiar la dirección: ', err);
    });
});


// ===== CÓDIGO PARA CARRUSEL DE IMAGENES =====
// ===== Carrusel 4:3 — versión unificada y robusta =====
(function () {
  function initCarousel() {
    const track = document.getElementById('photos-track');
    if (!track) return; // no hay carrusel en esta página

    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    // Activa y opcionalmente centra
    function activateAndCenter(targetSlide, center = true) {
      if (!targetSlide) return;
      slides.forEach(s => s.classList.remove('is-active'));
      targetSlide.classList.add('is-active');

      if (!center) return;

      const viewport = track;
      const slideRect = targetSlide.getBoundingClientRect();
      const vpRect = viewport.getBoundingClientRect();
      const currentScroll = viewport.scrollLeft;
      const slideCenter = slideRect.left - vpRect.left + currentScroll + slideRect.width / 2;
      const targetScrollLeft = Math.max(0, slideCenter - vpRect.width / 2);
      viewport.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
    }

    // Click en miniatura
    track.addEventListener('click', (e) => {
      const btn = e.target.closest('.slide-btn');
      if (!btn || !track.contains(btn)) return;
      const slide = btn.closest('.carousel-slide');
      activateAndCenter(slide, true);
    });

    // Selección inicial: tercera si existe, si no la primera
    const initial = track.querySelector('.carousel-slide.is-active') || slides[2] || slides[0];
    activateAndCenter(initial, true);

    // Mantener centrada al redimensionar
    window.addEventListener('resize', () => {
      const active = track.querySelector('.carousel-slide.is-active') || slides[2] || slides[0];
      activateAndCenter(active, true);
    });

    // Auto-activar por visibilidad (>50%) en móvil
    function enableMobileAutoActive() {
      if (!window.matchMedia('(max-width: 768px)').matches) return;

      const io = new IntersectionObserver((entries) => {
        const candidates = entries
          .filter(e => e.isIntersecting && e.intersectionRatio >= 0.5)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (candidates.length) {
          const slide = candidates[0].target;
          if (!slide.classList.contains('is-active')) {
            // Marca sin recentrar inmediato; un pequeño snap luego
            activateAndCenter(slide, false);
          }
        }
      }, { root: track, threshold: [0, 0.25, 0.5, 0.75, 1] });

      slides.forEach(slide => io.observe(slide));

      // Snap suave al final del scroll
      let t;
      track.addEventListener('scroll', () => {
        clearTimeout(t);
        t = setTimeout(() => {
          const active = track.querySelector('.carousel-slide.is-active');
          if (active) activateAndCenter(active, true);
        }, 120);
      }, { passive: true });
    }

    enableMobileAutoActive();
    window.addEventListener('resize', enableMobileAutoActive);
  }

  // Espera al DOM si aún no está cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel, { once: true });
  } else {
    initCarousel();
  }
})();
