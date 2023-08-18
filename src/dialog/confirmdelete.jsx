import React, { useContext } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';


const DialogConfirmDelete = ({ visible, onHide, onDelete }) => {

    const Delete = () => {
        onDelete()
        onHide()
    }



    return (
        <Dialog
            visible={visible}
            closable={false}
            header="DELETE"
            footer={
                <div>
                    <Button label="Cancel" onClick={onHide} className="p-button-secondary" />
                    <Button label="Ok" onClick={Delete} autoFocus />
                </div>
            }
        >
            <p>Do you want to delete ?</p>
        </Dialog>
    )
}
export default DialogConfirmDelete