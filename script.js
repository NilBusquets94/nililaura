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


// ===== CÓDIGO FINAL PARA EL CARRUSEL DE IMÁGENES (CENTRADO CORREGIDO) =====
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.overlapping-carousel-container');
    const carousel = document.querySelector('.overlapping-carousel');
    const images = document.querySelectorAll('.overlapping-image');

    if (!carouselContainer || !carousel || images.length === 0) {
        return; // Salir si no se encuentran los elementos
    }

    let currentIndex = 0;

    function updateCarousel() {
        // Asegurarse de que el índice esté dentro de los límites
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex >= images.length) currentIndex = images.length - 1;

        const imageToCenter = images[currentIndex];
        
        // El centro del contenedor (la "ventana")
        const containerCenter = carouselContainer.offsetWidth / 2;
        
        // El centro de la imagen que queremos centrar (relativo al inicio de la fila de imágenes)
        const imageCenter = imageToCenter.offsetLeft + (imageToCenter.offsetWidth / 2);
        
        // Calculamos cuánto hay que mover la fila de imágenes hacia la izquierda
        const targetTranslateX = containerCenter - imageCenter;
        
        // Aplicamos el movimiento a la fila de imágenes
        carousel.style.transform = `translateY(-50%) translateX(${targetTranslateX}px)`;

        // Aplicamos la clase 'active' a la imagen central y se la quitamos a las demás
        images.forEach((img, index) => {
            if (index === currentIndex) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }

    // Añadimos un evento de clic a cada imagen
    images.forEach((image, index) => {
        image.addEventListener('click', function() {
            currentIndex = index; // Actualizamos el índice a la imagen pulsada
            updateCarousel(); // Movemos el carrusel
        });
    });

    // Al cargar la página, centramos la imagen de en medio
    if (images.length > 0) {
        currentIndex = Math.floor(images.length / 2);
        // Usamos un pequeño retraso para asegurar que todas las imágenes han cargado sus dimensiones
        setTimeout(() => {
            updateCarousel();
        }, 100);
    }
    
    // Si el tamaño de la ventana cambia, volvemos a centrar el carrusel
    window.addEventListener('resize', updateCarousel);
});