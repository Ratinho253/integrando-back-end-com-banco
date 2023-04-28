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

// define que os dados que irão chegar no body da requisição será no padrão JSON
const bodyParserJSON = bodyParser.json()

//EndPoints: Retorna  todos os alunos
app.get('/v1/lion-school/aluno', cors(), async function (request, response) {


  // recebe os dados da controller
  let dadosAlunos = await controllerAluno.getAlunos()

  // valida se existe registro de alunos
  if(dadosAlunos){
    response.json(dadosAlunos)
    response.status(200)
  }else{
    response.json()
    response.status(404)
  }

})


//EndPoints: Retorna o aluno filtrando pelo ID
app.get('/v1/lion-school/aluno/nome/:nome', cors(), async function (request, response) { 

  let nomeAluno = request.params.nome

  let  dadoAluno = await controllerAluno.getBuscarAlunoNome(nomeAluno)

  if(dadoAluno){
    response.json(dadoAluno)
    response.status(200)
  }else{
    response.json()
    response.status
  }

})

app.get('/v1/lion-school/aluno/id/:id', cors(), async function (request, response) { 

  let idAluno = request.params.id

  let  dadoAluno = await controllerAluno.getBuscarAlunoID(idAluno)

  if(dadoAluno){
    response.json(dadoAluno)
    response.status(200)
  }else{
    response.json()
    response.status
  }

})


//EndPoints: Insere um dados novo 
app.post('/v1/lion-school/aluno', cors(), bodyParserJSON , async function (request, response) {

  // recebe os dados encaminhados na requisição
  let dadosBody = request.body

  let resultDadosAluno = await controllerAluno.inserirAluno(dadosBody)

  response.status( resultDadosAluno.status)
  response.json(resultDadosAluno)
})



//EndPoints: Atualiza um aluno existente, filtrando pelo id
app.put('/v1/lion-school/aluno/:id', cors(), async function (request, response) {

})

//EndPoints: Deleta um aluno filtrando pelo id
app.delete('/v1/lion-school/aluno/:id', cors(), async function (request, response) {

})

app.listen(8080, function () {
  console.log('Aguardando requisições na porta 8080');
})