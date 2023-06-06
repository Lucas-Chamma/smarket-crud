
import Produtos from "@/model/produtos"

export async function getProdutos(req,res){
    try{
        const produtos = await Produtos.find({})

        if(!produtos) return res.status(404).json({error:"Data no found"})
        res.status(200).json(produtos)
    }catch(error){
        console.error("Erro ao criar modelo:", error);
        res.status(404).json({error:"Error while fetching data"})
    }
}

export async function getProduto(req,res){
    try {
        const {produtoId} = req.query

        if(produtoId){
            const produto = await Produtos.findById(produtoId)
            res.status(200).json(produto)
        }
        res.status(404).json({error:"User not selected..."})
    } catch (error) {
        res.status(404).json({error:"Cannot get the Produto"})
    }
}

export async function postProduto(req,res){
    const formData = req.body;

    console.log(formData)

    Produtos.create(formData)
        .then(result =>{
            res.status(200).json({message:"Sucesso",result})
        })
        .catch(err =>{
            console.error("Erro ao criar modelo:", err);
            res.status(500).json({error:"Erro ao criar", message: err.message});
        })
    
}

export async function putProduto(req,res){
    try {
        const {produtoId} = req.query;
        const formData = req.body;

        if(produtoId && formData){
            const produto = await Produtos.findByIdAndUpdate(produtoId,formData);
            res.status(200).json(produto)
        }
        res.status(404).json({error:"Produto não selecionado"})
    } catch (error) {
        res.status(404).json({error:"Error while updating the data"})
    }
}

export async function deleteProduto(req,res){
    try {
        const {produtoId} = req.query;

        if(produtoId){
            const produto = await Produtos.findByIdAndDelete(produtoId)
            res.status(200).json({deleted: produtoId})
        }
        res.status(404).json({error:"Produto não selecionado"})
    } catch (error) {
        res.status(404).json({error:"Error while deleting the produto"})
    }
}


