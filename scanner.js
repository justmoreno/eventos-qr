// 🔥 FIREBASE (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 🔐 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCUHviln75IA6pMuJWiP_IrlAaSECTsFDM",
  authDomain: "noche-rock-80s.firebaseapp.com",
  projectId: "noche-rock-80s",
  storageBucket: "noche-rock-80s.firebasestorage.app",
  messagingSenderId: "345121447905",
  appId: "1:345121447905:web:9f16160534cb00db423ca0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --------------------------------------------------
const video = document.getElementById("video");
const resultado = document.getElementById("resultado");

let escaneando = true;

// --------------------------------------------------
// CÁMARA
// --------------------------------------------------
navigator.mediaDevices.getUserMedia({
  video: { facingMode: "environment" }
}).then(stream => {
  video.srcObject = stream;
});

// --------------------------------------------------
// SCAN LOOP
// --------------------------------------------------
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

setInterval(() => {
  if (!escaneando) return;
  if (video.readyState !== video.HAVE_ENOUGH_DATA) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, canvas.width, canvas.height);

  if (code) procesarQR(code.data);
}, 800);

// --------------------------------------------------
// PROCESAR QR
// --------------------------------------------------
async function procesarQR(texto) {
  if (!texto.startsWith("NOIR-ANTRE|")) {
    resultado.innerHTML = "<span class='error'>QR inválido</span>";
    return;
  }

  escaneando = false;

  const id = texto.split("|")[1];
  await validarIngreso(id);

  setTimeout(() => {
    resultado.innerHTML = "Esperando QR...";
    escaneando = true;
  }, 3000);
}

// --------------------------------------------------
// VALIDAR INGRESO
// --------------------------------------------------
async function validarIngreso(id) {
  const colecciones = ["club", "no_club"];

  for (const col of colecciones) {
    const ref = doc(db, col, id);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();

      if (data.usado) {
        resultado.innerHTML = "<span class='error'>QR YA USADO</span>";
        return;
      }

      await updateDoc(ref, { usado: true });

      resultado.innerHTML = `
        <span class='ok'>
          INGRESO PERMITIDO<br>
          ${data.nombre}
        </span>
      `;
      return;
    }
  }

  resultado.innerHTML = "<span class='error'>QR NO REGISTRADO</span>";
}