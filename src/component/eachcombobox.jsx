import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import DialogConfirmDelete from '../dialog/confirmdelete';
import PizzaName from './pizzaname';
import SideDishName from './sidedish';
import ToppingName from './toppingname';

const EachComboBox = ({ data, onDelete }) => {
    const [visible, setVisible] = useState(false);
    const { comboData } = data;

    const showDialog = () => {
        setVisible(true);
    };

    // console.log(data)
    const handleDelete = async () => {
        const id = data._id;
        try {
            const res = await axios.delete(`/combos/${id}`);
            onDelete(id);
        } catch (err) {
            console.log(err);
        }
    };



    return (
        <div>
            {/* each item here */}

            <div>
                <div className="py-4 mx-4 text-yellow-300 font-bold text-2xl underline flex items-center justify-center bg-amber-800">{data.name}
                </div>
                <div className='grid grid-cols-11 gap-1 mx-4 mb-4 justify-between bg-amber-800'>
                    {/* image */}
                    <div className='col-span-4 flex items-center justify-center'>
                        <img src={data.imageUrl} style={{ width: '80%', objectFit: 'cover' }} />
                    </div>
                    {/* detail  */}
                    <div className='col-span-5'>
                        <div className=' m-2'>

                            <div className="text-sm flex text-xl flex items-center italic text-amber-400 my-4">Description: {data.description}</div>
                            <div className="">
                                <div className="text-2xl flex items-center text-lime-500">Price:<span className='text-yellow-500 ms-6'>{data.price} đ</span> </div>
                            </div>

                        </div>

                        {/* //list pizza */}
                        <div className='bg-amber-600 p-1'>
                            <ul>
                                {comboData.pizzas.map((pizza) => (
                                    <li key={pizza._id}>
                                        <PizzaName id={pizza._id} />
                                        <div className='ms-4'>
                                            <div className='flex justify-between'>
                                                <div>
                                                    <span className='font-bold text-cyan-300'>Size:</span>
                                                    <span className='text-white ms-2 font-semibold'>{pizza.size}</span>
                                                </div>
                                                <div>
                                                    <span className='font-bold text-cyan-300'>Quantities:</span>
                                                    <span className='text-white font-semibold ms-2'>{pizza.quantity}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className='font-bold text-cyan-300'>Topping:</span> {pizza.toppings.map((topping, index) => (
                                                    <span key={index}><ToppingName id={topping} /></span>
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* //list sidedish */}
                        <div className='my-3 bg-amber-600 p-1'>
                            <div className='text-purple-200 text-xl font-semibold'>
                                Side Dishes:
                            </div>
                            <div className='ms-4'>
                                {comboData.sideDishes.map((sideDish) => (
                                    <div key={sideDish._id} className='flex justify-between'>
                                        <SideDishName id={sideDish._id} />
                                        <div className='font-bold text-cyan-300'>Quantities:
                                            <span className='text-white font-semibold ms-2'>
                                                {sideDish.quantity}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* //button delete */}
                    <div className="col-span-2 flex items-center justify-center">
                        <div>
                            <div className='m-2'>
                                <Button
                                    className='w-24 bg-amber-500 rounded-full'
                                    label="Delete" onClick={showDialog} />
                            </div>
                        </div>
                    </div>
                </div>
                <DialogConfirmDelete
                    visible={visible}
                    onHide={() => setVisible(false)}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default EachComboBox;
