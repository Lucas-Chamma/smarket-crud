import { AiOutlineCheck } from 'react-icons/ai'
import { useQuery, useMutation, useQueryClient } from "react-query";
import { helperGetProduto, helperGetProdutos, helperUpdateProduto } from "@/lib/helper";
import { useState, useEffect } from 'react';


export default function UpdateUserForm({ formId, formData, setFormData}) {
    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery(['produtos', formId], () => helperGetProduto(formId));
    const updateMutation = useMutation((newData) => helperUpdateProduto(formId, newData), {
        onSuccess: async (data) => {
            console.log('teste');
            queryClient.prefetchQuery('produtos', helperGetProdutos);
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const { sku, nome, departamento, descricao, marca, tamanho, unidade, mercados, preco,status } = data;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updated = Object.assign({}, data, formData);
        await updateMutation.mutate(updated);
    };

    const handleMercadoChange = (index, field, value) => {
        const updatedMercados = mercados.map((mercado, mercadoIndex) => {
          if (index === mercadoIndex) {
            return {
              ...mercado,
              [field]: value,
            };
          }
          return mercado;
        });
      
        const updatedFormData = {
          ...formData,
          mercados: updatedMercados,
        };
      
        updateMutation.mutate(updatedFormData);
    };

    const mercadoFields = mercados.map((mercado, index) => (
        <div key={index}>
          <p>Mercado {index + 1}</p>
          <input
            type="text"
            defaultValue={mercado.nome}
            className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900"
            placeholder="Nome do mercado"
            onChange={(e) => handleMercadoChange(index, 'nome', e.target.value)} // Chame a função handleMercadoChange no evento onChange
          />
          <input
            type="text"
            defaultValue={mercado.cidade}
            className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900"
            placeholder="Cidade do mercado"
            onChange={(e) => handleMercadoChange(index, 'cidade', e.target.value)} // Chame a função handleMercadoChange no evento onChange
          />
          <input
            defaultValue={mercado.preco}
            className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900"
            placeholder="Preço do produto no mercado"
            onChange={(e) => handleMercadoChange(index, 'preco', e.target.value)} // Chame a função handleMercadoChange no evento onChange
          />
        </div>
      ));


    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="number" onChange={setFormData} defaultValue={sku} name="sku" className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" placeholder="Sku" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={departamento} name="departamento" className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" placeholder="Departamento" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={nome} name="nome" className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" placeholder="Nome do produto" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={tamanho} name="tamanho" className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" placeholder="Tamanho" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={unidade} name="unidade" className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" placeholder="Unidade de medida" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={descricao} name="descricao" className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" placeholder="Descrição" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={marca} name="marca" className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="marca" placeholder="Fabricante / Marca" />
            </div>
            <div className="flex mx-2 gap-10 items-center">
                <div className="form-check">
                    <input type="radio" onChange={setFormData} defaultChecked={status === "Active"} value="Active" name="status" id="radioDefault1" />
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800 px-1">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio" onChange={setFormData} defaultChecked={status === "Inactive"} value="Inactive" name="status" id="radioDefault2" />
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800 px-1">
                        Inactive
                    </label>
                </div>
                <button className="flex justify-center text-md w-2/6 text-lg bg-yellow-400 text-white px-4 py-2 border rounded-md">
                    Update <span className="px-1 mx-1 mb-1 py-1"><AiOutlineCheck size={20}></AiOutlineCheck></span>
                </button>
            </div>
            <div className="input-type">
                <h3>Mercados</h3>
                {mercadoFields}
            </div>
        </form>
    )

    
}