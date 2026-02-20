// 🔥 FIREBASE (CDN - MÓDULOS)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 🔐 CONFIGURACIÓN DE TU PROYECTO
const firebaseConfig = {
  apiKey: "AIzaSyCUHviln75IA6pMuJWiP_IrlAaSECTsFDM",
  authDomain: "noche-rock-80s.firebaseapp.com",
  projectId: "noche-rock-80s",
  storageBucket: "noche-rock-80s.firebasestorage.app",
  messagingSenderId: "345121447905",
  appId: "1:345121447905:web:9f16160534cb00db423ca0"
};

// 🚀 INICIALIZAR FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 Firebase conectado correctamente");

// --------------------------------------------------
// UTILIDAD: GENERAR ID ÚNICO
// --------------------------------------------------
function generarIdUnico() {
    const fecha = new Date();
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();

    return `LRP-${y}${m}${d}-${random}`;
}

// --------------------------------------------------
// DOM
// --------------------------------------------------
const form = document.getElementById("registroForm");
const modal = document.getElementById("qrModal");
const qrCanvas = document.getElementById("qrCanvas");
const qrNombre = document.getElementById("qrNombre");

// --------------------------------------------------
// SUBMIT
// --------------------------------------------------
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const clubInput = document.querySelector('input[name="club"]:checked');

    if (!nombre || !whatsapp || !clubInput) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const club = clubInput.value;
    const idUnico = generarIdUnico();

    const registro = {
        id_unico: idUnico,
        nombre,
        whatsapp,
        club,
        evento: "Noche de Rock 80s",
        fecha_registro: new Date(),
        usado: false
    };

    console.log("📦 Registro preparado:", registro);

    const qrTexto =
`ID: ${idUnico}
Entrada válida hasta la medianoche del Sábado 21/02
${nombre}
Noir Antre Eventos, Jr Caylloma 660, C. de Lima
10pm a 6am
Ingreso después de medianoche: S/15`;

    qrNombre.textContent = nombre;

    new QRious({
        element: qrCanvas,
        value: qrTexto,
        size: 230
    });

    modal.classList.remove("hidden");
    form.reset();
});

// --------------------------------------------------
// MODAL
// --------------------------------------------------
function cerrarModal() {
    modal.classList.add("hidden");
}

// 👇 CLAVE PARA type="module"
window.cerrarModal = cerrarModal;