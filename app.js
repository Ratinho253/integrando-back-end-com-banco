/*************************************************
 *Objetiv : Api para integraçaõ entre back e banco de dados (GET, POST, PUT, DELETE) 
 * Data : 14/04/2023
 *  Autor : João Victor da Silva
 *  Version : 1.0
 **************************************************/




//Instalação do prisma no projeto (biblioteca para conexão com BO)
/**************************************
 * npm install prisma --save
 * npx prisma 
 * npx prisma init
 * npm install @prisma/client --save
 * 
 * npx prisma migrate dev  #### Serve para realizar entre o prisma eo DB
 *************************************/

//Import api
const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

//Criar objeto app conforme a classe do express
const app = express();

//Permissões de cors
app.use((request, reponse, next) => {

  // Define quem poderá acessa a api
  reponse.header('Access-Control-Allow-Origin', '*')

  //Define quis metodos serão utilizados na API
  reponse.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPITIONS')

  //Atribui as permisso~es ao cors
  app.use(cors())

  next()
})


/****************************************************
 *  Objetivo : API de controles de alunos
 *  Data : 14/04-2023
 *  Autor : João Victor da Silva
 *  Version : 1.0
 ****************************************************/

//CRUID (Create, Read, Uptade e Delete)
// import do arquivo da controller que ira solicitar a model os dados do db
var controllerAluno = require('./controller/controller_aluno.js')

var message = require('./controller/modulo/config.js')

// define que os dados que irão chegar no body da requisição será no padrão JSON
const bodyParserJSON = bodyParser.json()

///////////////////////////////////////////////////////  Todos os endpoints do alunos /////////////////////////////////////////////////////////////////////////////////////////////

//EndPoints: Retorna  todos os alunos
app.get('/v1/lion-school/aluno', cors(), async function (request, response) {


  // recebe os dados da controller
  let dadosAlunos = await controllerAluno.getAlunos()

  // valida se existe registro de alunos
  // if (dadosAlunos) {
  //   response.json(dadosAlunos)
  //   response.status(200)
  // } else {
  //   response.json()
  //   response.status(404)
  // }

  response.status(dadosAlunos.status)
  response.json(dadosAlunos)



})

//EndPoints: Retorna o aluno filtrando pelo nome
app.get('/v1/lion-school/aluno/nome/:nome', cors(), async function (request, response) {

  let nomeAluno = request.params.nome

  let dadoAluno = await controllerAluno.getBuscarAlunoNome(nomeAluno)

  if (dadoAluno) {
    response.json(dadoAluno)
    response.status(200)
  } else {
    response.json()
    response.status
  }

})

//EndPoints: Retorna o aluno filtrando pelo id
app.get('/v1/lion-school/aluno/id/:id', cors(), async function (request, response) {

  let idAluno = request.params.id

  let dadoAluno = await controllerAluno.getBuscarAlunoID(idAluno)

  response.status(dadoAluno.status)
  response.json(dadoAluno)

  // if (dadoAluno) {
  //   response.json(dadoAluno)
  //   response.status(200)
  // } else {
  //   response.json()
  //   response.status
  // }

})


//EndPoints: Insere um dados novo 
app.post('/v1/lion-school/aluno', cors(), bodyParserJSON, async function (request, response) {

  let contentType = request.headers['content-type']

  if (String(contentType).toLowerCase() == 'application/json') {

    // recebe os dados encaminhados na requisição
    let dadosBody = request.body

    let resultDadosAluno = await controllerAluno.inserirAluno(dadosBody)

    response.status(resultDadosAluno.status)
    response.json(resultDadosAluno)

  }else {
    response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
    response.json(message.ERROR_INVALID_CONTENT_TYPE)
  }
})

//EndPoints: Atualiza um aluno existente, filtrando pelo id
app.put('/v1/lion-school/aluno/:id', cors(), bodyParserJSON, async function (request, response) {

  let contentType = request.headers['content-type']

  if (String(contentType).toLowerCase() == 'application/json') {
    // Recebe o id do aluno pelo parametro
    let idAluno = request.params.id

    // Recebe os dados dos alunos encaminhado no corpo da requisição
    let dadosBody = request.body

    // Encaminha os dados para o controller
    let resultDadosAluno = await controllerAluno.AtualizarAluno(dadosBody, idAluno)

    response.status(resultDadosAluno.status)
    response.json(resultDadosAluno)

  } else {
    response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
    response.json(message.ERROR_INVALID_CONTENT_TYPE)
  }
})

//EndPoints: Deleta um aluno filtrando pelo id
app.delete('/v1/lion-school/aluno/:id', cors(), async function (request, response) {
   
  let idAluno = request.params.id

  let dadoAluno = await controllerAluno.deletarAluno(idAluno)

  if (dadoAluno) {
    response.status(message.SUCCESS_DELETE_ID.status)
    response.json()
  } else {
    response.status(message.ERROR_ID_NO_EXISTENT.status)
    response.json()
  }

})

app.listen(8080, function () {
  console.log('Aguardando requisições na porta 8080');
})