const palabras = [
    "Respeto","Respeto",
    "Honestidad","Honestidad",
    "Justicia","Justicia",
    "Responsabilidad","Responsabilidad",
    "Solidaridad","Solidaridad",
    "Integridad","Integridad",
    "Tolerancia","Tolerancia",
    "Empatía","Empatía",
    "Igualdad","Igualdad",
    "Compromiso","Compromiso",
    "Lealtad","Lealtad",
    "Transparencia","Transparencia",
    "Dignidad","Dignidad",
    "Equidad","Equidad",
    "Autonomía","Autonomía",
    "Prudencia","Prudencia",
    "Honestidad Intelectual","Honestidad Intelectual",
    "Bien Común","Bien Común",
    "Confianza","Confianza",
    "Legalidad","Legalidad"
];

const explicaciones = {
    "Respeto": "Valorar y aceptar a las personas.",
    "Honestidad": "Actuar con verdad.",
    "Justicia": "Dar a cada quien lo justo.",
    "Responsabilidad": "Cumplir deberes.",
    "Solidaridad": "Ayudar a los demás.",
    "Integridad": "Actuar con valores.",
    "Tolerancia": "Respetar diferencias.",
    "Empatía": "Comprender a otros.",
    "Igualdad": "Mismos derechos.",
    "Compromiso": "Cumplir promesas.",
    "Lealtad": "Ser fiel.",
    "Transparencia": "Actuar con claridad.",
    "Dignidad": "Valor humano.",
    "Equidad": "Justicia equilibrada.",
    "Autonomía": "Decidir responsablemente.",
    "Prudencia": "Pensar antes de actuar.",
    "Honestidad Intelectual": "Reconocer errores.",
    "Bien Común": "Beneficio colectivo.",
    "Confianza": "Creer en otros.",
    "Legalidad": "Cumplir la ley."
};

let primeraCarta = null;
let segundaCarta = null;
let bloquear = false;

const tablero = document.getElementById("gameBoard");
const mensaje = document.getElementById("mensaje");

/* TEMPORIZADOR */
let tiempo = 0;
setInterval(() => {
    tiempo++;
    document.getElementById("timer").textContent = tiempo;
}, 1000);

/* MEZCLAR */
palabras.sort(() => 0.5 - Math.random());

/* CREAR CARTAS */
palabras.forEach(palabra => {
    const carta = document.createElement("div");
    carta.classList.add("card");
    carta.dataset.valor = palabra;

    const inner = document.createElement("div");
    inner.classList.add("card-inner");
    inner.innerText = "❓";

    carta.appendChild(inner);
    carta.addEventListener("click", () => voltearCarta(carta, inner));
    tablero.appendChild(carta);
});

function voltearCarta(carta, inner) {
    if (bloquear || carta === primeraCarta || carta.classList.contains("correct")) return;

    carta.classList.add("flipped");
    inner.innerText = carta.dataset.valor;

    if (!primeraCarta) {
        primeraCarta = carta;
        return;
    }

    segundaCarta = carta;
    comprobarPar();
}

function comprobarPar() {
    const valor = primeraCarta.dataset.valor;

    if (valor === segundaCarta.dataset.valor) {
        primeraCarta.classList.add("correct");
        segundaCarta.classList.add("correct");
        mensaje.textContent = `✔ ${valor}: ${explicaciones[valor]}`;
        reiniciarTurno();
    } else {
        bloquear = true;
        primeraCarta.classList.add("wrong");
        segundaCarta.classList.add("wrong");

        setTimeout(() => {
            ocultarCarta(primeraCarta);
            ocultarCarta(segundaCarta);
            reiniciarTurno();
        }, 1000);
    }
}

function ocultarCarta(carta) {
    carta.classList.remove("flipped", "wrong");
    carta.querySelector(".card-inner").innerText = "❓";
}

function reiniciarTurno() {
    primeraCarta = null;
    segundaCarta = null;
    bloquear = false;
}
