import { useReducer } from "react";
import Sucess from "./success";
import Bug from "./bug";
import { BiPlus } from "react-icons/bi";
import { useQueryClient, useMutation } from "react-query";
import { helperAddProduto , helperGetProdutos} from "@/lib/helper";
 

export default function AddUserForm({formData,setFormData}){

    const queryClient = useQueryClient()
    const addMutation = useMutation(helperAddProduto,{
        onSuccess: () => {
            queryClient.prefetchQuery('produtos',helperGetProdutos)
            
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        //verifica se o formulário não foi preenchido
        if(Object.keys(formData).length == 0) return console.log("Cuidado ai ")

        let {codigo,departamento,nome,tamanho,unidade,preco,fabricante,status} = formData;
        console.log(status)
        const model = {
            codigo: `${codigo}`,
            departamento: `${departamento}`,
            nome,tamanho,unidade,preco,fabricante,status:status??"Active"
        }

        addMutation.mutate(model)


    }
    // a tag sucess vem de /components/success
    
    if(addMutation.isLoading) return <div>Loading</div>
    if(addMutation.isError) return <div>Error</div>
    if(addMutation.isSuccess) return <Sucess message={"Adicionado"}></Sucess>
    
    return(
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="number" onChange={setFormData} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="codigo" placeholder="Sku"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="departamento" placeholder="Departamento"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="nome" placeholder="Nome do produto"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="tamanho" placeholder="Tamanho"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="unidade" placeholder="Unidade de medida"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="preco" placeholder="Preço"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="fabricante" placeholder="Fabricante / Marca"/>
            </div>
            <div className="flex mx-2 gap-10 items-center">
                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Active" name="status" id="radioDefault1"/>
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800 px-1">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Inactive" name="status" id="radioDefault2"/>
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800 px-1">
                        Inactive
                    </label>
                </div>
            </div>
            <button className="flex justify-center text-md w-2/6 bg-lime-500 text-white text-lg px-4 py-2 border rounded-md hover:bg-orange-500 hover:border-green-500">Adicionar 
                <span className='px-1 mt-1'><BiPlus size={22}></BiPlus>
                </span>
            </button>
        </form>
    )
}