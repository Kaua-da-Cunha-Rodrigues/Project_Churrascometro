//Coleta dos elementos em HTML

//Primeira parte
const formularioDados = document.getElementById("formularioDados")
const inputNome = document.getElementById("nome")
const inputEmail = document.getElementById("email")
const inputCEP = document.getElementById("cep")

const botaoEnviarDados = document.getElementById("botaoEnviarDados")

//Segunda Parte
const formularioQuantidaDePessoas = document.getElementById("formularioQuantidaDePessoas")
const inputQtdHomens = document.getElementById("qtdHomens")
const inputQtdMulheres = document.getElementById("qtdMulheres")
const inputQtdCriancas = document.getElementById("qtdCriancas")
const inputQtdQueBebem = document.getElementById("qtdQueBebem")

const botaoEnviarQuantidadeDePessoas = document.getElementById("botaoEnviarQuantidadeDePessoas")

//Terceira Parte
const listaPessoas = document.getElementById("listaPessoas")
const informacaoHomens = document.getElementById("informacaoHomens")
const informacaoMulheres = document.getElementById("informacaoMulheres")
const informacaoCriancas = document.getElementById("informacaoCriancas")
const informacaoQueBebem = document.getElementById("informacaoQueBebem")


const tabelaRecomendada = document.getElementById("tabelaRecomendada")
const tabelaItemCarne = document.getElementById("quantidadeCarne")
const tabelaItemPao = document.getElementById("quantidadePao")
const tabelaItemCarvao = document.getElementById("quantidadeCarvao")
const tabelaItemSal = document.getElementById("quantidadeSal")
const tabelaItemGelo = document.getElementById("quantidadeGelo")
const tabelaItemRefrigerante = document.getElementById("quantidadeRefrigerante")
const tabelaItemAgua = document.getElementById("quantidadeAgua")
const tabelaItemCerveja = document.getElementById("quantidadeCerveja")

const areaBotoes = document.getElementById("areaBotoes")
const botaoReiniciar = document.getElementById("novaSimulacao")
const botaoNovasQuantidades = document.getElementById("novaQuantidade")

//Validar se o primeiro passo já foi feito
validaDados()

//Validar se o segundo passo já foi feito
validaQuantidadeDePessoas()

//Jogar os valores calculados na tabela recomendada - Terceira etapa
renderizarTabela()

botaoEnviarDados.addEventListener("click", () => {

    if (!validarEmail(inputEmail.value)) {
        return alert("Email inválido")
    }
    alert("Dados válidos")

    sessionStorage.setItem("informacoesDados", "true")
    sessionStorage.setItem("nome", inputNome.value)
    sessionStorage.setItem("email", inputEmail.value)
    sessionStorage.setItem("cep", inputCEP.value)
})

botaoEnviarQuantidadeDePessoas.addEventListener("click", () => {
    const inputsQuantidades = document.querySelectorAll(".inputDeQuantidade")

    if (!verificarInputs(inputsQuantidades)) {
        return alert("Quantidade de Pessoas inválida");
    }

    sessionStorage.setItem("qtdHomens", parseInt(inputQtdHomens.value))
    sessionStorage.setItem("qtdMulheres", parseInt(inputQtdMulheres.value))
    sessionStorage.setItem("qtdCriancas", parseInt(inputQtdCriancas.value))
    sessionStorage.setItem("qtdQueBebem", parseInt(inputQtdQueBebem.value))

    const totalPessoas = parseInt(inputQtdHomens.value) + parseInt(inputQtdMulheres.value)
    sessionStorage.setItem("qtdDeAdultos", totalPessoas)

    if (sessionStorage.getItem("qtdDeAdultos") < sessionStorage.getItem("qtdQueBebem")) {
        return alert("Há mais pessoas que bebem que adultos!")
    }
    alert("Quantidade aceita");
    sessionStorage.setItem("informacoesQuantidade", "true")

    calcularadoraChurrasco()
})

botaoReiniciar.addEventListener("click", () => {

    removerItemSessionStorage()
    sessionStorage.removeItem("informacoesDados")
    sessionStorage.removeItem("nome")
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("cep")

    listaPessoas.setAttribute("hidden", true)
    tabelaRecomendada.setAttribute("hidden", true)
    areaBotoes.setAttribute("hidden", true)
    formularioDados.removeAttribute("hidden")

})

botaoNovasQuantidades.addEventListener("click", () => {
    removerItemSessionStorage()

    listaPessoas.setAttribute("hidden", true)
    tabelaRecomendada.setAttribute("hidden", true)
    areaBotoes.setAttribute("hidden", true)
    formularioQuantidaDePessoas.removeAttribute("hidden")
})

