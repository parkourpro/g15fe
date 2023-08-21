import { useState, useEffect } from "react";
import axios from "axios";

const PizzaName = ({id}) =>{
    const [pizzaName, setPizzaName] = useState('')
    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await axios.get(`/pizzas/${id}`); 
                setPizzaName(response.data.name)
            } catch (error) { console.error('Failed to fetch pizzas', error) }
        }
        fetchPizzas()
    }, []);
    
    return(
        <div className="text-xl text-pink-50 font-semibold font-mono">
            {pizzaName}
        </div>
    )
}
export default PizzaName