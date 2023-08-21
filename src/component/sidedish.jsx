import { useState, useEffect } from "react"
import axios from "axios"

const SideDishName = ({id}) =>{
    const [sidedishName, setSideDishName] = useState('')
    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await axios.get(`/side-dishes/${id}`); 
                setSideDishName(response.data.name)
            } catch (error) { console.error('Failed to fetch pizzas', error) }
        }
        fetchPizzas()
    }, []);
    return(
        <div className='font-bold text-cyan-300'>
            {sidedishName}
        </div>
    )
}
export default SideDishName