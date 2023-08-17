import React, { useContext } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';


const DialogConfirmLogout = ({ visible, onHide }) => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()


    const hideDialog = () => {
        onHide()
    };

    const Logout = async () => {
        try {
            const res = await axios.post("/auth/logout")
            if (res.status == 200) {
                hideDialog();
                setUser(null)
                navigate('/')
            }

        } catch (err) {
            console.log(err)
        }
    }




    return (
        <Dialog
            visible={visible}
            onHide={hideDialog}
            header="Logout"
            footer={
                <div>
                    <Button label="Cancel" onClick={hideDialog} className="p-button-secondary" />
                    <Button label="Ok" onClick={Logout} autoFocus />
                </div>
            }
        >
            <p>Do you want to log out ?</p>
        </Dialog>
    )
}
export default DialogConfirmLogout