const msgCopiar = document.querySelector(".resultado__copiado");
const btnCopiar = document.getElementById("btn-copiar");
const btnEncriptar = document.getElementById("btn-encriptar");
const btnDesencriptar = document.getElementById("btn-desencriptar");
const resultadoNoEncontrado = document.querySelector(".resultado__noencontrado");
const resultadoEncontrado = document.querySelector(".resultado__encontrado");
const resultadoEncriptado = document.getElementById("resultado-encriptado");
const textoElement = document.getElementById("text");
const alert = document.querySelector(".alert");
const alertBox = document.querySelector(".alert__box")
const alertClose = document.querySelector(".alert__close");
const alertText = document.getElementById("alert-text");

btnEncriptar.addEventListener("click", Encriptar);
btnDesencriptar.addEventListener("click", Desencriptar);
btnCopiar.addEventListener("click", Copiar);
alertClose.addEventListener("click", ocultarMensaje);

function encriptarTexto(texto) {
    const letraEncriptar = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    return texto.split('').map(char => letraEncriptar[char] || char).join('');
}

function desencriptarTexto(textoEncriptado) {
    const letraDesencriptar = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    return textoEncriptado.split(/(enter|imes|ai|ober|ufat)/g)
        .map(part => letraDesencriptar[part] || part)
        .join('');
}


function Encriptar() {
    let texto = textoElement.value;
    if (texto === "") {
        mostrarMensaje("No hay texto para encriptar");
        resultadoNoEncontrado.style.display = "flex";
        resultadoEncontrado.style.display = "none";
    } else {
        resultadoNoEncontrado.style.display = "none";
        resultadoEncontrado.style.display = "flex";

        let textoEncriptado = encriptarTexto(texto);
        resultadoEncriptado.textContent = textoEncriptado;
    }
}

function Desencriptar() {
    let textoEncriptado = textoElement.value;

    if (textoEncriptado === "") {
        mostrarMensaje("No hay texto encriptado para desencriptar");
        resultadoNoEncontrado.style.display = "flex";
        resultadoEncontrado.style.display = "none";
    } else {
        let textoEncriptado = textoElement.value;
        resultadoNoEncontrado.style.display = "none";
        resultadoEncontrado.style.display = "flex";

        let textoDesencriptado = desencriptarTexto(textoEncriptado);
        resultadoEncriptado.textContent = textoDesencriptado;

    }
}



function Copiar() {
    msgCopiar.classList.add("active");

    const campoTemporal = document.createElement("textarea");
    campoTemporal.value = resultadoEncriptado.textContent;

    document.body.appendChild(campoTemporal);
    campoTemporal.select();

    try {
        document.execCommand("copy");
    } catch (err) {
        console.error("No se pudo copiar el texto");
    } finally {
        document.body.removeChild(campoTemporal);
        setTimeout(() => {
            msgCopiar.classList.remove("active");
        }, 5000);
    }
}

function mostrarMensaje(mensaje) {
    alert.style.display = "flex";
    setTimeout(() => {
        alertBox.classList.add("active");
        alertText.textContent = mensaje;
    }, 100);
}

function ocultarMensaje() {
    alertBox.classList.remove("active");
    setTimeout(() => {
        alert.style.display = "none";
    }, 500);
}