function removerItemSessionStorage() {
    sessionStorage.removeItem("informacoesQuantidade")
    sessionStorage.removeItem("qtdHomens")
    sessionStorage.removeItem("qtdMulheres")
    sessionStorage.removeItem("qtdCriancas")
    sessionStorage.removeItem("qtdQueBebem")
}

//Validações 

function validaDados() {
    const informacoesDados = sessionStorage.getItem("informacoesDados") //

    if (informacoesDados === "true") {
        formularioDados.setAttribute("hidden", true)
        formularioQuantidaDePessoas.removeAttribute("hidden")
    }//
}

function validaQuantidadeDePessoas() {
    const informacoesQuantidade = sessionStorage.getItem("informacoesQuantidade")

    if (informacoesQuantidade === "true") {
        formularioQuantidaDePessoas.setAttribute("hidden", true)
        tabelaRecomendada.removeAttribute("hidden")
        listaPessoas.removeAttribute("hidden")
        areaBotoes.removeAttribute("hidden")
    }
}

function validarEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    return (false)
}

// -- Fim validações

function verificarInputs(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        const inputValue = inputs[i].value.trim();
        if (inputValue === '' || isNaN(inputValue) || !Number.isInteger(parseFloat(inputValue)) || parseInt(inputValue) < 0) {
            return false;
        }
    }
    return true;
}

function calcularadoraChurrasco() {

    const qtdHomens = parseFloat(sessionStorage.getItem("qtdHomens"))
    const qtdMulheres = parseFloat(sessionStorage.getItem("qtdMulheres"))
    const qtdCriancas = parseFloat(sessionStorage.getItem("qtdCriancas"))
    const qtdQueBebem = parseFloat(sessionStorage.getItem("qtdQueBebem"))
    const qtdAdultos = qtdHomens + qtdMulheres
    const qtdPessoas = qtdHomens + qtdMulheres + qtdCriancas


    const totalCarne = (qtdHomens * 0.4) + (qtdMulheres * 0.32) + (qtdCriancas * 0.2)

    const totalPao = (qtdAdultos * 2) + qtdCriancas

    const totalCarvao = qtdPessoas

    const totalSal = qtdPessoas * 0.04

    const totalGelo = qtdPessoas / 10 * 5

    const totalRefrigerante = Math.ceil(qtdPessoas / 5)

    const totalAgua = Math.ceil(qtdPessoas / 5)

    const totalCerveja = qtdQueBebem * 1.8

    sessionStorage.setItem("totalCarne", totalCarne.toFixed(2))
    sessionStorage.setItem("totalPao", totalPao)
    sessionStorage.setItem("totalCarvao", totalCarvao)
    sessionStorage.setItem("totalSal", totalSal.toFixed(2))
    sessionStorage.setItem("totalGelo", totalGelo.toFixed(2))
    sessionStorage.setItem("totalRefrigerante", totalRefrigerante)
    sessionStorage.setItem("totalAgua", totalAgua)
    sessionStorage.setItem("totalCerveja", totalCerveja.toFixed(2))
    sessionStorage.setItem("calcularDados", "true")
}

function renderizarTabela() {
    const verificarCalculo = sessionStorage.getItem("calcularDados")
    if (verificarCalculo === "true") {
        informacaoHomens.innerText = sessionStorage.getItem("qtdHomens") + " Homens";
        informacaoMulheres.innerText = sessionStorage.getItem("qtdMulheres") + " Mulheres"
        informacaoCriancas.innerText = sessionStorage.getItem("qtdCriancas") + " Crianças"
        informacaoQueBebem.innerText = sessionStorage.getItem("qtdQueBebem") + " Pessoas bebem"

        tabelaItemCarne.innerText = sessionStorage.getItem("totalCarne") + " KG"
        tabelaItemPao.innerText = sessionStorage.getItem("totalPao") + " Pão(ães)"
        tabelaItemCarvao.innerText = sessionStorage.getItem("totalCarvao") + " KG"
        tabelaItemSal.innerText = sessionStorage.getItem("totalSal") + " KG"
        tabelaItemGelo.innerText = sessionStorage.getItem("totalGelo") + " KG"
        tabelaItemRefrigerante.innerText = sessionStorage.getItem("totalRefrigerante") + " Garrafa(s) 2L"
        tabelaItemAgua.innerText = sessionStorage.getItem("totalAgua") + " Garrafa(s) 1L"
        tabelaItemCerveja.innerText = sessionStorage.getItem("totalCerveja") + " Litro(s)"
    }

}