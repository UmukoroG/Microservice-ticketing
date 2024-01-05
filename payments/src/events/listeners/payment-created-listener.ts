// import { Subjects, Listener, PaymentCreatedEvent } from "@umukorog-tickets/common";
// import {queueGroupName } from "./queue-group-name";
// import { Order } from "../../model/order";
// import { Message } from "node-nats-streaming";
// import { orderStatus } from "@umukorog-tickets/common";

// export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
//     subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
//     queueGroupName = queueGroupName;

//     async onMessage(data: PaymentCreatedEvent['data'], msg: Message){
//         const order = await Order.findById(data.orderId);

//         if(!order){
//             throw new Error('Order not found');
//         }

//         order.set({
//             status: orderStatus.Complete
//         });

//         await order.save();

//         msg.ack();
//     }
// }