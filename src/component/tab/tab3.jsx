import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import EachPizza from '../eachpizza';
import DialogCreatePizzaForm from '../../dialog/createpizzaform';

const Tab3 = () => {
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
        className='m-4'
        severity="success"
        icon="pi pi-plus" label="Create New"
        onClick={() => setVisible(true)} />
      <div className="grid grid-cols-7 gap-4">
        <div className="py-2 px-4 font-bold text-orange-500 text-lg">Name</div>
        <div className="py-2 px-4 font-bold text-orange-500 text-lg">Description</div>
        <div className="py-2 px-4 font-bold text-orange-500 text-lg">Image URL</div>
        <div className="py-2 px-4 font-bold text-orange-500 text-lg">Price (Small)</div>
        <div className="py-2 px-4 font-bold text-orange-500 text-lg">Price (Medium)</div>
        <div className="py-2 px-4 font-bold text-orange-500 text-lg">Price (Large)</div>
        <div className="py-2 px-4 font-bold text-orange-500 text-lg">Action</div>
      </div>
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

export default Tab3;

