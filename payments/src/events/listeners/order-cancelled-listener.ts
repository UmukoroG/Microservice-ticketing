import { orderCancelledEvent, Subjects, Listener }  from "@umukorog-tickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../model/order";
import { orderStatus }  from "@umukorog-tickets/common";


export class orderCancelledListener extends Listener<orderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: orderCancelledEvent["data"], msg: Message) {
        const order = await Order.findOne({
            _id: data.id,
            // version: data.version - 1
        })

        if(!order) {
            throw new Error("Order not found");
        }

        order.set({ status: orderStatus.Cancelled });
        await order.save();

        msg.ack();//acknowledge the message to NATS streaming server
    }
}