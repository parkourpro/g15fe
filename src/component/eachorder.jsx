import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import NamePizza from './getnamepizzaorder';

const EachOrder = ({ data, onConfirm }) => {
    const [visible, setVisible] = useState(false);
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(data.status === 'paid' || data.status === 'cancel')

    const [name, setName] = useState('')
    const id = data._id;
    // console.log(id)
    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
    };

    const showConfirmDialog = () => {
        setIsConfirmDialogVisible(true); // Hiển thị dialog Confirm
    };

    const hideConfirmDialog = () => {
        setIsConfirmDialogVisible(false); // Ẩn dialog Confirm
    };

    const handleConfirm = async () => {
        try {
            // Gọi hàm showConfirmDialog để hiển thị dialog Confirm
            showConfirmDialog();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const getUsername = async () => {
            try {
                const res = await axios.get(`/users/${data.user}`)
                // console.log(res.data)
                setName(res.data.name)
            }
            catch (err) {
                console.log("error: fail to get name ", err)
            }
        }
        getUsername()
    }, [])
    const handleCancel = async () => {
        try {
            const res = await axios.put(`/orders/${id}`, { status: 'cancel' });
            if (res.status === 200) {
                setIsConfirmed(false);
                onConfirm(data._id, 'cancel');
            }
        } catch (err) {
            console.error(err);
        } finally {
            hideDialog();
        }
    };

    const handleConfirmAction = async () => {
        try {
            const res = await axios.put(`/orders/${id}`, { status: 'paid' });
            if (res.status === 200) {
                setIsConfirmed(true);
                onConfirm(data._id, 'paid');
            }
        } catch (err) {
            console.error(err);
        } finally {
            hideConfirmDialog();
        }
    };

    return (
        <div className="my-6 mx-4  p-4 bg-amber-800">
            <div className="grid grid-cols-2">
                <div className=''>
                    <strong className='text-xl text-amber-400'>User:</strong>
                    <span className='text-white ms-2'>{name}</span>
                </div>
                <div>
                    <strong className='text-xl text-amber-400'>Status:</strong>
                    <span className='text-white ms-2'>{data.status}</span>
                </div>
                <div>
                    <strong className='text-xl text-amber-400'>Payment Method:</strong>
                    <span className='text-white ms-2'>{data.paymentMethod}</span>
                </div>
                <div>
                    <strong className='text-xl text-amber-400'>Fee Price:</strong>
                    <span className='text-white ms-2'>{data.feePrice} VND</span>
                </div>
                <div>
                    <strong className='text-xl text-amber-400'>Address:</strong>
                    <span className='text-white ms-2'>{data.address}</span>
                </div>
                <div>
                    <strong className='text-xl text-amber-400'>Total Price:</strong>
                    <span className='text-white ms-2'>{data.totalPrice} VND</span>
                </div>
            </div>
            <div className="mt-4">
                {/* <strong>Items:</strong> */}
                <table className="w-full border-collapse border border-gray-200 mt-2">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="p-2 border text-lime-500">Item</th>
                            <th className="p-2 border text-lime-500">Name</th>
                            <th className="p-2 border text-lime-500">Size</th>
                            <th className="p-2 border text-lime-500">Crust</th>
                            <th className="p-2 border text-lime-500">Quantity</th>
                            <th className="p-2 border text-lime-500">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.pizzas.map((pizza, index) => (
                            <tr key={index}>
                                <td className="p-2 border text-white text-center">Pizza</td>
                                <td className="p-2 border text-white text-center"><NamePizza id={pizza.pizza}/></td>
                                <td className="p-2 border text-white text-center">{pizza.size}</td>
                                <td className="p-2 border text-white text-center">{pizza.crust}</td>
                                <td className="p-2 border text-white text-center">{pizza.quantity}</td>
                                <td className="p-2 border text-white text-center">{pizza.price} VND</td>
                            </tr>
                        ))}
                        {data.items.sideDishes.map((sideDish, index) => (
                            <tr key={index}>
                                <td className="p-2 border text-white text-center">Side Dish</td>
                                <td className="p-2 border text-white text-center">{sideDish.sideDish ? sideDish.sideDish.name : ''}</td>
                                <td className="p-2 border text-white text-center"></td>
                                <td className="p-2 border text-white text-center"></td>
                                <td className="p-2 border text-white text-center">{sideDish.quantity}</td>
                                <td className="p-2 border text-white text-center">{sideDish.price} VND</td>
                            </tr>
                        ))}
                        {data.items.combos.map((combo, index) => (
                            <tr key={index}>
                                <td className="p-2 border text-white text-center">Combo</td>
                                <td className="p-2 border text-white text-center"></td>
                                <td className="p-2 border text-white text-center"></td>
                                <td className="p-2 border text-white text-center"></td>
                                <td className="p-2 border text-white text-center">{combo.quantity}</td>
                                <td className="p-2 border text-white text-center">{combo.price} VND</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-3 flex items-center">
                {!isConfirmed && data.status === 'pending' && (
                    <Button
                        icon="pi pi-check"
                        label="Confirm"
                        className="bg-amber-500 rounded-full mx-2"
                        onClick={handleConfirm}
                    />
                )}
                {!isConfirmed && data.status === 'pending' && (
                    <Button
                        icon="pi pi-times"
                        label="Cancel"
                        className="bg-amber-500 rounded-full mx-2"
                        onClick={showDialog}
                    />
                )}
            </div>

            {/* Dialog xác nhận "Cancel" */}
            <Dialog
                header="Confirmation"
                visible={visible}
                style={{ width: '400px' }}
                onHide={hideDialog}
                modal
                blockScroll={false}
                footer={
                    <div>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={hideDialog}
                        />
                        <Button
                            label="Confirm"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={handleCancel}
                        />
                    </div>
                }
            >
                Bạn có chắc chắn muốn hủy đơn hàng không?
            </Dialog>

            {/* Dialog xác nhận "Confirm" */}
            <Dialog
                header="Confirmation"
                visible={isConfirmDialogVisible}
                style={{ width: '400px' }}
                onHide={hideConfirmDialog}
                modal
                blockScroll={false}
                footer={
                    <div>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={hideConfirmDialog}
                        />
                        <Button
                            label="Confirm"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={handleConfirmAction}
                        />
                    </div>
                }
            >
                Bạn có chắc chắn muốn xác nhận đơn hàng không?
            </Dialog>
        </div>
    );
};

export default EachOrder;








