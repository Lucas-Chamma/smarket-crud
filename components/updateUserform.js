import { useReducer } from "react";
import Sucess from "./success";
import Bug from "./bug";
import {AiOutlineCheck} from 'react-icons/ai'
import { useQuery,useMutation,useQueryClient} from "react-query";
import { helperGetProduto,helperGetProdutos,helperUpdateProduto } from "@/lib/helper";


export default function UpdateUserForm({formId,formData,setFormData}){

    const queryClient = useQueryClient()
    const {isLoading,isError,data,error} = useQuery(['produtos',formId],() => helperGetProduto(formId))
    const UpdateMutation = useMutation((newData) => helperUpdateProduto(formId,newData),{
        onSuccess: async (data) => {
            console.log('teste')
            queryClient.prefetchQuery('produtos',helperGetProdutos)
        }
    })

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error</div>  

    const {codigo,departamento,nome,tamanho,unidade,preco,fabricante,status} = data

    
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        let updated = Object.assign({},data,formData)
        // let updata é -> data.nome = "admin"formadata.name = "client"
        await UpdateMutation.mutate(updated)
    }
   
    
    return(
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="number" onChange={setFormData} defaultValue={codigo} name="codigo" className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900"  placeholder="Sku"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={departamento} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="departamento" placeholder="Departamento"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={nome} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="nome" placeholder="Nome do produto"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={tamanho} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="tamanho" placeholder="Tamanho"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={unidade} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="unidade" placeholder="Unidade de medida"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={preco} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="preco" placeholder="Preço"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={fabricante} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="fabricante" placeholder="Fabricante / Marca"/>
            </div>
            <div className="flex mx-2 gap-10 items-center">
                <div className="form-check">
                    <input type="radio" defaultChecked={status == "Active"} onChange={setFormData} value="Active" name="status" id="radioDefault1"/>
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800 px-1">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio" defaultChecked={status !== "Active"} onChange={setFormData} value="Inactive" name="status" id="radioDefault2"/>
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800 px-1">
                        Inactive
                    </label>
                </div>
            </div>
            <button className="flex justify-center text-md w-2/6 text-lg bg-yellow-400 text-white px-4 py-2 border rounded-md">
                Update <span className="px-1 mx-1 mb-1 py-1"><AiOutlineCheck size={20}></AiOutlineCheck></span>
            </button>
        </form>
    )
}