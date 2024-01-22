import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';
import { orderCreatedListener } from './events/listeners/order-created-listener';
import { orderCancelledListener } from './events/listeners/order-cancelled-listener';
// import { PaymentCreatedListener } from './events/listeners/payment-created-listener';

import { app } from './app';

const start = async () => {
  console.log('Starting up payments service.......');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  try {
    await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID,
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());//interrupt //this is to close the client when the program is terminated
    process.on('SIGTERM', () => natsWrapper.client.close());//terminate //this is to close the client when the program is terminated
    
    new orderCreatedListener(natsWrapper.client).listen();
    new orderCancelledListener(natsWrapper.client).listen();
    // new PaymentCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to payments MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
