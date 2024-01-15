const EmptyOrderCard = () => {
  return (
    <div className="my-40 text-center bg-slate-400 content-center mx-auto rounded-lg max-w-sm">
        <div class="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-slate-300 dark:text-slate">No order in the list</h5>
            <p class="font-normal text-slate-700 dark:text-slate-400">Add a ticket to see them here.</p>
        </div>
    </div>
  );
};

export default EmptyOrderCard;
