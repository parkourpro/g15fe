import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import EachTopping from '../eachtopping';
import DialogCreateToppingForm from '../../dialog/createtoppingform';

const Tab3 = () => {
  const [listToppings, setListToppings] = useState([]);
  const [visible, setVisible] = useState(false)
  const [rerender, setRerender] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/toppings');
        setListToppings(res.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [rerender]);

  const handleUpdate = () => {
    setRerender(rerender+1)
  };

  if (!listToppings) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button
        className='m-4'
        severity="success"
        icon="pi pi-plus" label="Create New"
        onClick={() => setVisible(true)} />
      
      {listToppings.map((each, index) => (
        <EachTopping data={each} key={index}
          onDelete={handleUpdate}
          onUpdate={handleUpdate}
        />
      ))}
      <DialogCreateToppingForm
        visible={visible}
        onHide={() => setVisible(false)}
        onCreate={handleUpdate}/>
    </div>
  );
};

export default Tab3;

