// Seleção dos elementos do DOM
const campoSenha = document.getElementById('campo-senha');
const tamanhoTexto = document.getElementById('tamanho-texto');
const btnMenos = document.getElementById('btn-menos');
const btnMais = document.getElementById('btn-mais');

const chkMaiusculas = document.getElementById('chk-maiusculas');
const chkMinusculas = document.getElementById('chk-minusculas');
const chkNumeros = document.getElementById('chk-numeros');
const chkSimbolos = document.getElementById('chk-simbolos');

const barraForca = document.getElementById('forca-barra');
const forcaTexto = document.getElementById('forca-texto');

// Grupos de caracteres
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

let tamanhoSenha = 12;

// Funções para alterar o tamanho nos botões + e -
btnMenos.addEventListener('click', () => {
    if (tamanhoSenha > 4) { // Tamanho mínimo de 4 dígitos
        tamanhoSenha--;
        atualizarInterface();
    }
});

btnMais.addEventListener('click', () => {
    if (tamanhoSenha < 30) { // Tamanho máximo de 30 dígitos
        tamanhoSenha++;
        atualizarInterface();
    }
});

// Escuta mudanças nos checkboxes para gerar nova senha instantaneamente
[chkMaiusculas, chkMinusculas, chkNumeros, chkSimbolos].forEach(checkbox => {
    checkbox.addEventListener('change', gerarSenha);
});

// Função principal para gerar a senha aleatória
function gerarSenha() {
    let caracteresPermitidos = '';
    let tiposSelecionados = 0;

    if (chkMaiusculas.checked) { caracteresPermitidos += letrasMaiusculas; tiposSelecionados++; }
    if (chkMinusculas.checked) { caracteresPermitidos += letrasMinusculas; tiposSelecionados++; }
    if (chkNumeros.checked) { caracteresPermitidos += numeros; tiposSelecionados++; }
    if (chkSimbolos.checked) { caracteresPermitidos += simbolos; tiposSelecionados++; }

    // Se nada estiver marcado, limpa o campo e avisa
    if (caracteresPermitidos === '') {
        campoSenha.value = "Selecione uma opção";
        calcularForca(0, 0);
        return;
    }

    let senhaGerada = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        senhaGerada += caracteresPermitidos[indiceAleatorio];
    }

    campoSenha.value = senhaGerada;
    calcularForca(tamanhoSenha, tiposSelecionados);
}

// Calcula o nível de segurança e altera as cores
function calcularForca(tamanho, tipos) {
    let pontuacao = tamanho * tipos;

    if (pontuacao === 0) {
        barraForca.style.width = '0%';
        forcaTexto.innerText = '';
    } else if (pontuacao < 20) {
        barraForca.style.width = '30%';
        barraForca.style.backgroundColor = '#ff4d4d'; // Vermelho (Fraca)
        forcaTexto.innerText = 'Fraca';
        forcaTexto.style.color = '#ff4d4d';
    } else if (pontuacao < 40) {
        barraForca.style.width = '60%';
        barraForca.style.backgroundColor = '#ffa500'; // Laranja (Média)
        forcaTexto.innerText = 'Média';
        forcaTexto.style.color = '#ffa500';
    } else {
        barraForca.style.width = '100%';
        barraForca.style.backgroundColor = '#00cc66'; // Verde (Forte)
        forcaTexto.innerText = 'Forte';
        forcaTexto.style.color = '#00cc66';
    }
}

// Atualiza o texto do contador e dispara a nova senha
function atualizarInterface() {
    tamanhoTexto.innerText = tamanhoSenha;
    gerarSenha();
}

// Executa uma vez ao carregar a página
gerarSenha();
