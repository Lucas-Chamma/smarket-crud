import connectMongo from "@/database/conn"
import { getProdutos, postProduto, putProduto, deleteProduto, getProduto} from "@/database/controller";

export default async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({error:"Error in the Connection"}))
    
    const {method} = req

    switch(method){
        case "GET":
          getProduto(req,res)
          break;  

        case "PUT":
          putProduto(req,res)
          break; 

        case "DELETE":
          deleteProduto(req,res)
          break;  
       
        default:
            res.setHeader('Allow',['GET','POST','PUT','DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
    }
}