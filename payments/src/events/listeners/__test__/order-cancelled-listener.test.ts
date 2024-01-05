import { orderCancelledListener } from "../order-cancelled-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { Order } from "../../../model/order";
import { orderStatus, orderCancelledEvent } from "@umukorog-tickets/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new orderCancelledListener(natsWrapper.client);

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 10,
        status: orderStatus.Created,
        userId: "alskdjf",
        // version: 0
    });

    await order.save();

    const data : orderCancelledEvent["data"] = {
        id: order.id,
        // version: 1,
        ticket: {
            id: "alskdjf"
        }
    }

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg, order };
}

it("updates the status of the order", async () => {
    const { listener, data, msg, order } = await setup();
    await listener.onMessage(data, msg);
    const updatedOrder = await Order.findById(data.id);
    expect(updatedOrder!.status).toEqual(orderStatus.Cancelled);
});

it("acks the message", async () => {
    const { listener, data, msg, order } = await setup();
    await listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});