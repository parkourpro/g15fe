import axios from "axios"
import { useState, useEffect } from "react"

const NameSideDish = ({ id }) => {
    const [name, setName] = useState('')
    
    useEffect(() => {
        const getName = async () => {
            try {
                const res = await axios.get(`/side-dishes/${id}`)
                setName(res.data.name)
                // console.log("đây"+res.data.name);
            } catch (err) {
                console.log("Failed to get Side Dish Name: ", err)
            }
        }
        getName()
    }, [])

    return (
        <span>
            {name}
        </span>
    )
}

export default NameSideDish
