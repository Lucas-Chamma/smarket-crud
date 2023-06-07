import {Schema,models,model } from "mongoose"; 

const produtoSchema = new Schema({
    nome: String,
    departamento: String,
    descricao: String,
    marca: String,
    status: String,
    mercados: [
        {
            nome: String,
            cidade: String,
            preco: Number,
        }
    ],
    sku: Number,
    tamanho: Number,
    unidade: String
})

const Produtos = models.produtos || model('produtos',produtoSchema)
export default Produtos;