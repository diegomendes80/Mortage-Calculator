// Variáveis globais para armazenar valores calculados
let pmt = 0;
let total_repay = 0;

// Selecionando elementos do DOM
const sem_resultado_div = document.querySelector('.sem-resultado');
const com_resultado_div = document.querySelector('.com-resultado');
const monthly_value = document.querySelector('.monthly__value');
const total_value = document.querySelector('.total__value');
const repayment_mortage = document.querySelector('#repayment');
const interest_only = document.querySelector('#intesrest-only');


// Função para calcular o pagamento mensal com amortização
function calcRepayment(mortage_amount, juros, mortage_term) {
    const r = juros / 100 / 12; // Convertendo a taxa de juros para mensal
    pmt = mortage_amount * (r * Math.pow(1 + r, mortage_term)) / (Math.pow(1 + r, mortage_term) - 1);
    total_repay = pmt * mortage_term;
}

// Função para calcular o pagamento mensal sem amortização
function calcInterestOnly(mortage_amount, juros, mortage_term) {
    pmt = mortage_amount * juros / 12;
    total_repay = pmt * mortage_term + mortage_amount;
}

// Função para mostrar os resultados calculados
function mostraValor() {
    sem_resultado_div.style.display = "none";
    com_resultado_div.style.display = "flex";
    monthly_value.textContent = `R$ ${pmt.toFixed(2)}`; // Formatando para 2 casas decimais
    total_value.textContent = `R$ ${total_repay.toFixed(2)}`; // Formatando para 2 casas decimais
}

function limpa(){
    document.querySelector('#amount__value').value = '';
    document.querySelector('#term__value').value = '';
    document.querySelector('#rate__value').value = '';
    document.querySelector('#repayment').checked = false;
    document.querySelector('#intesrest-only').checked = false;
    sem_resultado_div.style.display = "flex";
    com_resultado_div.style.display = "none";
    monthly_value.textContent = '';
    total_value.textContent = '';

    document.querySelector('.erro-amount').style.display = "none";
    document.querySelector('.erro-term').style.display = "none";
    document.querySelector('.erro-rate').style.display = "none";
    document.querySelector('.erro-type').style.display = "none";

}

// Event listener para o botão de calcular
document.querySelector('.form__button').addEventListener('click', function () {
    // Pegando os valores dos inputs do formulário
    const mortage_amount = parseFloat(document.querySelector('#amount__value').value);
    const mortage_term = parseFloat(document.querySelector('#term__value').value) * 12;
    const interest_rate = parseFloat(document.querySelector('#rate__value').value);

    if(!mortage_amount){
        document.querySelector('.erro-amount').style.display = "block";
        
    }

    if(!mortage_term){
        document.querySelector('.erro-term').style.display = "block";
        
    }

    if(!interest_rate){
        document.querySelector('.erro-rate').style.display = "block";
        
    }

    // Verificando qual tipo de hipoteca está selecionada
    if(interest_only.checked && repayment_mortage.checked){
        alert('Selecione apenas um tipo de Mortage Type');
        limpa();
        return;
    }
    else if (repayment_mortage.checked) {
        calcRepayment(mortage_amount, interest_rate, mortage_term);
        limpa();
        mostraValor();
    } else if (interest_only.checked) {
        calcInterestOnly(mortage_amount, interest_rate, mortage_term);
        limpa();
        mostraValor();
    }

    else {
        document.querySelector('.erro-type').style.display = "block";
        
    }

    // Exibindo os resultados
    // limpa();
    // mostraValor();
});

// Event listener para o botão de limpar
document.querySelector('.header__clear-button').addEventListener('click', function () {
    // Limpar os valores dos inputs e esconder os resultados
    limpa();
});
