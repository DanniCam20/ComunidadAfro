// ==============================
// 1️⃣ Reproducir un solo audio a la vez
// ==============================
const audios = document.querySelectorAll("audio");

audios.forEach(audio => {
    audio.addEventListener("play", () => {
        audios.forEach(a => {
            if (a !== audio) a.pause();
        });
    });
});

// Pausar los demás audios cuando uno empieza a reproducirse
document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('play', () => {
        document.querySelectorAll('audio').forEach(otherAudio => {
            if (otherAudio !== audio) {
                otherAudio.pause();
            }
        });
    });
});


// ==============================
// 2️⃣ Botón flotante para subir al inicio
// ==============================
const btnTop = document.createElement("button");
btnTop.id = "btnTop";
btnTop.textContent = "⬆ Subir";
btnTop.style.cssText = `
    display:none;
    position:fixed;
    bottom:20px;
    right:20px;
    padding:10px 15px;
    border:none;
    background:black;
    color:white;
    border-radius:5px;
    cursor:pointer;
    z-index:1000;
`;
document.body.appendChild(btnTop);

window.addEventListener("scroll", () => {
    btnTop.style.display = window.scrollY > 200 ? "block" : "none";
});

btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==============================
// 3️⃣ Búsqueda de géneros
// ==============================

// Crear barra de búsqueda automáticamente
const search = document.createElement("input");
search.type = "text";
search.placeholder = "Buscar género musical...";
search.style.cssText = `
    margin:20px auto;
    display:block;
    padding:10px;
    width:50%;
    border:2px solid black;
    border-radius:5px;
`;
document.querySelector("header").appendChild(search);

search.addEventListener("input", () => {
    const term = search.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
        const title = card.querySelector("h2").textContent.toLowerCase();
        card.style.display = title.includes(term) ? "block" : "none";
    });
});

// ==============================
// 4️⃣ Animación al mostrar tarjetas (Fade In + Slide Up)
// ==============================
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.7s ease";
    observer.observe(card);
});

