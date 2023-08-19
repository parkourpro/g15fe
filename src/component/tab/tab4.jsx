import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'primereact/button'
import EachSideDish from '../eachsidedishes'
import DialogCreateSideDishForm from '../../dialog/createsidedish'


const Tab4 = () => {
    const [listsd, setListSd] = useState([]);
    const [visible, setVisible] = useState(false)
    const [rerender, setRerender] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/side-dishes');
                setListSd(res.data);
                // console.log(res.data)
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [rerender]);

    const handleUpdate = () => {
        setRerender(rerender + 1)
    };

    if (!listsd) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Button
                className='m-4'
                severity="success"
                icon="pi pi-plus" label="Create New"
                onClick={() => setVisible(true)} />

            {listsd.map((each, index) => (
                <EachSideDish data={each} key={index}
                    onDelete={handleUpdate}
                    onUpdate={handleUpdate}
                />
            ))}
            <DialogCreateSideDishForm
                visible={visible}
                onHide={() => setVisible(false)}
                onCreate={handleUpdate} />
        </div>
    );
}
export default Tab4