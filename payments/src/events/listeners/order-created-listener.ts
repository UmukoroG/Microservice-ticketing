import { Listener, orderCreatedEvent, Subjects }  from "@umukorog-tickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../model/order";

export class orderCreatedListener extends Listener<orderCreatedEvent> {
    readonly subject = Subjects.OrderCreated
    queueGroupName = queueGroupName;

    async onMessage(data: orderCreatedEvent["data"], msg: Message) {
        const order = Order.build({
            id: data.id,
            price: data.ticket.price,
            status: data.status,
            userId: data.userId
        })
        await order.save();
    }
}