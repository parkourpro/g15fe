import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import DialogConfirmDelete from '../dialog/confirmdelete';
import DialogUpdateTopping from '../dialog/updatetoppingform';


const EachTopping = ({ data, onDelete, onUpdate }) => {
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
      const res = await axios.delete(`/toppings/${id}`);
      onDelete(id);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div>
      {/* each item here */}
      <div className='flex m-4 justify-between bg-amber-800'>
        <div className='flex justify-around'>
          {/* image */}
          <div className='flex items-center'>
            <img src={data.imageUrl} style={{ width: '5cm', height: '5cm', objectFit: 'cover' }} />
          </div>
          {/* detail  */}
          <div className='max-w-xs mt-2 ms-6'>
            <div className="text-yellow-300 font-bold text-2xl underline flex items-center">{data.name}
            </div>
            <div className="max-w-xs mt-2 text-md flex items-center italic text-amber-400">Description: {data.description}</div>
         
                <div className="text-xl flex items-center text-lime-500 mt-2">
                  <span className='font-semibold me-2 text-indigo-200'>Price:</span>
                  {data.price} đ</div>
              

          </div>
        </div>
        <div className="flex items-center">
          <div>
            <div className='mx-2 my-6'>
              <Button
                className='w-24 bg-amber-500 rounded-full'
                label="Edit" onClick={showDialogUpdate} />
            </div>
            <div className='mx-2 my-6'>
              <Button
                className='w-24 bg-amber-500 rounded-full'
                label="Delete" onClick={showDialog} />
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
