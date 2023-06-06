export default function Bug({message}){
    return(
        <div className="sucess container mx-auto">
            <div className="flex justify-center mx-auto border w-3/6 border-red-600 ">
                {message}
            </div>
        </div>
    )
}