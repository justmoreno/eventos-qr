// 🔥 FIREBASE (CDN - MÓDULOS)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const clubInput = document.querySelector('input[name="club"]:checked');

    if (!nombre || !whatsapp || !clubInput) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const club = clubInput.value; // "si" | "no"
    const idUnico = generarIdUnico();

    const registro = {
        id_unico: idUnico,
        nombre: nombre,
        whatsapp: whatsapp,
        evento: "Noche de Rock 80s",
        fecha_registro: new Date(),
        usado: false
    };

    try {
        const coleccion = club === "si" ? "club" : "no_club";
        await setDoc(doc(db, coleccion, idUnico), registro);
        console.log(`✅ Guardado en colección: ${coleccion}`, registro);
    } catch (error) {
        console.error("❌ Error al guardar en Firestore:", error);
        alert("Error al registrar. Intenta nuevamente.");
        return;
    }

    // --------------------------------------------------
    // QR (SOLO ID TÉCNICO)
    // --------------------------------------------------
    const qrTexto = `NOIR-ANTRE|${idUnico}`;

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

window.cerrarModal = cerrarModal;