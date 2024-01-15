import EmptyOrderCard from "../../components/empty-order-card";

const OrderIndex = ({ orders }) => {

  return (
    <div className="my-4 text-center bg-slate-400 content-center  rounded-lg max-w-sm">
      <ul>
        {
          orders.length === 0 ? <EmptyOrderCard /> : 
          orders.map(order => {
            return (
              <li key={order.id}>
                {order.ticket.title} - {order.status}
              </li>
            )
          })
        }
    </ul>

    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
