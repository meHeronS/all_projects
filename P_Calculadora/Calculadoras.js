// Função para realizar uma operação matemática básica
function calcular(operacao, mensagem, operador) {
    alert("Olá, esta é a calculadora de " + mensagem + "!");

    // Pergunta ao usuário se deseja confirmar algo
    var confirmacao = confirm("Insira dois valores para " + operacao + "-los ou cancele a operação");
    if (confirmacao) {
        alert("Você confirmou!");
        // Solicita dois números ao usuário
        var numero1 = prompt("Digite o primeiro número:");
        var numero2 = prompt("Digite o segundo número:");
        
        // Verifica se os números inseridos são válidos
        if (!isNaN(numero1) && !isNaN(numero2)) {
            // Realiza a operação de acordo com o operador passado
            var resultado;
            switch (operador) {
                case '+':
                    resultado = parseFloat(numero1) + parseFloat(numero2);
                    break;
                case '-':
                    resultado = parseFloat(numero1) - parseFloat(numero2);
                    break;
                case '*':
                    resultado = parseFloat(numero1) * parseFloat(numero2);
                    break;
                case '/':
                    if (parseFloat(numero2) !== 0) {
                        resultado = parseFloat(numero1) / parseFloat(numero2);
                    } else {
                        alert("Não é possível dividir por zero!");
                        return;
                    }
                    break;
                default:
                    alert("Operador inválido!");
                    return;
            }
            // Exibe o resultado da operação
            alert("O resultado da " + mensagem + " é = " + resultado.toFixed(2));
        } else {
            alert("Por favor, insira números válidos!");
        }
    } else {
        alert("Você cancelou!");
        alert("Operação não realizada!");
    }
}

// Funções para realizar operações específicas
function calcSoma() {
    calcular("soma", "somar", '+');
}

function calcSubtracao() {
    calcular("subtração", "subtrair", '-');
}

function calcMultiplicacao() {
    calcular("multiplicação", "multiplicar", '*');
}

function calcDivisao() {
    calcular("divisão", "dividir", '/');
}

function calcMedia() {
    alert("Olá, esta é a calculadora de médias!");

    // Pergunta ao usuário se deseja confirmar algo
    var confirmacao = confirm("Insira três valores para identificar a média entre eles ou cancele a operação");
    if (confirmacao) {
        alert("Você confirmou!");
        // Solicita três números ao usuário
        var numero1 = prompt("Digite o primeiro número:");
        var numero2 = prompt("Digite o segundo número:");
        var numero3 = prompt("Digite o terceiro número:");

        // Verifica se os números inseridos são válidos
        if (!isNaN(numero1) && !isNaN(numero2) && !isNaN(numero3)) {
            // Calcula a média dos três números
            var media = (parseFloat(numero1) + parseFloat(numero2) + parseFloat(numero3)) / 3;
            // Exibe o resultado da média
            alert("A média dos números é: " + media.toFixed(2));
        } else {
            alert("Por favor, insira números válidos!");
        }
    } else {
        alert("Você cancelou!");
        alert("Operação não Realizada!");
    }
}
