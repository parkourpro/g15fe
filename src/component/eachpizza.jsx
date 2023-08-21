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
    <div>
      {/* each item here */}
      <div className='flex m-4 justify-between bg-amber-800'>
        <div className='flex jusify-between'>
          {/* image */}
          <div className='flex items-center'>
            <img src={data.imageUrl} style={{ width: '5cm', height: '5cm', objectFit: 'cover' }} />
          </div>
          {/* detail  */}
          <div className=' my-2 ms-10 flex items-center'>
            <div>
              <div className="text-yellow-300 font-bold text-2xl underline flex items-center">{data.name}
              </div>
              <div className="max-w-xs text-md flex items-center italic text-amber-400 my-4">Description: {data.description}
              </div>
              <div className="grid grid-cols-3 gap-4 text-lime-50">
                <div className="col-span-1">
                  <div className="font-semibold text-xl flex items-center text-lime-500">Price of size S</div>
                  <div className="text-2xl flex items-center text-yellow-500">{data.price.S} đ</div>
                </div>
                <div className="col-span-1">
                  <div className="font-semibold text-xl flex items-center text-lime-500">Price of size M</div>
                  <div className="text-2xl flex items-center text-yellow-500">{data.price.M} đ</div>
                </div>
                <div className="col-span-1">
                  <div className="font-semibold text-xl flex items-center text-lime-500 ">Price of size L</div>
                  <div className=" flex items-center text-2xl text-yellow-500">{data.price.L} đ</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        
        <div className="flex items-center">
          <div className='flex flex-col'>
            <div className='mx-2 my-6'>
              <Button
                className='w-24 bg-amber-500 rounded-full'
                label="Edit" onClick={showDialogUpdate} />
            </div>
            <div className='mx-2 my-6'>
              <Button
                className='w-24 bg-amber-500 rounded-full'
                label="Delete"  onClick={showDialog} />
            </div>
          </div>
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
