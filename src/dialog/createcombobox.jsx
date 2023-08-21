import axios from 'axios';
import { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const DialogCreateComboBoxForm = ({ visible, onHide, onCreate }) => {
    //mảng lưu dữ liệu lấy từ api
    const [pizzas, setPizzas] = useState([]);
    const [toppings, setToppings] = useState([])
    const [sideDishes, setSideDishes] = useState([]);
    //mảng lưu các pizzaId được check
    const [checkedPizzasId, setCheckedPizzasId] = useState([]);
    //mảng lưu các sideDish được check
    const [checkedSideDishId, setCheckedSideDishId] = useState([]);



    //dữ liệu trong comboData, mảng các object
    const [selectedPizzas, setSelectedPizzas] = useState([]);
    const [selectedSideDishes, setSelectedSideDishes] = useState([])


    //obi lưu trữ theo key:value   pizzaId:[array of topping]
    const [selectedPizzaToppings, setSelectedPizzaToppings] = useState({});
    //obj lưu các size của pizza theo cặp pizzaID: size
    const [selectedPizzaSizes, setSelectedPizzaSizes] = useState({});
    //obj lưu các số lượng của pizza theo cặp pizzaID: size
    const [selectedPizzaQuantities, setSelectedPizzaQuantities] = useState({});
    //obj lưu các số lượng của sideDish theo cặp pizzaID: size
    const [selectedSideDishQuantities, setSelectedSideDishQuantities] = useState({});

    // a combo
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        price: 0,
        comboData: {
            pizzas: [],
            sideDishes: [],
        },
    });
    const [initialFormData] = useState({ ...formData })

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await axios.get('/pizzas'); setPizzas(response.data)
            } catch (error) { console.error('Failed to fetch pizzas', error) }
        }
        const fetchToppings = async () => {
            try {
                const response = await axios.get('/toppings'); setToppings(response.data)
            } catch (error) { console.error('Failed to fetch pizzas', error) }
        }
        const fetchSideDishes = async () => {
            try {
                const response = await axios.get('/side-dishes'); setSideDishes(response.data)
            } catch (error) { console.error('Failed to fetch side dishes', error) }
        }
        fetchToppings(); fetchPizzas(); fetchSideDishes()
    }, []);

    // console.log(toppings)
    const addTopping = (pizzaId, toppingID) => {
        // const pre = selectedPizzaToppings[pizzaId]
        // console.log(pre)
        setSelectedPizzaToppings((prevToppings) => ({
            ...prevToppings,
            [pizzaId]: [...prevToppings[pizzaId] || [], toppingID]
        }));
    };

    const removeTopping = (pizzaId, toppingID) => {
        const updatedToppings = selectedPizzaToppings[pizzaId].filter((t) => t !== toppingID)
        setSelectedPizzaToppings((prevToppings) => ({
            ...prevToppings,
            [pizzaId]: updatedToppings
            // });
        }))
    };
    // console.log(pizzas)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePizzaChange = (event, pizzaId) => {
        //kiểm tra box có được check không
        const isChecked = event.target.checked;
        if (isChecked) {
            setCheckedPizzasId([...checkedPizzasId, pizzaId])
        } else {
            setCheckedPizzasId(checkedPizzasId.filter((each) => each !== pizzaId))
        }
    };
    const handleSideDishesChange = (event, sideDishId) => {
        const isChecked = event.target.checked
        if (isChecked) {
            setCheckedSideDishId([...checkedSideDishId, sideDishId])
        }
        else {
            setCheckedSideDishId(checkedSideDishId.filter((each) => each !== sideDishId))
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Tạo mảng comboData.pizzas từ selectedPizzas, selectedPizzaSizes, selectedPizzaToppings và selectedPizzaQuantities
        const pizzas = checkedPizzasId.map((pizzaId) => {
            return {
                _id: pizzaId,
                size: selectedPizzaSizes[pizzaId] || 'S',
                toppings: selectedPizzaToppings[pizzaId] || [],
                quantity: selectedPizzaQuantities[pizzaId] || 1,
            };
        });

        // Tạo mảng comboData.sideDishes từ checkedSideDishId và selectedSideDishQuantities
        const sideDishes = checkedSideDishId.map((sideDishId) => {
            return {
                _id: sideDishId,
                quantity: selectedSideDishQuantities[sideDishId] || 1,
            };
        });

        // Tạo đối tượng formData từ các giá trị trong form
        formData.comboData.pizzas = pizzas;
        formData.comboData.sideDishes = sideDishes;

        // console.log(formData)
        try {
            const res = await axios.post('/combos', formData);
            console.log(res.data);
            onCreate()
        } catch (error) {
            console.error('Error:', error);
        }
        setCheckedPizzasId([]);
        setSelectedPizzaSizes({});
        setSelectedPizzaToppings({});
        setSelectedPizzaQuantities({});
        setCheckedSideDishId([]);
        setSelectedSideDishQuantities({});
        setFormData({ ...initialFormData })
        onHide()
    };
    return (
        <Dialog
            visible={visible}
            style={{ width: '50vw' }}
            closable={false}
            header="Create new Combo Box"
            footer={
                <div>
                    <Button label="Cancel" onClick={onHide} className="p-button-secondary" />
                    <Button label="Submit" onClick={handleSubmit} />
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




                        <div>Select Pizzas:</div>
                        {pizzas.map((pizza) => (
                            <div key={pizza._id}>
                                <input type='checkbox'
                                    className='ms-3'
                                    checked={checkedPizzasId.includes(pizza._id)}
                                    onChange={(e) => handlePizzaChange(e, pizza._id)}
                                />
                                {pizza.name}
                                {checkedPizzasId.includes(pizza._id) && (
                                    <div className='ms-6'>
                                        Choose size:
                                        <select
                                            value={selectedPizzaSizes[pizza._id] || 'S'}
                                            onChange={(e) =>
                                                setSelectedPizzaSizes({
                                                    ...selectedPizzaSizes,
                                                    [pizza._id]: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                        </select>
                                        <div>
                                            Select Quantities:
                                            <input
                                                className='ms-2 w-16'
                                                type="number"
                                                min="1"
                                                value={selectedPizzaQuantities[pizza._id] || 1}
                                                onChange={(e) =>
                                                    setSelectedPizzaQuantities({
                                                        ...selectedPizzaQuantities,
                                                        [pizza._id]: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>Select Toppings:</div>
                                        {toppings.map((topping) => (
                                            <label key={topping._id}>
                                                <input
                                                    className='ms-1'
                                                    type="checkbox"
                                                    checked={
                                                        selectedPizzaToppings[pizza._id]?.includes(topping._id) || false
                                                    }
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        if (isChecked) {
                                                            addTopping(pizza._id, topping._id)

                                                        } else {
                                                            removeTopping(pizza._id, topping._id)
                                                        }
                                                    }}
                                                />
                                                {topping.name}
                                            </label>
                                        ))}
                                        <div>
                                            -------------------------------------------
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className='mt-2'>Select SideDished</div>
                        {sideDishes.map((sideDish) => (
                            <div key={sideDish._id}>
                                <label>
                                    <input
                                        className='ms-3'
                                        type="checkbox"
                                        checked={checkedSideDishId.includes(sideDish._id)}
                                        onChange={(e) => handleSideDishesChange(e, sideDish._id)}
                                    />
                                    {sideDish.name}
                                </label>

                                {checkedSideDishId.includes(sideDish._id) &&
                                    <div className='ms-8'>
                                        Quantities:
                                        <input
                                            className='ms-2 w-16'
                                            type="number"
                                            min="1"
                                            value={selectedSideDishQuantities[sideDish._id] || 1}
                                            onChange={(e) =>
                                                setSelectedSideDishQuantities({
                                                    ...selectedSideDishQuantities,
                                                    [sideDish._id]: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                }
                            </div>
                        ))}









                    </form>
                </div>
            </div>


        </Dialog>
    );
};

export default DialogCreateComboBoxForm;


