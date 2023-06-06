import { BiEdit } from "react-icons/bi"
import { BiTrashAlt,BiSearch } from "react-icons/bi"
import { helperGetProdutos } from "@/lib/helper"
import { useQuery } from "react-query"
import { useState } from "react"
import { useSelector , useDispatch} from "react-redux"
import { toggleChangeAction,updateAction,deleteAction } from "@/redux/reducer"

export default function Table(){

    
    const {isLoading,isError,data,error} = useQuery('produtos',helperGetProdutos)
    const [busca, setBusca] = useState()

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error{error}</div>

    const buscar = (valor) => {
        let result = data.filter(v => v.nome.toUpperCase().includes(valor.toUpperCase()))
        setBusca(result)
    }

    return (
    <>
        <div class="relative flex items-center font-medium text-xl p-4">
                <BiSearch class="w-5 h-5 absolute ml-3 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Encontrar produtos"
                    class="w-full pr-3 pl-10 py-4 font-semibold rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2"
                    onChange={(e) => buscar(e.target.value)} 
                    value={busca?.nome}
                />
        </div>
        <table className="min-w-full table-auto">
            <thead>
             <tr className="bg-gray-800">
                <th>
                    <span className="text-gray-200">Codigo</span>
                </th>
                <th>
                    <span className="text-gray-200">Departamento</span>
                </th>
                <th>
                    <span className="text-gray-200">Nome</span>
                </th>
                <th>
                    <span className="text-gray-200">Fabricante</span>
                </th>
                <th>
                    <span className="text-gray-200">Tamanho</span>
                </th>
                <th>
                    <span className="text-gray-200">Unidade</span>
                </th>
                <th >
                    <span className="text-gray-200">Preço</span>
                </th>
                <th >
                    <span className="text-gray-200">Status</span>
                </th>
                <th>
                    <span className="text-gray-200"></span>
                </th>

             </tr>

            </thead>
            <tbody className="bg-gray-200">
                {
                    busca ? busca.map((obj, i) => <Tr {...obj} key={i} />) : data.map((obj, i) => <Tr {...obj} key={i} />)
                }  
            </tbody>
            
        </table>
        
    </>
        
    )
}

function Tr({_id,codigo,departamento,nome,fabricante,tamanho,unidade,preco,status}){
    
    
    const visible = useSelector((state) => state.app.client.toggleForm)
    const dispatch = useDispatch()

    const onUpdate = () => {
        dispatch(toggleChangeAction(_id))
        if(visible){
            dispatch(updateAction(_id))
        }
    }

    const onDelete = () => {
        if(!visible){
            dispatch(deleteAction(_id))
        }
    }

    return(
        <tr className="bg-gray-50 text-center">
            <td className="px-2 py-2">
                <span>{codigo || "Sem resultado"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{departamento || "Sem resultado"}</span>
            </td>
            <td className="px-2 py-2">
                <span className="inline-block max-w-xs truncate">{nome || "Sem resultado"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{fabricante || "Sem resultado"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{tamanho || "Sem resultado"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{unidade || "Sem resultado"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{preco || "Sem resultado"}</span>
            </td>
            <td className="px-2 py-2">
                <button className="cursor"><span className={`${status == "Active" ? 'bg-green-500':'bg-rose-500'} text-white px-5 py-1 rounded-full`}>{status}</span></button>
            </td>
            <td className="px-16 py-5 flex justify-around gap-5">
                <button className="cursor" onClick={onUpdate}><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
                <button className="cursor"onClick={onDelete}><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
            </td>
        </tr>
        
    )
}