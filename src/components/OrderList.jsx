import React, { useEffect, useState } from 'react';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="p-8 flex-1">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-blue-900 font-semibold">
              <th className="px-4 py-2">Номер заказа</th>
              <th className="px-4 py-2">Дата</th>
              <th className="px-4 text-center py-2 ">Предметов</th>
              <th className="px-4 text-center py-2">Сумма</th>
              <th className="px-4 text-center py-2">Доставлено</th>
              <th className="px-4 text-center py-2">Оплачено</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const totalItems = order.cart.length;
              const totalPrice = order.cart.reduce(
                (sum, item) => sum + item.price,
                0
              ).toFixed(0);

              return (
                <tr
                  key={order.orderId}
                  className="w-full border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-blue-900 cursor-pointer no-underline">
                    {order.orderId.slice(0, 20)}
                  </td>
                  <td className="px-4 py-3 flex items-center lowercase gap-2">{order.orderedDay}<span className='mx-2'>{order.month}</span>{order.year}</td>
                  <td className="px-4  py-3 text-center">{totalItems}</td>
                  <td className="px-4 text-center py-3">{totalPrice} ₽</td>
                  <td className="px-4 flex justify-center py-3">
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded ${
                        order.delivered ? 'bg-red-600 text-white' : 'bg-gray-200'
                      }`}
                    >
                      {order.delivered ? '✓' : ''}
                    </div>
                  </td>
                  <td className="px-0 py-3 self-center ">
                    <div className="mx-auto w-6 h-6 flex items-center justify-center rounded bg-red-600 text-white self-center">
                      ✔️
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
