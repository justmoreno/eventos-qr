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
// TU CÓDIGO EXISTENTE (SIN CAMBIOS)
// --------------------------------------------------

const form = document.getElementById("registroForm");
const modal = document.getElementById("qrModal");
const qrCanvas = document.getElementById("qrCanvas");
const qrNombre = document.getElementById("qrNombre");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const club = document.querySelector('input[name="club"]:checked');

    if (!nombre || !whatsapp || !club) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const qrTexto =
`Entrada válida hasta la medianoche del Sábado 21/02
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

function cerrarModal() {
    modal.classList.add("hidden");
}