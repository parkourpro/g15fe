import React, { useState } from 'react';
import axios from 'axios';

const Tab5 = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    comboData: {
      pizzas: [{ _id: '', size: 'S', toppings: 'Topping 1', quantity: 0 }],
      sideDishes: [{ _id: '', quantity: 0 }],
    },
    category: 'combo',
    price: 0,
  });

  const handlePizzaChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPizzas = [...formData.comboData.pizzas];
    updatedPizzas[index][name] = value;

    setFormData({
      ...formData,
      comboData: { ...formData.comboData, pizzas: updatedPizzas },
    });
  };

  const handleSideDishChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSideDishes = [...formData.comboData.sideDishes];
    updatedSideDishes[index][name] = value;

    setFormData({
      ...formData,
      comboData: { ...formData.comboData, sideDishes: updatedSideDishes },
    });
  };

  const handlePizzaQuantityChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPizzas = [...formData.comboData.pizzas];
    updatedPizzas[index][name] = parseInt(value);

    setFormData({
      ...formData,
      comboData: { ...formData.comboData, pizzas: updatedPizzas },
    });
  };

  const handleSideDishQuantityChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSideDishes = [...formData.comboData.sideDishes];
    updatedSideDishes[index][name] = parseInt(value);

    setFormData({
      ...formData,
      comboData: { ...formData.comboData, sideDishes: updatedSideDishes },
    });
  };

  const addPizza = () => {
    setFormData({
      ...formData,
      comboData: {
        ...formData.comboData,
        pizzas: [...formData.comboData.pizzas, { _id: '', size: 'S', toppings: 'Topping 1', quantity: 0 }],
      },
    });
  };

  const addSideDish = () => {
    setFormData({
      ...formData,
      comboData: {
        ...formData.comboData,
        sideDishes: [...formData.comboData.sideDishes, { _id: '', quantity: 0 }],
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/combos', formData);

      if (response.status === 201) {
        alert('Combo created successfully!');
      } else {
        alert('Failed to create combo.');
      }
    } catch (error) {
      console.error('Error creating combo:', error);
      alert('An error occurred while creating combo.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="imageUrl"
            type="text"
            placeholder="Image URL"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Pizzas</label>
          {formData.comboData.pizzas.map((pizza, index) => (
            <div key={index}>
              <label className="block text-gray-700 text-sm font-bold mb-2">{`Pizza ${index + 1}`}</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name={`comboData.pizzas[${index}]._id`}
                value={pizza._id}
                onChange={(e) => handlePizzaChange(e, index)}
                required
              >
                <option value="pizza1">Pizza 1</option>
                <option value="pizza2">Pizza 2</option>
              </select>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name={`comboData.pizzas[${index}].size`}
                value={pizza.size}
                onChange={(e) => handlePizzaChange(e, index)}
                required
              >
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </select>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name={`comboData.pizzas[${index}].toppings`}
                value={pizza.toppings}
                onChange={(e) => handlePizzaChange(e, index)}
                required
              >
                <option value="Topping 1">Topping 1</option>
                <option value="Topping 2">Topping 2</option>
              </select>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                type="number"
                name={`comboData.pizzas[${index}].quantity`}
                value={formData.comboData.pizzas[index].quantity}
                onChange={(e) => handlePizzaQuantityChange(e, index)}
                placeholder="Quantity"
                required
              />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={addPizza}
          >
            Add Pizza
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Side Dishes</label>
          {formData.comboData.sideDishes.map((sideDish, index) => (
            <div key={index}>
              <label className="block text-gray-700 text-sm font-bold mb-2">{`Side Dish ${index + 1}`}</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name={`comboData.sideDishes[${index}]._id`}
                value={sideDish._id}
                onChange={(e) => handleSideDishChange(e, index)}
                required
              >
                <option value="sideDish1">Side Dish 1</option>
                <option value="sideDish2">Side Dish 2</option>
              </select>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                type="number"
                name={`comboData.sideDishes[${index}].quantity`}
                value={formData.comboData.sideDishes[index].quantity}
                onChange={(e) => handleSideDishQuantityChange(e, index)}
                placeholder="Quantity"
                required
              />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={addSideDish}
          >
            Add Side Dish
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            min="0"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderCount">
            Order Count
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="orderCount"
            type="number"
            min="0"
            placeholder="Order Count"
            value={formData.orderCount}
            onChange={(e) => setFormData({ ...formData, orderCount: parseInt(e.target.value) })}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Combo
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tab5;


