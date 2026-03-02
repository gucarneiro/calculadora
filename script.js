const visor = document.getElementById('visor');

function inserir(valor){
    if (visor.value.length > 10) {
        return;
    }
    //adiciona o valor do botao no visor para visualização
    let ultimoCaractere = visor.value.slice(-1);
    let operadores = ['+', '-', '*', '/'];

    if (operadores.includes(valor) && operadores.includes(ultimoCaractere)){
        return; //se o novo valor for operador e o ultimo támbem, então não interrompe
    }    
    visor.value += valor;
    
}

function limpar(){
    visor.value = "";
    //limpa o conteudo do visor
}

function igual(valor){
    let expressao = visor.value;
    //pega oq esta no visor e adiciona a variavel
    try{
        let resultado = eval(expressao);
        let resultadoN = Number(resultado);
        //pega a variavel expressao e usa eval para resolver a equação
        let resultadotxt = resultadoN.toString();
        //transformma em string para fazer o calculo do if
        if(resultadotxt.includes('.') && resultadotxt.split('.')[1].length > 9){//se o resultado tiver . e depois do ponto for >2
            resultadoN = parseFloat(resultadoN.toFixed(9)); //pega o resultado e limita a 4 casas decimais
        }
        if(resultadoN.toString().length>11){
            visor.value = resultado.toPrecision(10);
        } else{
            visor.value = resultadoN;
        }
    //mostra o resultado no visor
    }catch (e) {
        visor.value = "Erro"; // Caso a expressão seja inválida (ex: 1.2.3)
        setTimeout(limpar, 1500);
    }
}

function deleta(){
    let apagar = document.getElementById('visor').value; //determina onde a variavel vai operar (no valores do 'visor')
    document.getElementById('visor').value = apagar.slice(0, -1); //apaga o ultimo valor do visor
}

document.addEventListener('keydown', function(event){
    const tecla = event.key; //captura qual tecla foi pressionada

    if (!isNaN(tecla) || tecla === '.'){
        inserir(tecla); //verifica se a tecla pressionada é algum número, se sim ele adiona ao visor
    }

    if (tecla === '+' || tecla === '-' || tecla === '/' || tecla === '*'){
        inserir(tecla);//verifica se a tecla pressionada é alguma operação, se sim ele adiona ao visor
    }

    if (tecla === 'Enter'){
        event.preventDefault();
        igual();
    }

    if (tecla === 'Delete'){
        limpar();
    }

    if (tecla === 'Backspace'){
        deleta();
    }

    if (tecla === '='){
        event.preventDefault();
        igual();
    }
});

