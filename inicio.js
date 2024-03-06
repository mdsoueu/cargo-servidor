const espresso = require('express');
const meuServidor = espresso();
meuServidor.use(espresso.json());

const cargo = [
    {
        id: 1,
        nome: 'Aa',
        funcao: 'Gerente de Projetos',
        descricao: 'profissional responsável por planejar, coordenar e supervisionar a execução de projetos dentro de uma organização.'
    }
];

/* GET - consulta */
meuServidor.get('/cargo', (requisicao, resposta) => {
    let respostas = '';
    for (let index = 0; index < cargo.length; index++) {
        const usuario = cargo[index];
        respostas += '<p>';
        respostas += 'Código: ';
        respostas += usuario.id;
        respostas += '</br>Nome: ';
        respostas += usuario.nome;
        respostas += '</br>Cargo: ';
        respostas += usuario.funcao;
        respostas += '</br>Descrição: ';
        respostas += usuario.descricao;
        respostas += '</p>';
    }
    resposta.send(respostas);
});
meuServidor.get('/cargo/usuario/:id', (requisicao, resposta) => { 
    /*Criar uma rota para consultar um usuário pelo código de usuário. */
    const idCargo = requisicao.params.id;
    const identifacado = cargo.find((atual) => {
        return atual.id == idCargo;
    });

    const nome = requisicao.body.nome;
    const funcao = requisicao.body.funcao;
    const descricao = requisicao.body.descricao;
    
    identifacado.nome = nome;
    identifacado.funcao = funcao;
    identifacado.descricao = descricao;

    resposta.send();
});

/* POST - adicionar */
meuServidor.post('/cargo', (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const funcao = requisicao.body.funcao;
    const descricao = requisicao.body.descricao;

    let codigo = -99999999999999999;
    for (let index = 0; index < cargo.length; index++) {
        const cargoAtual = cargo[index];
        if (cargoAtual.id > codigo) {
            codigo = cargoAtual.id;
        }
    }
    if (codigo < 0) {
        codigo = 0;
    }

    const novoCargo = {
        id: codigo + 1,
        nome: nome,
        funcao: funcao,
        descricao: descricao
    };
    cargo.push(novoCargo);
    resposta.send();
});

/* PUT - atualizar */
meuServidor.put('/cargo/:id', (requisicao, resposta) => {
    /*Criar uma rota para a atualização de um usuário pelo código do usuário. */
    const codigoCargo = requisicao.params.id;
    const cargoEncontrado = cargo.find((cargoAtual) => {
        return cargoAtual.id == codigoCargo;
    });
    const nome = requisicao.body.nome;
    const funcao = requisicao.body.funcao;
    const descricao = requisicao.body.descricao;

    cargoEncontrado.nome = nome;
    cargoEncontrado.funcao = funcao;
    cargoEncontrado.descricao = descricao;

    resposta.send();
});
meuServidor.put('/cargo/funcao/:id', (requisicao, resposta) => {
    /*Criar uma rota para atualização de um cargo. */
    const codigoCargo = requisicao.params.id;
    const cargoEncontrado = cargo.find((cargoAtual) => {
        return cargoAtual.id == codigoCargo;
    });
    const funcao = requisicao.body.funcao;

    cargoEncontrado.funcao = funcao;
    
    resposta.send();
});

/* DELETE - excluir */
meuServidor.delete('/cargo/:id', (requisicao, resposta) => {
    /*Criar uma rota para a remoção de um usuário pelo código do usuário. */
    const codigoCargo = requisicao.params.id;
    const cargoEncontrado = cargo.findIndex((cargoAtual) => {
        return cargoAtual.id == codigoCargo;
    });

    if (cargoEncontrado !== -1) {
        cargo.splice(cargoEncontrado, 1);

        resposta.send('Cargo excluído com sucesso.');
    }  else {
        // Se o cargo não for encontrado, enviar uma resposta de erro
        resposta.status(404).send('Cargo não encontrado.');
    }
});


meuServidor.listen(4300, () => {
    console.log('Meu primeiro servidor na porta 4300.');
});