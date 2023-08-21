import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import EachPizza from '../eachpizza';
import DialogCreatePizzaForm from '../../dialog/createpizzaform';

const Tab2 = () => {
  const [listPizzas, setListPizzas] = useState([]);
  const [visible, setVisible] = useState(false)
  const [rerender, setRerender] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/pizzas');
        setListPizzas(res.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [rerender]);

  const handleUpdate = () => {
    setRerender(rerender+1)
  };

  if (!listPizzas) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button
        className='m-4 bg-amber-500 rounded-full'
        icon="pi pi-plus" label="Create New"

        onClick={() => setVisible(true)} />
      
      {listPizzas.map((each, index) => (
        <EachPizza data={each} key={index}
          onDelete={handleUpdate}
          onUpdate={handleUpdate}
        />
      ))}
      <DialogCreatePizzaForm
        visible={visible}
        onHide={() => setVisible(false)}
        onCreate={handleUpdate}/>
    </div>
  );
};

export default Tab2;

