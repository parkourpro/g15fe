import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import DialogConfirmDelete from '../dialog/confirmdelete';
import DialogUpdateTopping from '../dialog/updatetoppingform';

const EachTopping = ({ data, onDelete, onUpdate }) => {
  const [visible, setVisible] = useState(false);
  const [visibleupdate, setVisibleUpdate] = useState(false);

  const showDialogUpdate = () => {
    setVisibleUpdate(true);
  };

  const showDialog = () => {
    setVisible(true);
  };

  const id = data._id;

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/toppings/${id}`);
      onDelete(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* each item here */}
      <div className='flex m-4 justify-between'>
        <div className='flex'>
          {/* image */}
          <div>
            <img src={data.imageUrl} style={{ width: '5cm', height: '5cm', objectFit: 'cover' }} />
          </div>
          {/* detail  */}
          <div className='max-w-xs m-2'>
            <div className="text-yellow-300 font-bold text-2xl underlin flex items-center">{data.name}</div>
            <div className="text-sm flex items-center">{data.description}</div>
            <div className="grid grid-cols-3 grid-rows-2 gap-4 text-lime-50">
              <div className="col-span-1">
                <div className="text-xl flex items-center">Price: {data.price.toLocaleString()} VND</div>
              </div>
              
            </div>

          </div>
        </div>
        <div className="flex items-center">
          <div>
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
        </div>
      </div>

      <DialogUpdateTopping
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

export default EachTopping;



