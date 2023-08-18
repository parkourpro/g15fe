import axios from 'axios'
import { useState } from 'react';
import { Button } from 'primereact/button'
import DialogConfirmDelete from '../dialog/confirmdelete';
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons


const EachUser = ({ data, onDelete }) => {
    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };
    const id = data._id



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
            <div className="text-xl font-bold flex items-center">
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
                onClick={showDialog}
                />
            </div>
            <DialogConfirmDelete
            hien={visible}
            an={()=>setVisible(false)}
            onDelete ={handleDelete}
            />
        </div>


    )
}
export default EachUser