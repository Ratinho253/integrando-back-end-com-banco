/****************************************************
  *  Objetivo : Arquivo reponsavel por padronizar as mensagens de erro, sucesso, funções, variaveis para o projeto
  *  Data : 28/04/2023
  *  Autor : João Victor da Silva
  *  Version : 1.0
  ********************************************************/


/************************* Mensagem de erro **********************************/                                                       
const ERROR_REQUIRED_FIELDS = {status : 400, message : 'Campos obrigatórios não foram preenchidos'}
const ERROR_INTERNAL_SERVER = {status : 500, message : 'Devido ao um erro inerno no servidor, não foi possivel processar ao servidor'}
const ERROR_INVALID_ID = {status : 400, message : 'O id informado na requisição não é valido ou não foi encaminhado'}
const ERROR_ID_NO_EXISTENT = {status : 400, message : 'O id informado na requisição não é valido ou não existe mais'}
const ERROR_NOT_FOUND = {status : 404, message : 'Nenhum item encontrado na requisição'}
const ERROR_INVALID_CONTENT_TYPE = {status : 415, message : 'O servidor se recusa a processar a requisição devido ao formato errado dos metadados adicionados a ela. Geralmente corrigir o valor dos headers Content-Type ou Content-Encoding pode corrigir o problema.'}



/************************* Mensagem de Sucesso **********************************/   
const SUCCESS_CREATEAD_ITEM = { status : 201, message : ' Item ciado com sucesso.'} 
const SUCCESS_UPTADE_ITEM = { status : 200, message : ' Item atualizado com sucesso.'}
const SUCCESS_DELETE_ID = {status : 200, message : 'Item excluido com sucesso'}
const SUCCESS_REQUEST = {status : 200, message : 'Requisição bem sucedida'}


module.exports ={
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATEAD_ITEM,
    ERROR_INTERNAL_SERVER,
    ERROR_INVALID_ID,
    SUCCESS_UPTADE_ITEM,
    ERROR_INVALID_CONTENT_TYPE,
    SUCCESS_DELETE_ID,
    ERROR_ID_NO_EXISTENT,
    SUCCESS_REQUEST,
    ERROR_NOT_FOUND
}