import axios from 'axios'
import { Button } from 'primereact/button'


const EachUser = ({ data,onDelete }) => {
    // console.log(data)
    const id = data._id
    // console.log(data._id)
    const handleDelete = async () =>{
        try{
            const res = await axios.delete(`/users/${id}`)
            onDelete(id)
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div className="grid grid-cols-6 gap-4 my-6">
            <div className="text-xl ms-3 underlin flex items-center">
                {data.username}
            </div>
            <div className="text-xl flex items-center">
                {data.name}
            </div>
            <div className="text-xl col-span-2 italic flex items-center">
                {data.email}
            </div>
            <div className="text-xl flex items-center">
                {data.phoneNumber}
            </div>
            <div className="flex items-center">
                <Button
                icon="pi pi-delete-left"
                label="Delete"
                severity="danger"
                onClick={handleDelete}
                />
            </div>
        </div>


    )
}
export default EachUser