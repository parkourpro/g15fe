import axios from 'axios';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const DialogCreateToppingForm = ({ visible, onHide, onCreate }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        price: 0,
       
    });
    const [initialFormData] = useState({ ...formData })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/toppings', formData);
            console.log(res.data);
            onCreate()
            // Clear the form fields after successful submission
        } catch (error) {
            console.error('Error:', error);
        }
        setFormData({ ...initialFormData })
        onHide()
    };

    return (
        <Dialog
            visible={visible}
            style={{ width: '50vw' }}
            // className="sm:w-full md:w-11/12 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto"
            // onHide={onHide}
            closable={false}
            header="Create new Topping"
            footer={
                <div>
                    <Button label="Cancel" onClick={onHide} className="p-button-secondary" />
                    <Button label="Submit" onClick={handleSubmit} />
                </div>
            }
        >
            <div className=" flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg ">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                                Image URL
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="imageUrl"
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                    Price
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="price"
                                    type="number"
                                    min="0"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                           
                        </div>

                    </form>
                </div>
            </div>


        </Dialog>
    );
};

export default DialogCreateToppingForm;


