/****************************************************
  *  Objetivo : Responsavel pela regra de negocio referente ao CRUID de alunos
  *  Data : 14/04-2023
  *  Autor : João Victor da Silva
  *  Version : 1.0
  ********************************************************/

// Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')
 // Instancia da classe prismaClient
var prisma = new PrismaClient()

// Insere novo aluno
const insertAluno = async function (dadosAluno) {
    
    // scriptSql para inserir dados 
    let sql = `insert into tbl_aluno (
                        nome,
                        rg,
                        cpf,
                        data_nascimento,
                        email
                        ) values(
                            '${dadosAluno.nome}',
                            '${dadosAluno.rg}',
                            '${dadosAluno.cpf}',
                            '${dadosAluno.data_nascimento}',
                            '${dadosAluno.email}'
                        )`
    //Executa o scriptSql no banco de dados                    
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }

}

// Atualizar  um aluno existente
const uptadeAluno = function (dadosAluno) {

}

// excluir um aluno existente
const deleteAluno = function (id) {

}

// Retorna a lista de todos os  aluno 
const selectllAlunos = async function () {

    // script sql para buscar todos os itens no banco de dados
    let sql = 'select * from tbl_aluno'

    //prisma.$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um script sql
    //prisma.$queryRawU(select * from tbl_aluno) - permite interpretar o script sql direto no metodo
    let rsAluno = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro
    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false
    }
}

// Retorna um aluno filtrando pelo id 
const selectByIdAluno = async function (id) {


    let idAluno = id

    let sql = `select * from tbl_aluno where id = ${idAluno} `

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false
    }

}


// terminar
const selectByNome = async function (nome){

    let nomeAluno = nome

    let sql =  `select * from tbl_aluno where nome like '%${nomeAluno}%'`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0 ){
        return rsAluno
    } else {
        return false
    }
}


module.exports = {
    selectllAlunos,
    selectByIdAluno,
    selectByNome,
    insertAluno,
}