

export default function Sucess({message}){
    return(
        <div className="sucess container mx-auto">
            <div className="flex justify-center mx-auto border w-3/6 border-yellow-200 ">
                {message}
            </div>
        </div>
    )
}