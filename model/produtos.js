import {Schema,models,model } from "mongoose"; 

const produtoSchema = new Schema({
    codigo: Number,
    departamento: String,
    nome: String,
    tamanho: Number,
    unidade: String,
    preco: Number,
    fabricante: String,
    status: String
})

const Produtos = models.produtos || model('produtos',produtoSchema)
export default Produtos;