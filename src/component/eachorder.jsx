import axios from 'axios';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const EachOrder = ({ data, onConfirm }) => {
    const [visible, setVisible] = useState(false);
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false); // Thêm state cho dialog Confirm
    const [isConfirmed, setIsConfirmed] = useState(data.status === 'paid' || data.status === 'cancel');
    const id = data._id;

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
        <div className="my-6 border rounded-lg p-4">
            <div className="grid grid-cols-2">
                <div>
                    <strong>User:</strong> {data.user.name}
                </div>
                <div>
                    <strong>Status:</strong> {data.status}
                </div>
                <div>
                    <strong>Payment Method:</strong> {data.paymentMethod}
                </div>
                <div>
                    <strong>Fee Price:</strong> {data.feePrice} VND
                </div>
                <div>
                    <strong>Address:</strong> {data.address}
                </div>
                <div>
                    <strong>Total Price:</strong> {data.totalPrice} VND
                </div>
            </div>
            <div className="mt-4">
                <strong>Items:</strong>
                <table className="w-full border-collapse border border-gray-200 mt-2">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border border-gray-200">Item</th>
                            <th className="p-2 border border-gray-200">Name</th>
                            <th className="p-2 border border-gray-200">Size</th>
                            <th className="p-2 border border-gray-200">Crust</th>
                            <th className="p-2 border border-gray-200">Quantity</th>
                            <th className="p-2 border border-gray-200">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.pizzas.map((pizza, index) => (
                            <tr key={index}>
                                <td className="p-2 border border-gray-200">Pizza</td>
                                <td className="p-2 border border-gray-200">{pizza.pizza.name}</td>
                                <td className="p-2 border border-gray-200">{pizza.size}</td>
                                <td className="p-2 border border-gray-200">{pizza.crust}</td>
                                <td className="p-2 border border-gray-200">{pizza.quantity}</td>
                                <td className="p-2 border border-gray-200">{pizza.price} VND</td>
                            </tr>
                        ))}
                        {data.items.sideDishes.map((sideDish, index) => (
                            <tr key={index}>
                                <td className="p-2 border border-gray-200">Side Dish</td>
                                <td className="p-2 border border-gray-200">{sideDish.sideDish ? sideDish.sideDish.name : ''}</td>
                                <td className="p-2 border border-gray-200"></td>
                                <td className="p-2 border border-gray-200"></td>
                                <td className="p-2 border border-gray-200">{sideDish.quantity}</td>
                                <td className="p-2 border border-gray-200">{sideDish.price} VND</td>
                            </tr>
                        ))}
                        {data.items.combos.map((combo, index) => (
                            <tr key={index}>
                                <td className="p-2 border border-gray-200">Combo</td>
                                <td className="p-2 border border-gray-200"></td>
                                <td className="p-2 border border-gray-200"></td>
                                <td className="p-2 border border-gray-200"></td>
                                <td className="p-2 border border-gray-200">{combo.quantity}</td>
                                <td className="p-2 border border-gray-200">{combo.price} VND</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 flex items-center">
                {!isConfirmed && data.status === 'pending' && (
                    <Button
                        icon="pi pi-check"
                        label="Confirm"
                        className="p-button-success"
                        onClick={handleConfirm}
                    />
                )}
                {!isConfirmed && data.status === 'pending' && (
                    <Button
                        icon="pi pi-times"
                        label="Cancel"
                        className="p-button-danger"
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








