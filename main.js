document.addEventListener("DOMContentLoaded", init);

const msgCopiar = document.querySelector(".resultado__copiado");
const btnCopiar = document.getElementById("btn-copiar");
const btnEncriptar = document.getElementById("btn-encriptar");
const btnDesencriptar = document.getElementById("btn-desencriptar");
const resultadoNoEncontrado = document.querySelector(".resultado__noencontrado");
const resultadoEncontrado = document.querySelector(".resultado__encontrado");
const resultadoEncriptado = document.getElementById("resultado-encriptado");
const textoElement = document.getElementById("text");
const alert = document.querySelector(".alert")
const alertClose = document.querySelector(".alert__close");
const alertText = document.getElementById("alert-text");

btnEncriptar.addEventListener("click", Encriptar);
btnDesencriptar.addEventListener("click", Desencriptar);
btnCopiar.addEventListener("click", Copiar);
alertClose.addEventListener("click", ocultarMensaje);


function init() {
    // resultadoEncriptado.textContent = "Se ha encontrado texto para encriptar";
}

function Encriptar() {
    let texto = textoElement.value;
    if (texto === "") {
        mostrarMensaje("No hay texto para encriptar");
    } else {
        resultadoNoEncontrado.style.display = "none";
        resultadoEncontrado.style.display = "flex";
        let clave = "miClaveSecreta123";
        let textoEncriptado = CryptoJS.AES.encrypt(texto, clave).toString();
        resultadoEncriptado.textContent = textoEncriptado;
    }
}

function Desencriptar() {
    let textoEncriptado = textoElement.value;

    if (textoEncriptado === "") {
        mostrarMensaje("No hay texto encriptado para desencriptar");
    } else {
        let clave = "miClaveSecreta123";

        try {
            let textoDesencriptado = CryptoJS.AES.decrypt(textoEncriptado, clave).toString(CryptoJS.enc.Utf8);

            if (textoDesencriptado !== "") {
                resultadoNoEncontrado.style.display = "none";
                resultadoEncontrado.style.display = "flex";
                resultadoEncriptado.textContent = textoDesencriptado;
                mostrarMensaje("Texto desencriptado: " + textoDesencriptado);
            } else {
                mostrarMensaje("El texto no parece estar encriptado");
            }
        } catch (error) {
            mostrarMensaje("Error al desencriptar el texto. Verifica la clave o si el texto está encriptado correctamente.");
        }
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
        // mostrarMensaje("Texto copiado al portapapeles");
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
    alert.classList.add("active");
    alertText.textContent = mensaje;
}

function ocultarMensaje() {
    alert.classList.remove("active");
}
