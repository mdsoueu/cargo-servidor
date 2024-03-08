const expresss = require('express');
const servidor = expresss();
servidor.use(expresss.json());

const user = [
    {
        id: 1,
        nome: 'Aa',
        idade: 21,
    }
];
const cargo = [
    {
        id: 1,
        funcao: 'Diretor',
        descricao: 'profissional responsável por planejar, coordenar e supervisionar a execução de projetos dentro de uma organização.'
    }
];

/* GET - consulta */
servidor.get('/principalUsuario', (requisicao, resposta) => {
    let listaUsuario = '';
    for (let index = 0; index < user.length; index++) {
        const pessoa = user[index];
        listaUsuario += '<p>';
        listaUsuario += 'Código: ';
        listaUsuario += pessoa.id;
        listaUsuario += '</br>Nome: ';
        listaUsuario += pessoa.nome;
        listaUsuario += '</br>Idade: ';
        listaUsuario += pessoa.idade;
        listaUsuario += '</p>';
    }

    resposta.send(listaUsuario);
});
servidor.get('/principalCargo', (requisicao, resposta) => {
    let listaCargo = '';
    for (let index = 0; index < cargo.length; index++) {
        const trabalho = cargo[index];
        listaCargo += '<p>';
        listaCargo += 'Código: ';
        listaCargo += trabalho.id;
        listaCargo += '</br>Cargo: ';
        listaCargo += trabalho.funcao;
        listaCargo += '</br>Descrição: ';
        listaCargo += trabalho.descricao;
        listaCargo += '</p>';
    }

    resposta.send(listaCargo);
});
servidor.get('/principalUsuario/:id', (requisicao, resposta) => {
    /*Criar uma rota para consultar um usuário pelo código de usuário.*/
    const idUsuario =  parseInt(requisicao.params.id);
    const usuario = user.find(atual => atual.id === idUsuario);

    if (usuario) {
        resposta.json(usuario); // Retorna o usuário encontrado em formato JSON] 
    } else {
        resposta.status(404).json({ message: 'Usuário não encontrado' });
    }
});
servidor.get('/principalCargo/:id', (requisicao, resposta) => {
    /*Criar uma rota para consultar um cargo pelo código de cargo.*/
    const idCargo =  parseInt(requisicao.params.id);
    const trabalho = cargo.find(atual => atual.id === idCargo);

    if (trabalho) {
        resposta.json(trabalho); // Retorna o usuário encontrado em formato JSON] 
    } else {
        resposta.status(404).json({ message: 'Cargo não encontrado' });
    }
});
// FALTA FAZER --> Criar uma rota para consulta de todos os cargos.

/* POST - adicionar */
servidor.post('/principalCargo', (requisicao, resposta) => {
    const funcao = requisicao.body.funcao;
    const descricao = requisicao.body.descricao;

    let codigo = -99999999999999999;
    for (let index = 0; index < cargo.length; index++) {
        const itemAtual = cargo[index];
        if (itemAtual.id > codigo) {
            codigo = itemAtual.id;
        }
    }
    if (codigo < 0) { codigo = 0; }

    const novoItem = {
        id: codigo + 1,
        funcao: funcao,
        descricao: descricao
    };

    cargo.push(novoItem);
    resposta.send();
});
servidor.post('/principalUsuario', (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const idade = requisicao.body.idade;

    let codigo = -99999999999999999;
    for (let index = 0; index < user.length; index++) {
        const itemAtual = user[index];
        if (itemAtual.id > codigo) {
            codigo = itemAtual.id;
        }
    }
    if (codigo < 0) { codigo = 0; }

    const novoItem = {
        id: codigo + 1,
        nome: nome,
        idade: idade
    };
    
    user.push(novoItem);
    resposta.send();
});

/* PUT - atualizar */
servidor.put('/principalUsuario/:id', (requisicao, resposta) => {
    /*Criar uma rota para a atualização de um usuário pelo código do usuário. */
    const codigoUsuario = requisicao.params.id;
    const UsuarioEncontrado = user.find((usuarioAtual) => {
        return usuarioAtual.id == codigoUsuario;
    });
    const nome = requisicao.body.nome;
    const idade = requisicao.body.idade;

    UsuarioEncontrado.nome = nome;
    UsuarioEncontrado.idade = idade;

    resposta.send();
});
servidor.put('/principalCargo/:id', (requisicao, resposta) => {
    /*Criar uma rota para atualização de um cargo.*/
    const codigoCargo = requisicao.params.id;
    const CargoEncontrado = cargo.find((cargoAtual) => {
        return cargoAtual.id == codigoCargo;
    });
    const funcao = requisicao.body.funcao;
    const descricao = requisicao.body.descricao;

    CargoEncontrado.funcao = funcao;
    CargoEncontrado.descricao = descricao;

    resposta.send();
});

/* DELETE - excluir */
servidor.delete('/principalUsuario/:id', (requisicao, resposta) => {
    /*Criar uma rota para a remoção de um usuário pelo código do usuário. */
    const codigoUsuario = requisicao.params.id;
    const usuarioEncontrado = user.findIndex((usuarioAtual) => {
        return usuarioAtual.id == codigoUsuario;
    });

    if (usuarioEncontrado !== -1) {
        user.splice(usuarioEncontrado, 1);

        resposta.send('Usuário excluído com sucesso.');
    } else {
        resposta.status(404).send('Usuário não encontrado.');
    }
});
servidor.delete('/principalCargo/:id', (requisicao, resposta) => {
    /*Criar uma rota para remoção de um cargo pelo código do cargo.*/
    const codigoCargo = requisicao.params.id;
    const CargoEncontrado = cargo.findIndex((CargoAtual) => {
        return CargoAtual.id == codigoCargo;
    });

    if (CargoEncontrado !== -1) {
        cargo.splice(CargoEncontrado, 1);

        resposta.send('Cargo excluído com sucesso.');
    } else {
        resposta.status(404).send('Cargo não encontrado.');
    }
});

servidor.listen(4300, () => {
    console.log('Meu primeiro servidor na porta 4300.');
});