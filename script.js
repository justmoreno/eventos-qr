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
