/****************************************************
  *  Objetivo : Responsavel pela regra de negocio referente ao CRUID de alunos
  *  Data : 14/04-2023
  *  Autor : João Victor da Silva
  *  Version : 1.0
  ********************************************************/

 // import do arquivo dao para acesarv o dados do aluno no banco de dados 
var alunoDAO = require('../model/DAO/alunoDao.js')

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')


// Insere novo aluno
const inserirAluno = async function (dadosAluno) {

  //Validação  para tratar campos obrigatorios
  if(dadosAluno.nome == ''            || dadosAluno.nome == undefined            || dadosAluno.nome.length > 100            || 
     dadosAluno.rg == ''              || dadosAluno.nome == undefined            || dadosAluno.rg.length > 15               || 
     dadosAluno.cpf == ''             || dadosAluno.cpf == undefined             || dadosAluno.cpf.length > 15              || 
     dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento.length > 10  ||
     dadosAluno.email == ''           || dadosAluno.email == undefined           || dadosAluno.email.length > 200 
    ){
      return message.ERROR_REQUIRED_FIELDS // status code 400
  }else{

    // Envia os dados para a model inserir no banco de dados
    let resultDadosAlunos =  await alunoDAO.insertAluno(dadosAluno)

    // Valida se o DB inseriu corretanmente os dados
    if(resultDadosAlunos){
      return message.SUCCESS_CREATEAD_ITEM // status code 201
    }else{
      return message.ERROR_INTERNAL_SERVER // status code 500
    }

  }

}

// Atualizar  um aluno existente
const AtualizarAluno = function (dadosAluno) {

}

// excluir um aluno existente
const deletarAluno = function (id) {

}

// Retorna a lista de todos os  aluno 
const getAlunos = async function () {
  let dadosAlunosJSON = {}

  // chama a função do arquivo DAO que ira retornar todos os registros do banco de dados
  let dadosAluno = await alunoDAO.selectllAlunos()

  if (dadosAluno) {
    // criando um json com o atributo alunos, para encaminhar um array de alunos
    dadosAlunosJSON.alunos = dadosAluno
    dadosAlunosJSON.quantidade = dadosAluno.length
    return dadosAlunosJSON
  } else {
    return false
  }

}


// Retorna um aluno filtrando pelo id 
const getBuscarAlunoID = async function (id) {

  let idAluno = id

  let dadosAlunosJSON = {}

  let dadosAluno = await alunoDAO.selectByIdAluno(idAluno)

  if(dadosAluno.length){
    dadosAlunosJSON.aluno = dadosAluno
    return dadosAlunosJSON
  }else{
    return false
  }
}

const getBuscarAlunoNome = async function (nome) {

  let nomeAluno  = nome

  let dadosAlunosJSON = {}

  let dadosAluno = await alunoDAO.selectByNome(nomeAluno)

  if(dadosAluno.length){
    dadosAlunosJSON.aluno = dadosAluno
    return dadosAlunosJSON
  }else {
    return false
  }
}


module.exports = {
  getAlunos,
  getBuscarAlunoID,
  getBuscarAlunoNome,
  inserirAluno,

}