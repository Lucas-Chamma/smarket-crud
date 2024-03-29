import { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { helperGetProduto, helperUpdateProduto, helperGetProdutos } from '../lib/helper';
import { useQuery } from 'react-query';
import { AiOutlineCheck } from 'react-icons/ai';
import { useDispatch } from 'react-redux'
import { toggleChangeAction } from '@/redux/reducer'

export default function UpdateUserForm({ formId }) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch()

    const { isLoading, isError, data, error } = useQuery(['produtos', formId], () => helperGetProduto(formId));
    const updateMutation = useMutation((newData) => helperUpdateProduto(formId, newData), {
        onSuccess: async (data) => {
            console.log('teste');
            queryClient.prefetchQuery('produtos', helperGetProdutos);
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const { sku, nome, departamento, descricao, marca, tamanho, unidade, mercados, preco, status } = data;

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let updated = Object.assign({}, data, formData);
        updateMutation.mutate(updated);
        dispatch(toggleChangeAction())
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

        setFormData((prevState) => ({
            ...prevState,
            mercados: updatedMercados,
        }));
    };


    const handleRemoveMercado = (index) => {
        const updatedMercados = [...mercados];
        updatedMercados.splice(index, 1);

        setFormData((prevState) => ({
            ...prevState,
            mercados: updatedMercados,
        }));

        // Atualizar no banco de dados imediatamente
        updateMutation.mutate({ mercados: updatedMercados });

        const updatedData = { ...data, mercados: updatedMercados };
        queryClient.setQueryData(['produtos', formId], updatedData);

    };

    const mercadoFields = mercados.map((mercado, index) => (
        <div key={index}>
            <p>Mercado {index + 1}</p>
            <select defaultValue={mercado.nome} className="border w-2/6 px-5 py-5 focus:outline-none rounded-md text-gray-900"  name={`mercado${index}nome`} onChange={(e) => handleMercadoChange(index, 'nome', e.target.value)}>
                <option value="Caetano" >Caetano</option>
                <option value="Zarelli">Zarelli</option>
                <option value="Spasso">Spasso</option>
                <option value="Enxuto">Enxuto</option>
                <option value="Irmãos Gonçalves">Irmãos Gonçalves</option>
                <option value="São João">São João</option>
            </select>
            <input
                type="text"
                defaultValue={mercado.cidade}
                className="border w-2/6 px-5 py-5 focus:outline-none rounded-md text-gray-900"
                name={`mercado${index}cidade`}
                placeholder="Cidade do mercado"
                onChange={(e) => handleMercadoChange(index, 'cidade', e.target.value)}
            />
            <input
                type="number"
                step="0.01"
                defaultValue={mercado.preco}
                className="border w-2/6 px-5 py-5 focus:outline-none rounded-md text-gray-900"
                name={`mercado${index}preco`}
                placeholder="Preço do produto no mercado"
                onChange={(e) => handleMercadoChange(index, 'preco', e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveMercado(index)}>
                Remover Mercado {index}
            </button>
        </div>
    ));

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input
                    type="number"
                    onChange={(event) => setFormData((prevState) => ({ ...prevState, sku: event.target.value }))}
                    defaultValue={sku}
                    name="sku"
                    className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900"
                    placeholder="Sku"
                />
            </div>
            <div className="input-type">
                <input
                    type="text"
                    onChange={(event) => setFormData((prevState) => ({ ...prevState, departamento: event.target.value }))}
                    defaultValue={departamento}
                    name="departamento"
                    className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900"
                    placeholder="Departamento"
                />
            </div>
            <div className="input-type">
                <input
                    type="text"
                    onChange={(event) => setFormData((prevState) => ({ ...prevState, nome: event.target.value }))}
                    defaultValue={nome}
                    name="nome"
                    className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900"
                    placeholder="Nome do produto"
                />
            </div>
            <div className="input-type">
                <input
                    type="text"
                    onChange={(event) => setFormData((prevState) => ({ ...prevState, tamanho: event.target.value }))}
                    defaultValue={tamanho}
                    name="tamanho"
                    className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900"
                    placeholder="Tamanho"
                />
            </div>
            <div className="input-type">
                <input
                    type="text"
                    onChange={(event) => setFormData((prevState) => ({ ...prevState, unidade: event.target.value }))}
                    defaultValue={unidade}
                    name="unidade"
                    className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900"
                    placeholder="Unidade de medida"
                />
            </div>
            <div className="input-type">
                <input
                    type="text"
                    onChange={(event) => setFormData((prevState) => ({ ...prevState, descricao: event.target.value }))}
                    defaultValue={descricao}
                    name="descricao"
                    className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900"
                    placeholder="Descrição"
                />
            </div>
            <div className="input-type">
                <input
                    type="text"
                    onChange={(event) => setFormData((prevState) => ({ ...prevState, marca: event.target.value }))}
                    defaultValue={marca}
                    name="marca"
                    className="border w-full px-5 py-5 focus:outline-none rounded-md text-gray-900"
                    placeholder="Fabricante / Marca"
                />
            </div>
            <div className="flex mx-2 gap-10 items-center">
                <div className="form-check">
                    <input
                        type="radio"
                        onChange={(event) => setFormData((prevState) => ({ ...prevState, status: event.target.value }))}
                        defaultChecked={status === 'Active'}
                        value="Active"
                        name="status"
                        id="radioDefault1"
                    />
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800 px-1">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        onChange={(event) => setFormData((prevState) => ({ ...prevState, status: event.target.value }))}
                        defaultChecked={status === 'Inactive'}
                        value="Inactive"
                        name="status"
                        id="radioDefault2"
                    />
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
    );
}