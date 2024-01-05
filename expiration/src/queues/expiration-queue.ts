import Queue from "bull";
import { expirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats-wrapper";

interface Payload {//this is the data that will be sent to the queue
    orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
    redis: {//tell bull where to connect to redis
        host: process.env.REDIS_HOST,
    },
});

expirationQueue.process(async (job) => {//this is the function that will be executed when a job is processed
    // console.log(
    //     "I want to publish an expiration:complete event for orderId", 
    //     job.data.orderId
    // );
    
    new expirationCompletePublisher(natsWrapper.client).publish({
        orderId: job.data.orderId,
    });
});

export { expirationQueue };