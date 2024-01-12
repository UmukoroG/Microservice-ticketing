import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async event => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className='my-40 dark:bg-gray-800 mx-auto m rounded-lg max-w-prose'>
      <div className='px-6 py-4'>
        <form onSubmit={onSubmit}>
          <h1 className='mt-1 text-center dark:text-zinc-200'>Sign In</h1>
          <div className="w-full mt-4">
            <label className='text-zinc-200'>Email Address</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="w-full mt-4">
            <label className='text-zinc-200'>Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {errors}
          <div className='flex items-center justify-between mt-4'>
            <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
