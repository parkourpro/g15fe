import axios from "axios"
import { useState, useEffect } from "react"


const NamePizza = ({id}) =>{
    const [name, setName] = useState('')
    useEffect(()=>{
        const getName = async () =>{
        try{
            const res = await axios.get(`/pizzas/${id}`)
            // console.log(res.data.name)
            setName(res.data.name)
        }
        catch(err){
            console.log("fail to getPizaName: ", err)
        }
        }
        getName()
    },[])

    return(
        <span>
            {name}
        </span>
    )
}
export default NamePizza