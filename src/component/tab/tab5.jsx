import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'primereact/button'
import EachComboBox from '../eachcombobox'
import DialogCreateComboBoxForm from '../../dialog/createcombobox'


const Tab5 = () => {
    const [listCb, setListCb] = useState([]);
    const [visible, setVisible] = useState(false)
    const [rerender, setRerender] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/combos');
                setListCb(res.data);
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

    if (!listCb) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Button
                className='m-4 bg-amber-500 rounded-full'
                icon="pi pi-plus" label="Create Combo"
                onClick={() => setVisible(true)} />

            {listsd.map((each, index) => (
                <EachComboBox data={each} key={index}
                    onDelete={handleUpdate}
                    onUpdate={handleUpdate}
                />
            ))}
            <DialogCreateToppingForm
                visible={visible}
                onHide={() => setVisible(false)}
                onCreate={handleUpdate} />
        </div>
    );
}
export default Tab5