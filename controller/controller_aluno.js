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
  if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 100 ||
    dadosAluno.rg == '' || dadosAluno.nome == undefined || dadosAluno.rg.length > 15 ||
    dadosAluno.cpf == '' || dadosAluno.cpf == undefined || dadosAluno.cpf.length > 15 ||
    dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento.length > 10 ||
    dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email.length > 200
  ) {
    return message.ERROR_REQUIRED_FIELDS // status code 400
  } else {

    // Envia os dados para a model inserir no banco de dados
    let resultDadosAlunos = await alunoDAO.insertAluno(dadosAluno)

    // Valida se o DB inseriu corretanmente os dados
    if (resultDadosAlunos) {

      // chama a função que vai encontrar o id gerado apos o insert
      let novoAluno = await alunoDAO.selectLastId()


      let dadosAlunosJSON = {}

      dadosAlunosJSON.status = message.SUCCESS_CREATEAD_ITEM.status
      dadosAlunosJSON.aluno = novoAluno

      return dadosAlunosJSON// status code 201
    } else {
      return message.ERROR_INTERNAL_SERVER // status code 500
    }

  }

}

// Atualizar  um aluno existente
const AtualizarAluno = async function (dadosAluno, idAluno) {


  //Validação  para tratar campos obrigatorios
  if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 100 ||
    dadosAluno.rg == '' || dadosAluno.nome == undefined || dadosAluno.rg.length > 15 ||
    dadosAluno.cpf == '' || dadosAluno.cpf == undefined || dadosAluno.cpf.length > 15 ||
    dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento.length > 10 ||
    dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email.length > 200
  ) {
    return message.ERROR_REQUIRED_FIELDS // status code 400

    // validação de id incorreto ou não informado
  } else if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
    return message.ERROR_INVALID_ID // status code 400 
  } else {

    // adiciona um id do aluno no json do dados

    dadosAluno.id = idAluno



    // encaminha os dados para a model do aluno 
    let resultDadosAluno = await alunoDAO.uptadeAluno(dadosAluno)

    if (resultDadosAluno) {
      let dadosAlunoJson = {}
      dadosAlunoJson.status = message.SUCCESS_UPTADE_ITEM.status
      dadosAlunoJson.aluno = dadosAluno
      return dadosAlunoJson // status code 200
    } else {
      return message.ERROR_INTERNAL_SERVER
    }

  }


}

// excluir um aluno existente
const deletarAluno = async function (id) {

  let idAluno = id


  let statusId = await alunoDAO.selectByIdAluno(idAluno)

  let dadosAluno = await alunoDAO.deleteAluno(idAluno)

  if (statusId) {

    if (dadosAluno) {
      let statusId = {}
      statusId.status = message.SUCCESS_DELETE_ID.status
      return statusId
    }
  } else {
    return message.ERROR_NOT_FOUND
  }



  // if(dadosAluno){
  //   return message.SUCCESS_DELETE_ID
  // }else{
  //   return message.ERROR_ID_NO_EXISTENT
  // }
}

// Retorna a lista de todos os  aluno 
const getAlunos = async function () {
  let dadosAlunosJSON = {}

  // chama a função do arquivo DAO que ira retornar todos os registros do banco de dados
  let dadosAluno = await alunoDAO.selectllAlunos()

  if (dadosAluno) {
    // criando um json com o atributo alunos, para encaminhar um array de alunos
    dadosAlunosJSON.status = message.SUCCESS_REQUEST.status
    dadosAlunosJSON.message = message.SUCCESS_REQUEST.message
    dadosAlunosJSON.quantidade = dadosAluno.length
    dadosAlunosJSON.alunos = dadosAluno
    return dadosAlunosJSON
  } else {
    return message.ERROR_NOT_FOUND
  }

}


// Retorna um aluno filtrando pelo id 
const getBuscarAlunoID = async function (id) {

  let idAluno = id

  if (idAluno == '' || id == undefined || id == isNaN(idAluno)) {
    return message.ERROR_INVALID_ID
  } else {
    let dadosAlunosJSON = {}

    let dadosAluno = await alunoDAO.selectByIdAluno(idAluno)

    if (dadosAluno.length) {
      dadosAlunosJSON.status = message.SUCCESS_REQUEST.status
      dadosAlunosJSON.message = message.SUCCESS_REQUEST.message
      dadosAlunosJSON.aluno = dadosAluno
      return dadosAlunosJSON
    } else {
      return message.ERROR_NOT_FOUND
    }
  }


}

const getBuscarAlunoNome = async function (nome) {

  let nomeAluno = nome

  let dadosAlunosJSON = {}

  let dadosAluno = await alunoDAO.selectByNome(nomeAluno)

  if (dadosAluno.length) {
    dadosAlunosJSON.aluno = dadosAluno
    return dadosAlunosJSON
  } else {
    return false
  }
}


module.exports = {
  getAlunos,
  getBuscarAlunoID,
  getBuscarAlunoNome,
  inserirAluno,
  AtualizarAluno,
  deletarAluno,
}