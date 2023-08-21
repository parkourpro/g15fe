import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Tab7() {
  const [totalIn2daysAhead, setTotalIn2daysAhead] = useState(0);
  const [totalInTomorrow, setTotalInTomorrow] = useState(0);
  const [totalInToday, setTotalInToday] = useState(0);
  const [totalInYesterday, setTotalInYesterday] = useState(0);
  const [totalIn2dayago, setTotalIn2dayago] = useState(0);
  const [totalIn3daysAgo, setTotalIn3daysAgo] = useState(0);
  const [totalIn4daysAgo, setTotalIn4daysAgo] = useState(0);
  const [TotalInMonth, setTotalInMonth] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);

  useEffect(() => {

    axios.get('/orders/')
    .then((response) => {
      const paidOrdersInMonth = response.data.filter((order) => {
        // Lọc các đơn hàng có status là 'paid' và updatedAt chứa '2023-08'
        return order.status === 'paid' && order.updatedAt.includes('2023-08');
      });
      
      // Tính tổng thu nhập từ những đơn hàng đã lọc ra
      const totalIncomeInMonth = paidOrdersInMonth.reduce((total, order) => total + order.totalPrice, 0);
      
      // Đặt giá trị totalIncomeInMonth vào state hoặc nơi bạn cần nó
      setTotalInMonth(totalIncomeInMonth);
    })
    .catch((error) => {
      console.error('Error fetching orders:', error);
    });


    // Tính tổng thu nhập của 2 ngày hôm sau
    axios.get('/orders/')
      .then((response) => {
        const twoDaysAhead = new Date();
        twoDaysAhead.setDate(twoDaysAhead.getDate() + 2); // Ngày hôm sau sau ngày hôm sau
        const formattedDate = twoDaysAhead.toISOString().split('T')[0];

        const paidOrders = response.data.filter((order) => {
          return order.status === 'paid' && order.updatedAt.includes(formattedDate);
        });

        const twoDaysAheadIncome = paidOrders.reduce((total, order) => total + order.totalPrice, 0);
        setTotalIn2daysAhead(twoDaysAheadIncome);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });


    // Tính tổng thu nhập ngày hôm sau
    axios.get('/orders/')
      .then((response) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // Ngày hôm sau
        const formattedDate = tomorrow.toISOString().split('T')[0];

        const paidOrders = response.data.filter((order) => {
          return order.status === 'paid' && order.updatedAt.includes(formattedDate);
        });

        const tomorrowIncome = paidOrders.reduce((total, order) => total + order.totalPrice, 0);
        setTotalInTomorrow(tomorrowIncome);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });


    // Tính tổng thu nhập ngày hôm nay
    axios.get('/orders/')
      .then((response) => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const paidOrders = response.data.filter((order) => {
          return order.status === 'paid' && order.updatedAt.includes(formattedDate);
        });

        const todayIncome = paidOrders.reduce((total, order) => total + order.totalPrice, 0);
        setTotalInToday(todayIncome);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });

    // Tính tổng thu nhập ngày hôm trước (ngày hôm qua)
    axios.get('/orders/')
      .then((response) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const formattedDate = yesterday.toISOString().split('T')[0];

        const paidOrders = response.data.filter((order) => {
          return order.status === 'paid' && order.updatedAt.includes(formattedDate);
        });

        const yesterdayIncome = paidOrders.reduce((total, order) => total + order.totalPrice, 0);
        setTotalInYesterday(yesterdayIncome);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });

    axios.get('/orders/')
      .then((response) => {
        // Tính ngày trước hôm nay 2 ngày
        const today = new Date();
        today.setDate(today.getDate() - 2);
        const formattedDate = today.toISOString().split('T')[0];

        const paidOrders = response.data.filter((order) => {
          return order.status === 'paid' && order.updatedAt.includes(formattedDate);
        });

        const todayIncome = paidOrders.reduce((total, order) => total + order.totalPrice, 0);
        setTotalIn2dayago(todayIncome);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });

    // Tính tổng thu nhập 3 ngày hôm trước
    axios.get('/orders/')
      .then((response) => {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        const formattedDate = threeDaysAgo.toISOString().split('T')[0];

        const paidOrders = response.data.filter((order) => {
          return order.status === 'paid' && order.updatedAt.includes(formattedDate);
        });

        const threeDaysAgoIncome = paidOrders.reduce((total, order) => total + order.totalPrice, 0);
        setTotalIn3daysAgo(threeDaysAgoIncome);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });


    // Tính tổng thu nhập 4 ngày hôm trước
    axios.get('/orders/')
      .then((response) => {
        const fourDaysAgo = new Date();
        fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
        const formattedDate = fourDaysAgo.toISOString().split('T')[0];

        const paidOrders = response.data.filter((order) => {
          return order.status === 'paid' && order.updatedAt.includes(formattedDate);
        });

        const fourDaysAgoIncome = paidOrders.reduce((total, order) => total + order.totalPrice, 0);
        setTotalIn4daysAgo(fourDaysAgoIncome);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });

    axios.get('/orders/')
      .then((response) => {
        const allOrders = response.data;
        const pendingCount = allOrders.filter((order) => order.status === 'pending').length;
        setPendingOrdersCount(pendingCount);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const options = {
    animationEnabled: true,
    title: {
      text: "Doanh Số Bán Hàng Trong Tháng",
    },
    axisX: {
      valueFormatString: "DD/MM/YYYY",
    },
    axisY: {
      title: "Doanh số (VND)",
      prefix: "₫",
    },
    data: [
      {
        yValueFormatString: "₫#,###",
        xValueFormatString: "DD/MM/YYYY",
        type: "spline",
        dataPoints: [
          { x: new Date().setDate(new Date().getDate() - 4), y: totalIn4daysAgo },
          { x: new Date().setDate(new Date().getDate() - 3), y: totalIn3daysAgo },
          { x: new Date().setDate(new Date().getDate() - 2), y: totalIn2dayago}, // Sử dụng state để hiển thị tổng số tiền của các đơn hàng "paid" trong ngày
          { x: new Date().setDate(new Date().getDate() - 1), y: totalInYesterday }, // Hiển thị thu nhập ngày hôm nay
          { x: new Date(), y: totalInToday },
          { x: new Date().setDate(new Date().getDate() + 1), y: totalInTomorrow },
          { x: new Date().setDate(new Date().getDate() + 2), y: totalIn2daysAhead },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto">
      {/* <h2 className="text-2xl font-semibold mb-4">Thống kê Thu nhập</h2> */}

      <div className="bg-white p-4 shadow">
        {/* Biểu đồ */}
        <div className="w-full h-400">
          <CanvasJSChart options={options} />
        </div>
      </div>

      {/* Thu nhập tháng này */}
      <div className="bg-white p-4 shadow">
        <h3 className="text-lg font-semibold">Tổng Thu Nhập Tháng Này</h3>
        <p className="text-3xl font-bold text-green-600">{TotalInMonth}₫</p>
      </div>

      {/* Thu nhập ngày hôm nay */}
      <div className="bg-white p-4 shadow">
        <h3 className="text-lg font-semibold">Tổng Thu Nhập Ngày Hôm Nay</h3>
        <p className="text-3xl font-bold text-green-600">{totalInToday}₫</p>
      </div>

      {/* Tổng số đơn hàng đang chờ xử lý */}
      <div className="bg-white p-4 shadow">
        <h3 className="text-lg font-semibold">Số Đơn Hàng Chờ Xử Lý</h3>
        <p className="text-2xl font-bold text-red-600">{pendingOrdersCount} đơn hàng</p>
      </div>
    </div>
  );
}

export default Tab7;
















