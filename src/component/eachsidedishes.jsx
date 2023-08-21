import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import DialogConfirmDelete from '../dialog/confirmdelete';
import DialogUpdateSideDish from '../dialog/updatesidedish';


const EachSideDish = ({ data, onDelete, onUpdate }) => {
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
            const res = await axios.delete(`/side-dishes/${id}`);
            onDelete(id);
        } catch (err) {
            console.log(err);
        }
    };



    return (
        <div>
            {/* each item here */}
            <div className='flex m-4 justify-between bg-amber-800'>
                <div className='flex'>
                    {/* image */}
                    <div>
                        <img src={data.imageUrl} style={{ width: '5cm', height: '5cm', objectFit: 'cover' }} />
                    </div>
                    {/* detail  */}
                    <div className='max-w-xs ms-6 mt-2'>
                        <div className="text-yellow-300 font-bold text-2xl underline flex items-center">{data.name}
                        </div>
                        <div className="ms-5 mt-2 flex items-center text-md flex items-center italic text-amber-400">{data.description}</div>
                        <div className='mt-4 text-xl flex items-center text-lime-400'>
                            <span className='font-semibold me-2 text-indigo-200'>Category:</span> {data.category}
                        </div>
                        <div className="mt-2">
                            <div className="text-xl items-center me-2 text-lime-400">
                                <span className='font-semibold me-2 text-indigo-200'>Price:</span>
                            {data.price} đ</div>
                        </div>

                    </div>
                </div>
                <div className="flex items-center">
                    <div>
                        <div className='m-2 my-4'>
                            <Button
                                className='w-24 bg-amber-500 rounded-full'
                                label="Edit" onClick={showDialogUpdate} />
                        </div>
                        <div className='m-2 my-4'>
                            <Button
                                className='w-24 bg-amber-500 rounded-full'
                                label="Delete" onClick={showDialog} />
                        </div>
                    </div>
                </div>
            </div>
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
            <div>{data.category}</div>
            <div className="text-sm flex items-center">Description: {data.description}</div>
            <div className="col-span-1">
              <div className="text-xl flex items-center">Price: {data.price} VND</div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <div className='m-2'>
              <Button
                className='w-24'
                label="Edit"
                severity="help"
                onClick={showDialogUpdate}
              />
            </div>
            <div className='m-2'>
              <Button
                className='w-24'
                label="Delete"
                severity="danger"
                onClick={showDialog}
              />
            </div>
          </div>
        </div>
      </div>

            <DialogUpdateSideDish
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

export default EachSideDish;
