import Link from 'next/link';


const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr className='text-neutral-600' key={ticket.id}>
        <td className='text-center py-1'>{ticket.title}</td>
        <td className='text-center py-1'>${ticket.price}</td>
        <td className='text-center py-1'>
            <Link className='hover:text-red-300 active:text-red-300' href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
              View
            </Link>
        </td>
      </tr>
    );
  });

  const noTickets = (
    <tr>
      <td colSpan="3">No tickets available</td>
    </tr>
  );

  return (
    <div className='mt-8'>
      <h1 className='text-center text-2xl my-8 font-bold font-serif'>Available Tickets</h1>
      <div className='relative overflow-x-auto'>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr className='text-slate-50'>
              <th className='px-6 py-3 text-center'>Title</th>
              <th className='px-6 py-3 text-center'>Price</th>
              <th className='px-6 py-3 text-center'>Link</th>
            </tr>
          </thead>
          <tbody>
            { 
              ticketList.length > 0 ? ticketList : noTickets
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
