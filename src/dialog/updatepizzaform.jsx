import axios from 'axios';
import { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const DialogUpdatePizza = ({ visible, onHide, id, onUpdate  }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        price:{
            S:0,
            M:0,
            L:0
        }
    });


    useEffect(() => {
        const getPizzaInfo = async () => {
            try {
                const res = await axios.get(`/pizzas/${id}`);
                setFormData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getPizzaInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          price: {
            ...prevData.price,
            [name]: parseFloat(value),
          },
        }));
      };

    const handleUpdate = async () => {
        try {
          await axios.put(`/pizzas/${id}`, formData);
          onUpdate()
          onHide()
        } catch (error) {
          console.log('Error updating pizza:', error);
        }
      };

    return (
        <Dialog
            visible={visible}
            style={{ width: '50vw' }}
            // className="sm:w-full md:w-11/12 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto"
            // onHide={onHide}
            closable={false}
            header="Updata Pizza Information"
            footer={
                <div>
                    <Button label="Cancel" onClick={onHide} className="p-button-secondary" />
                    <Button label="Submit" onClick={handleUpdate} />
                </div>
            }
        >
            <div className=" flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg ">
                    <form>
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceS">
                                    Price (Small)
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="priceS"
                                    type="number"
                                    min="0"
                                    name="S"
                                    value={formData.price.S}
                                    onChange={handlePriceChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceM">
                                    Price (Medium)
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="priceM"
                                    type="number"
                                    min="0"
                                    name="M"
                                    value={formData.price.M}
                                    onChange={handlePriceChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceL">
                                    Price (Large)
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="priceL"
                                    type="number"
                                    min="0"
                                    name="L"
                                    value={formData.price.L}
                                    onChange={handlePriceChange}
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

export default DialogUpdatePizza;


