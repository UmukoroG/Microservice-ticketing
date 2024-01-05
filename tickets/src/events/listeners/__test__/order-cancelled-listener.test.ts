import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { orderCancelledEvent } from '@umukorog-tickets/common';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
    // create an instance of the listener
    const listener = new OrderCancelledListener(natsWrapper.client);
    
    //create and save a ticket
    const orderId = new mongoose.Types.ObjectId().toHexString();
    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'alskdfj',
    });
    ticket.set({orderId});
    await ticket.save();

    const data: orderCancelledEvent['data'] = {
        id: orderId,
        // version: 0,
        ticket: {
          id: ticket.id,
        },
      };
    
    // create a fake message object
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };
    
    return { listener, data, msg, ticket };
};

it('updates the ticket, publishes an event, and acks the message', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});