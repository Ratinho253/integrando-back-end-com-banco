/****************************************************
  *  Objetivo : Arquivo reponsavel por padronizar as mensagens de erro, sucesso, funções, variaveis para o projeto
  *  Data : 28/04/2023
  *  Autor : João Victor da Silva
  *  Version : 1.0
  ********************************************************/


/************************* Mensagem de erro **********************************/                                                       
const ERROR_REQUIRED_FIELDS = {status : 400, message : 'Campos obrigatórios não foram preenchidos'}
const ERROR_INTERNAL_SERVER = {status : 500, message : 'Devido ao um erro inerno no servidor, não foi possivel processar ao servidor'}


/************************* Mensagem de Sucesso **********************************/   
const SUCCESS_CREATEAD_ITEM = { status : 201, message : ' Item ciado com sucesso.'} 

module.exports ={
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATEAD_ITEM,
    ERROR_INTERNAL_SERVER,
}