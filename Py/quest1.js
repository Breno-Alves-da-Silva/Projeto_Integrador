// Solicitar ao usuário um número para calcular o fatorial
const numero = parseInt(prompt("Digite um número para calcular o fatorial:"));

// Verificar se o número fornecido é válido (não negativo)
if (numero < 0) {
    console.log("Erro: O fatorial de números negativos não está definido.");
} else {
    // Inicializar a variável para armazenar o resultado do fatorial
    let fatorial = 1;

    // Calcular o fatorial usando um loop for
    for (let i = 1; i <= numero; i++) {
        fatorial *= i;
    }

    // Exibir o resultado
    console.log(`O fatorial de ${numero} é: ${fatorial}`);
}
