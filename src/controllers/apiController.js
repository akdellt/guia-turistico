const apiService = require('../services/apiService');

module.exports = {
    buscarTodos: async (req, res)=> {
        let json = {error: '', result: []};

        let usuarios = await apiService.buscarTodos();

        for(let i in usuarios){
            json.result.push({
                codigo: usuarios[i].codigo,
                descricao: usuarios[i].nome
            });
        }
        res.json(json);
    },

    buscarUm: async(req, res)=>{
        let json = {error: '', result:{}};

        let codigo = req.params.codigo;
        let usuario = await apiService.buscarUm(codigo);

        if(usuario){
            json.result = usuario;
        }

        res.json(json);
    },

    inserir: async(req, res)=>{
        let json = {error: '', result:{}};

        let nome = req.body.nome;
        let sobrenome = req.body.sobrenome;
        let email = req.body.email;

        if(nome && sobrenome && email){
            let userCodigo = await apiService.inserir(nome, sobrenome, email);
            json.result = {
                codigo: userCodigo,
                nome,
                sobrenome,
                email
            };
        } else{
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    alterar: async(req, res)=>{
        let json = {error: '', result:{}};

        let codigo = req.params.codigo
        let nome = req.body.nome;
        let sobrenome = req.body.sobrenome;
        let email = req.body.email;

        if(codigo && nome && sobrenome && email){
            await apiService.alterar(codigo, nome, sobrenome, email);
            json.result = {
                codigo,
                nome,
                sobrenome,
                email
            };
        } else{
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    excluir: async(req, res) =>{
        let json = {error: '', result:{}};

        await apiService.excluir(req.params.codigo);

        res.json(json);
    }
}