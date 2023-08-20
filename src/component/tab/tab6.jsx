import axios from 'axios';
import { useState, useEffect } from 'react';
import EachOrder from '../eachorder';

const Tab6 = () => {
  const [listOrders, setListOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/orders'); // Đường dẫn API đơn hàng
        if (response.status === 200) {
          setListOrders(response.data);
        } else {
          console.error('Lỗi truy vấn từ API');
        }
      } catch (error) {
        console.error('Lỗi truy vấn từ API', error);
      }
    };
    fetchData();
  }, []);

  const handleConfirm = async (orderId, newStatus) => {
    try {
      // Gọi API để cập nhật trạng thái của đơn hàng thành newStatus trong cơ sở dữ liệu
      const res = await axios.put(`/orders/${orderId}`, { status: newStatus });
      if (res.status === 200) {
        // Cập nhật trạng thái của đơn hàng trong danh sách hiển thị
        const updatedOrders = listOrders.map((order) => {
          if (order._id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        setListOrders(updatedOrders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!listOrders) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {listOrders.map((each, index) => (
        // Kiểm tra nếu có sản phẩm và giá trị
        (each.items.pizzas.length > 0 ||
          each.items.sideDishes.length > 0 ||
          each.items.combos.length > 0) && (
          <EachOrder
            data={each}
            key={index}
            onConfirm={handleConfirm}
          />
        )
      ))}
    </div>
  );
};

export default Tab6;






















