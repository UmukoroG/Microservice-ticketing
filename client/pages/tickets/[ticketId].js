import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <div className="my-40 text-center bg-white content-center mx-auto rounded-lg max-w-sm">
      <h1 className='my-2'>{ticket.title} - ${ticket.price}</h1>
      {errors}
      <button onClick={() => doRequest()} className="btn my-3 bg-blue-400 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300">
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
