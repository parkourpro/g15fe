// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';

// const Tab7 = () => {
//   const today = new Date();
//   const currentDay = today.getDate();
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [pendingOrdersCount, setPendingOrdersCount] = useState(0);

//   useEffect(() => {
//     axios.get('/orders/')
//       .then((response) => {
//         const paidOrders = response.data.filter((order) => order.status === 'paid');
//         const todayIncome = paidOrders.reduce((total, order) => total + order.totalPrice, 0);
//         setTotalIncome(todayIncome);
//       })
//       .catch((error) => {
//         console.error('Error fetching orders:', error);
//       });

//     axios.get('/orders/')
//       .then((response) => {
//         const allOrders = response.data;
//         const pendingCount = allOrders.filter((order) => order.status === 'pending').length;
//         setPendingOrdersCount(pendingCount);
//       })
//       .catch((error) => {
//         console.error('Error fetching orders:', error);
//       });
//   }, []);

//   // Dữ liệu cho biểu đồ đường
//   const chartData = {
//     labels: [currentDay - 2, currentDay - 1, currentDay, currentDay + 1, currentDay + 2],
//     datasets: [
//       {
//         label: 'Số Đơn Hàng',
//         data: [10, 15, pendingOrdersCount, 8, 12], // Số đơn hàng tương ứng với từng ngày
//         fill: false, // Không tô màu dưới đường
//         borderColor: 'rgba(75, 192, 192, 1)', // Màu của đường
//         borderWidth: 2, // Độ rộng của đường
//         pointRadius: 5, // Kích thước của điểm trên đường
//         pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Màu của điểm
//       },
//     ],
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <h2 className="text-2xl font-semibold mb-4">Thống kê Thu nhập</h2>

//       {/* Tổng số tiền thu nhập */}
//       <div className="bg-white rounded-lg p-4 mb-4 shadow">
//         <h3 className="text-lg font-semibold">Tổng Thu Nhập Ngày Hôm Nay</h3>
//         <p className="text-3xl font-bold text-green-600">${totalIncome}</p>
//       </div>

//       {/* Biểu đồ đường */}
//       <div className="bg-white rounded-lg p-4 mb-4 shadow">
//         <h3 className="text-lg font-semibold">Biểu đồ Số Đơn Hàng 5 Ngày Gần Đây</h3>
//         <Line
//           data={chartData}
//           options={{
//             scales: {
//               y: {
//                 beginAtZero: true,
//                 stepSize: 1,
//                 ticks: {
//                   // Hiển thị ngày thay vì số
//                   callback: function (value, index, values) {
//                     return index === 2 ? 'Hôm nay' : `Ngày ${value}`;
//                   },
//                 },
//               },
//             },
//           }}
//         />
//       </div>

//       {/* Tổng số đơn hàng đang chờ xử lý */}
//       <div className="bg-white rounded-lg p-4 shadow">
//         <h3 className="text-lg font-semibold">Số Đơn Hàng Chờ Xử Lý</h3>
//         <p className="text-2xl font-bold text-red-600">{pendingOrdersCount} đơn hàng</p>
//       </div>
//     </div>
//   );
// }

// export default Tab7;


import React from 'react';

const Tab7 = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const data = {
    labels: [currentDay - 2, currentDay - 1, currentDay, currentDay + 1, currentDay + 2], // Hiển thị 5 ngày (2 ngày trước, hôm nay, 2 ngày sau)
    datasets: [
      {
        label: 'Doanh Thu (USD)',
        data: [5000, 6500, 7000, 5500, 8000], // Dữ liệu doanh thu tương ứng với từng ngày
      },
    ],
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Thống kê Thu nhập</h2>

      {/* Tổng số tiền thu nhập */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow">
        <h3 className="text-lg font-semibold">Tổng Thu Nhập Ngày Hôm Nay</h3>
        <p className="text-3xl font-bold text-green-600">$7,000</p> {/* Thay đổi số liệu tương ứng với ngày hôm nay */}
      </div>

      {/* Biểu đồ cột Doanh thu */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow">
        <h3 className="text-lg font-semibold">Biểu đồ Doanh Thu 5 Ngày Gần Đây</h3>
        <div className="w-full h-64 bg-blue-200 rounded-lg p-4">
          <div className="flex justify-between">
            {data.labels.map((label, index) => (
              <div key={index} className="w-1/5 text-center">
                <div className="mb-2 text-gray-600">{label === currentDay ? 'Hôm nay' : `Ngày ${label}`}</div>
                <div className="h-3 bg-blue-500" style={{ width: `${data.datasets[0].data[index] / 80}%` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tổng số đơn hàng đang chờ xử lý */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold">Số Đơn Hàng Chờ Xử Lý</h3>
        <p className="text-2xl font-bold text-red-600">15 đơn hàng</p>
      </div>
    </div>
  );
}

export default Tab7;



