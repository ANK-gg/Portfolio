document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#header');

    header.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.4) {
            createSparkAtCursor(e, header);
        }
    });

    function createSparkAtCursor(e, container) {
        const spark = document.createElement('div');
        spark.className = 'spark';

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        spark.style.setProperty('--random-x', (Math.random() * 4 - 2));
        spark.style.setProperty('--random-y', (Math.random() * -2));

        spark.style.background = `hsl(${Math.random() * 60 + 180}, 100%, 80%)`;
        spark.style.width = `${Math.random() * 6 + 4}px`;
        spark.style.height = spark.style.width;
        spark.style.boxShadow = '0 0 10px 1px rgba(0, 255, 255, 0.7)';

        container.appendChild(spark);
        setTimeout(() => spark.remove(), 1000);
    }
});



/* ESTRELLAS EXPOCIÓN */ 

document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('#header');

    // Explosión al hacer clic
    hero.addEventListener('click', (e) => {
        createStarExplosion(e);
    });

    function createStarExplosion(e) {
        const particleCount = 30;
        const heroRect = hero.getBoundingClientRect();
        const centerX = e.clientX - heroRect.left;
        const centerY = e.clientY - heroRect.top;
    
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'star-particle';
            
            // Posición inicial (centro del clic)
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            
            // Propiedades dinámicas
            const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio en radianes
            const speed = Math.random() * 100 + 50; // Rango de velocidad (50-150px)
            const size = Math.random() * 8 + 4;
            const color = `hsl(${Math.random() * 60 + 30}, 100%, 70%)`;
    
            particle.style.setProperty('--size', `${size}px`);
            particle.style.setProperty('--color', color);
            particle.style.setProperty('--end-x', `${Math.cos(angle) * speed}px`);
            particle.style.setProperty('--end-y', `${Math.sin(angle) * speed}px`);
    
            hero.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }
});

document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("nav").classList.toggle("show");
});

/*Botones data-link del html para que el proyecto pueda abrirse*/
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    
    menuToggle.addEventListener('click', () => {
        // Alternar la clase 'active' en el nav
        nav.classList.toggle('active');
        
        // Cambiar el ícono y el texto accesible
        const isOpen = nav.classList.contains('active');
        menuToggle.innerHTML = isOpen ? '✕' : '☰';
        menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar Menú' : 'Abrir Menú');
    });
});

// Manejar clics en botones con data-link
document.querySelectorAll('.boton-proyecto').forEach(button => {
    button.addEventListener('click', (e) => {
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link; // Redirige al enlace
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#nav a');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Scroll suave con offset para el header fijo
                const yOffset = -80; // Ajusta según altura de tu header
                const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });

                // Cerrar menú móvil si está abierto
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            } else {
                console.error('Sección no encontrada:', targetId);
            }
        });
    });
});
