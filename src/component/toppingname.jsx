import { useState, useEffect } from "react";
import axios from "axios";

const ToppingName = ({id}) =>{
    const [toppingName, setToppingName] = useState('')
    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await axios.get(`/toppings/${id}`); 
                setToppingName(response.data.name)
            } catch (error) { console.error('Failed to fetch topping', error) }
        }
        fetchPizzas()
    }, []);
    
    return(
        <span className='text-white font-semibold ms-2'>
            {toppingName}
        </span>
    )
}
export default ToppingName