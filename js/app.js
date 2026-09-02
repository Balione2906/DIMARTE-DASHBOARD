import { db } from "./firebase-config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const guinchosCollection = collection(db, "guinchos");

// Função para salvar novo guincho em tempo real
window.salvarGuincho = async function(dadosGuincho) {
    try {
        await addDoc(guinchosCollection, dadosGuincho);
        console.log("Guincho salvo com sucesso!");
        alert("Salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar guincho: ", error);
        alert("Erro ao salvar no banco de dados.");
    }
};

// Carrega os dados ao abrir o painel
document.addEventListener("DOMContentLoaded", () => {
    console.log("Painel conectado ao Firebase com sucesso!");
});