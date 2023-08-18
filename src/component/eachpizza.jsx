import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import DialogConfirmDelete from '../dialog/confirmdelete';
import DialogUpdatePizza from '../dialog/updatepizzaform';



const EachPizza = ({ data, onDelete, onUpdate }) => {
  const [visible, setVisible] = useState(false);
  const [visibleupdate, setVisibleUpdate] = useState(false);

  const showDialogUpdate = () => {
    setVisibleUpdate(true)
  }
  const showDialog = () => {
    setVisible(true);
  };

  const id = data._id;
  // console.log(data)
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/pizzas/${id}`);
      onDelete(id);
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <div className="grid grid-cols-7 gap-4 my-6">
      <div className="text-xl ms-3 underlin flex items-center">{data.name}</div>
      <div className="text-xl flex items-center">{data.description}</div>
      <div className="text-xl flex items-center"><img src={data.imageUrl} alt="" /></div>
      <div className="text-xl flex items-center">{data.priceS}</div>
      <div className="text-xl flex items-center">{data.priceM}</div>
      <div className="text-xl flex items-center">{data.priceL}</div>
      <div className="">
        <div className='m-2'>
          <Button
            className='w-24'
            label="Edit" severity="help" onClick={showDialogUpdate} />
        </div>
        <div className='m-2'>
          <Button
            className='w-24'
            label="Delete" severity="danger" onClick={showDialog} />
        </div>
      </div>
      <DialogUpdatePizza
        id={id}
        visible={visibleupdate}
        onUpdate={onUpdate}
        onHide={() => setVisibleUpdate(false)}
      />
      <DialogConfirmDelete
        visible={visible}
        onHide={() => setVisible(false)}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default EachPizza;
