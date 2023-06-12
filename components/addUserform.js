import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { helperAddProduto, helperGetProdutos } from "@/lib/helper";
import { BiPlus, BiMinus, BiSave } from "react-icons/bi";

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
        <div key={index} className='grid-cols-8 grid-rows-1'>
            <p>Mercado {index}</p>
            <div className="col-span-2">
                <select className="border px-5 py-5 rounded-md text-gray-900" name={`mercado${index}Nome`} onChange={(event) => setFormData(event)}>
                    <option selected>Selecione</option>
                    <option value="Caetano">Caetano</option>
                    <option value="Zarelli">Zarelli</option>
                    <option value="Spasso">Spasso</option>
                    <option value="Enxuto">Enxuto</option>
                    <option value="Irmãos Gonçalves">Irmãos Gonçalves</option>
                    <option value="São João">São João</option>
                </select>
            </div>
            <div className="col-span-2">
                <input
                    type="text"
                    onChange={(event) => setFormData(event)}
                    className="border px-5 py-5 focus:outline-none rounded-md text-gray-900"
                    name={`mercado${index}Cidade`}
                    placeholder="Cidade do mercado"
                />
            </div>
            <div className="col-span-2">
                <input
                    type="number"
                    step="0.01"
                    onChange={(event) => setFormData(event)}
                    className="border px-5 py-5 focus:outline-none rounded-md text-gray-900"
                    name={`mercado${index}Preco`}
                    placeholder="Preço do produto no mercado"
                />
            </div>
            <div className="col-span-2">
                <button type="button" className="bg-red-500 rounded-lg p-3 my-2" onClick={() => handleRemoveMercado(index)}>
                    <BiMinus size={22} />
                </button>
            </div>
        </div>
    ));

    return (
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
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
                <button type="submit" className="flex justify-center text-md w-2/6 bg-lime-500 text-white text-lg px-4 py-2 border rounded-md hover:bg-orange-500 hover:border-green-500">
                    Salvar
                    <span className='px-1 mt-1'><BiSave size={22}></BiSave></span>
                </button>
            </div>
            <div className="input-type">
                <h3>Mercados</h3>
                <div className="col-span-1 w-full">
                    {mercadoFields}
                </div>
                <button type="button" className="bg-[#fa8119] rounded-lg p-3" onClick={handleAddMercado}>
                    Adicionar Mercado
                </button>
            </div>
        </form>
    );
}
