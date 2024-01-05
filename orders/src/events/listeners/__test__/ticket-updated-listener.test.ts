import { TicketUpdatedListener } from "../ticket-updated-listener";
import { TicketUpdatedEvent } from "@umukorog-tickets/common";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from 'mongoose';
import { Ticket } from "../../../models/ticket";

const setup = async () => { 
    //create an instance of the listener
    const listener = new TicketUpdatedListener(natsWrapper.client);
    
    //create and save a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    await ticket.save();
    
    //create a fake data event
    const data : TicketUpdatedEvent['data']={
        // version: ticket.version + 1,
        id: ticket.id,
        title: 'new concert',
        price: 999,
        userId: 'ablskdjf'
    }

    //create a fake message object
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {listener, ticket, data, msg};
}

it("finds, updates and saves a ticket", async () => {
    const {listener, ticket, data, msg} = await setup();
    
    //call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);

    //write assertions to make sure a ticket was created
    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket).toBeDefined();
    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
});

it("acks the message", async () => {
    const {listener, data, msg} = await setup();
    //call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);
    //write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();
});

// it("does not call ack if the event has a skipped version number", async () => {
//     const {listener, data, msg} = await setup();
//     data.version = 10;
//     try{
//         await listener.onMessage(data, msg);
//     }catch(err){}
//     expect(msg.ack).not.toHaveBeenCalled();
// });