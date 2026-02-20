import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 🔐 Firebase
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

// DOM
const totalEl = document.getElementById("total");
const clubEl = document.getElementById("club");
const noClubEl = document.getElementById("noClub");
const pendientesEl = document.getElementById("pendientes");

let clubIngresados = 0;
let noClubIngresados = 0;
let pendientes = 0;

// ----------------------------------
// CLUB
// ----------------------------------
onSnapshot(collection(db, "club"), snap => {
  let usados = 0;
  let noUsados = 0;

  snap.forEach(doc => {
    doc.data().usado ? usados++ : noUsados++;
  });

  clubIngresados = usados;
  pendientes += noUsados;

  actualizar();
});

// ----------------------------------
// NO CLUB
// ----------------------------------
onSnapshot(collection(db, "no_club"), snap => {
  let usados = 0;
  let noUsados = 0;

  snap.forEach(doc => {
    doc.data().usado ? usados++ : noUsados++;
  });

  noClubIngresados = usados;
  pendientes += noUsados;

  actualizar();
});

// ----------------------------------
function actualizar() {
  const total = clubIngresados + noClubIngresados;

  totalEl.textContent = total;
  clubEl.textContent = clubIngresados;
  noClubEl.textContent = noClubIngresados;
  pendientesEl.textContent = pendientes;
}