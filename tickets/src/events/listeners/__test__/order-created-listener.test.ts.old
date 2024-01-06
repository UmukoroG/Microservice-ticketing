import { OrderCreatedListener } from '../order-created-listeners';
import { natsWrapper } from '../../../nats-wrapper';
import { orderCreatedEvent } from '@umukorog-tickets/common';
import mongoose from 'mongoose';
import { orderStatus } from '@umukorog-tickets/common';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
    // create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client);
    
    //create and save a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'alskdfj',
    });

    const data: orderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        // version: 0,
        status: orderStatus.Created,
        userId: ticket.userId,
        expiresAt: 'alskdjf',
        ticket: {
          id: ticket.id,
          price: ticket.price,
        },
      };
    
    // create a fake message object
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };
    
    return { listener, data, msg, ticket };
};


it('sets the userId of the ticket', async () => {
    const { listener, ticket, data, msg } = await setup();
    
    await listener.onMessage(data, msg);
    
    const updatedTicket = await Ticket.findById(ticket.id);
    
    expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();
    
    await listener.onMessage(data, msg);
    
    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
    const { listener, data, ticket, msg } = await setup();
    
    await listener.onMessage(data, msg);
    
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    
    const ticketUpdatedData = JSON.parse(
        (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );
    console.log(ticketUpdatedData);
    expect(data.id).toEqual(ticketUpdatedData.orderId);
});