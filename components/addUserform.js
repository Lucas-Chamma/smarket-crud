import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { helperAddProduto, helperGetProdutos } from "@/lib/helper";
import { BiPlus, BiMinus } from "react-icons/bi";

export default function AddUserForm({ formData, setFormData }) {
    const queryClient = useQueryClient();
    const addMutation = useMutation(helperAddProduto, {
        onSuccess: () => {
            queryClient.prefetchQuery("produtos", helperGetProdutos);
        },
    });

    const [mercados, setMercados] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //verifica se o formulário não foi preenchido
        if (Object.keys(formData).length === 0) return console.log("Cuidado aí");

        let { nome, departamento, descricao, marca, tamanho, unidade, sku, status } =
            formData;

        const mercadosData = mercados.map((mercado, index) => ({
            nome: formData[`mercado${index}Nome`] || "",
            cidade: formData[`mercado${index}Cidade`] || "",
            preco: formData[`mercado${index}Preco`] || 0,
        }));

        const model = {
            sku: `${sku}`,
            departamento: `${departamento}`,
            nome,
            tamanho,
            descricao,
            unidade,
            mercados: mercadosData,
            marca,
            status: status ?? "Active",
        };

        addMutation.mutate(model);
    };

    const handleAddMercado = () => {
        setMercados((prevMercados) => [...prevMercados, ""]);
    };

    const handleRemoveMercado = (index) => {
        setMercados((prevMercados) => {
            const updatedMercados = [...prevMercados];
            updatedMercados.splice(index, 1);
            return updatedMercados;
        });
    };


    const mercadoFields = mercados.map((mercado, index) => (
        <div key={index}>
            <p>Mercado {index}</p>
            <select className="border w-2/6 px-5 py-5 focus:outline-none rounded-md text-gray-900"  name={`mercado${index}Nome`} onChange={(event) => setFormData(event)}>
                <option selected>Selecione</option>
                <option value="Caetano">Caetano</option>
                <option value="Zarelli">Zarelli</option>
                <option value="Spasso">Spasso</option>
                <option value="Enxuto">Enxuto</option>
                <option value="Irmãos Gonçalves">Irmãos Gonçalves</option>
                <option value="São João">São João</option>
            </select>
            <input
                type="text"
                onChange={(event) => setFormData(event)}
                className="border w-2/6 px-5 py-5 focus:outline-none rounded-md text-gray-900"
                name={`mercado${index}Cidade`}
                placeholder="Cidade do mercado"
            />
            <input
                type="float"
                onChange={(event) => setFormData(event)}
                className="border w-2/6 px-5 py-5 focus:outline-none rounded-md text-gray-900"
                name={`mercado${index}Preco`}
                placeholder="Preço do produto no mercado"
            />
            <button type="button" onClick={() => handleRemoveMercado(index)}>
                Remover Mercado {index}
            </button>
        </div>
    ));

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="number" onChange={(event) => setFormData(event)} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="sku" placeholder="Sku" />
            </div>
            <div className="input-type">
                <input type="text" onChange={(event) => setFormData(event)} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="departamento" placeholder="Departamento" />
            </div>
            <div className="input-type">
                <input type="text" onChange={(event) => setFormData(event)} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="nome" placeholder="Nome do produto" />
            </div>
            <div className="input-type">
                <input type="text" onChange={(event) => setFormData(event)} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="tamanho" placeholder="Tamanho" />
            </div>
            <div className="input-type">
                <input type="text" onChange={(event) => setFormData(event)} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="unidade" placeholder="Unidade de medida" />
            </div>
            <div className="input-type">
                <input type="text" onChange={(event) => setFormData(event)} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="descricao" placeholder="Descrição" />
            </div>
            <div className="input-type">
                <input type="text" onChange={(event) => setFormData(event)} className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900" name="marca" placeholder="Fabricante / Marca" />
            </div>
            <div className="flex mx-2 gap-10 items-center">
                <div className="form-check">
                    <input type="radio" onChange={(event) => setFormData(event)} value="Active" name="status" id="radioDefault1" />
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800 px-1">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio" onChange={(event) => setFormData(event)} value="Inactive" name="status" id="radioDefault2" />
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800 px-1">
                        Inactive
                    </label>
                </div>
                <button type="submit" className="flex justify-center text-md w-2/6 bg-lime-500 text-white text-lg px-4 py-2 border rounded-md hover:bg-orange-500 hover:border-green-500">Adicionar
                    <span className='px-1 mt-1'><BiPlus size={22}></BiPlus>
                    </span>
                </button>
            </div>
            <div className="input-type">
                <h3>Mercados</h3>
                {mercadoFields}
                <button type="button" onClick={handleAddMercado}>
                    Adicionar Mercado
                </button>
            </div>
        </form>
    );
}
