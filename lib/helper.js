const BASE_URL = "http://localhost:3000/"

export const helperGetProdutos = async () => {
    const response = await fetch(`${BASE_URL}api/produtos`)
    const json = await response.json()
    
    return json;
}

export const helperGetProduto = async (produtoId) => {
    const response = await fetch(`${BASE_URL}api/produtos/${produtoId}`)
    const json = await response.json()
    
    if(json) return json;
    return {};
}

export async function helperAddProduto(formData){
    try {
        const Options = {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body:JSON.stringify(formData)
        }

        const response = await fetch(`${BASE_URL}api/produtos`,Options)
        const json = await response.json()

        return json;
    } catch (error) {
        return error;
    }
}
    

export async function helperUpdateProduto(produtoId,formData){

    const Options = {
        method: 'PUT',
        headers: {'Content-Type': "application/json"},
        body:JSON.stringify(formData)
    } 

    const response = await fetch(`${BASE_URL}api/produtos/${produtoId}`,Options)
    const json = await response.json()    
    
    return json;
}


export async function helperDeleteProduto(produtoId){
    const Options = {
        method:'DELETE',
        headers: {'Content-Type': "application/json"},
    } 

    const response = await fetch(`${BASE_URL}api/produtos/${produtoId}`,Options)
    const json = await response.json()    
    return json;
}

