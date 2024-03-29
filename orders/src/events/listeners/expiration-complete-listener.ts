import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/orders";
import { orderStatus }  from "@umukorog-tickets/common";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { natsWrapper } from "../../nats-wrapper";
import { Listener, Subjects, ExpirationCompleteEvent }  from "@umukorog-tickets/common";

export class expirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;
    
    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message){
        const order = await Order.findById(data.orderId).populate('ticket');

        if(!order){
            throw new Error('Order not found');
        }
        
        if(order.status === orderStatus.Complete){
            return msg.ack();
        }

        order.set({
            status: orderStatus.Cancelled,
        });
        await order.save();
        await new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            // version: order.version,
            ticket: {
                id: order.ticket.id
            }
        });
        msg.ack();
    };
}