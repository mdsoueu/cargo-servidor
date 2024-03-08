const espresso = require('express');
const meuServidor = espresso();
meuServidor.use(espresso.json());

const lista = [
    {
        id: 1,
        nome: 'Aa',
        idade: 21,
        funcao: 'Diretor',
        descricao: 'profissional responsável por planejar, coordenar e supervisionar a execução de projetos dentro de uma organização.'
    }
];

/* GET - consulta */
meuServidor.get('/principal', (requisicao, resposta) => {
    let respostas = '';
    for (let index = 0; index < lista.length; index++) {
        const trabalho = lista[index];
        respostas += '<p>';
        respostas += 'Código: ';
        respostas += trabalho.id;
        respostas += '</br>Nome: ';
        respostas += trabalho.nome;
        respostas += '</br>Idade: ';
        respostas += trabalho.idade;
        respostas += '</br>Cargo: ';
        respostas += trabalho.funcao;
        respostas += '</br>Descrição: ';
        respostas += trabalho.descricao;
        respostas += '</p>';
    }
    resposta.send(respostas);
});
meuServidor.get('/principal/usuario/:id', (requisicao, resposta) => {
    /*Criar uma rota para consultar um usuário pelo código de usuário.*/
    const idUsuario = requisicao.params.id;
    const identifacado = lista.find((atual) => {
        return atual.id == idUsuario;
    });

    const nome = requisicao.body.nome;
    const idade = requisicao.body.idade;

    identifacado.nome = nome;
    identifacado.idade = idade;

    resposta.send();
});

/* POST - adicionar */
meuServidor.post('/principal', (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const idade = requisicao.body.idade;
    const funcao = requisicao.body.funcao;
    const descricao = requisicao.body.descricao;

    let codigo = -99999999999999999;
    for (let index = 0; index < lista.length; index++) {
        const itemAtual = lista[index];
        if (itemAtual.id > codigo) {
            codigo = itemAtual.id;
        }
    }
    if (codigo < 0) {
        codigo = 0;
    }

    const novoItem = {
        id: codigo + 1,
        nome: nome,
        idade: idade,
        funcao: funcao,
        descricao: descricao
    };
    lista.push(novoItem);
    resposta.send();
});
meuServidor.post('/principal/cargo', (requisicao, resposta) => {
    const funcao = requisicao.body.funcao;
    const descricao = requisicao.body.descricao;

    let codigo = -99999999999999999;
    for (let index = 0; index < lista.length; index++) {
        const itemAtual = lista[index];
        if (itemAtual.id > codigo) {
            codigo = itemAtual.id;
        }
    }
    if (codigo < 0) { codigo = 0; }

    const novoItem = {
        funcao: funcao,
        descricao: descricao
    };
    lista.push(novoItem);
    resposta.send();
});

/* PUT - atualizar */
meuServidor.put('/principal/:id', (requisicao, resposta) => {
    const codigoItem = requisicao.params.id;
    const itemEncontrado = lista.find((itemAtual) => {
        return itemAtual.id == codigoItem;
    });
    const nome = requisicao.body.nome;
    const idade = requisicao.body.idade;
    const funcao = requisicao.body.funcao;
    const descricao = requisicao.body.descricao;

    itemEncontrado.nome = nome;
    itemEncontrado.idade = idade;
    itemEncontrado.funcao = funcao;
    itemEncontrado.descricao = descricao;

    resposta.send();
});
meuServidor.put('/principal/usuario/:id', (requisicao, resposta) => {
    /*Criar uma rota para a atualização de um usuário pelo código do usuário. */
    const codigoUsuario = requisicao.params.id;
    const UsuarioEncontrado = lista.find((usuarioAtual) => {
        return usuarioAtual.id == codigoUsuario;
    });
    const nome = requisicao.body.nome;
    const idade = requisicao.body.idade;

    UsuarioEncontrado.nome = nome;
    UsuarioEncontrado.idade = idade;

    resposta.send();
});
meuServidor.put('/principal/cargo/:id', (requisicao, resposta) => {
    /*Criar uma rota para atualização de um cargo. */
    const codigoCargo = requisicao.params.id;
    const cargoEncontrado = lista.find((cargoAtual) => {
        return cargoAtual.id == codigoCargo;
    });
    const funcao = requisicao.body.funcao;
    const descricao = requisicao.body.descricao;

    cargoEncontrado.funcao = funcao;
    cargoEncontrado.descricao = descricao;

    resposta.send();
});

/* DELETE - excluir */
meuServidor.delete('/principal/:id', (requisicao, resposta) => {
    /*Criar uma rota para a remoção de um usuário pelo código do usuário. */
    const codigoUsuario = requisicao.params.id;
    const usuarioEncontrado = lista.findIndex((usuarioAtual) => {
        return usuarioAtual.id == codigoUsuario;
    });

    if (usuarioEncontrado !== -1) {
        lista.splice(usuarioEncontrado, 1);

        resposta.send('Usuário excluído com sucesso.');
    } else {
        resposta.status(404).send('Usuário não encontrado.');
    }
});

meuServidor.listen(4300, () => {
    console.log('Meu primeiro servidor na porta 4300.');
});