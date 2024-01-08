import { natsWrapper } from "../../../nats-wrapper";
import { orderCreatedListener } from "../order-created-listener";
import { orderCreatedEvent,orderStatus }from "@umukorog-tickets/common";
import { Order } from "../../../model/order";


import mongoose from "mongoose";
const setup = async () => {
    const listener = new orderCreatedListener(natsWrapper.client);

    const data: orderCreatedEvent["data"] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        // version: 0,
        expiresAt: "alskdjf",
        userId: "alskdjf",
        status: orderStatus.Created,
        ticket: {
            id: "alskdjf",
            price: 10
        }
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg };
};

it("replicates the order info", async () => {
    const { listener, data, msg } = await setup();
    await listener.onMessage(data, msg);
    const order = await Order.findById(data.id);
    expect(order!.price).toEqual(data.ticket.price);
});

// it("acks the message", async () => {
//     const { listener, data, msg } = await setup();
//     await listener.onMessage(data, msg);
//     expect(msg.ack).toHaveBeenCalled();
// });

