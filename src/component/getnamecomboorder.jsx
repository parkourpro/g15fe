import axios from "axios"
import { useState, useEffect } from "react"

const NameCombo = ({ id }) => {
    const [name, setName] = useState('')
    
    useEffect(() => {
        const getName = async () => {
            try {
                const res = await axios.get(`/combos/${id}`)
                setName(res.data.name)
                console.log("Combo Name: " + res.data.name);
            } catch (err) {
                console.log("Failed to get Combo Name: ", err)
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

export default NameCombo
