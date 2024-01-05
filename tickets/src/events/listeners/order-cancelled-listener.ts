import {Listener, orderCancelledEvent, Subjects} from '@umukorog-tickets/common';
import {Message} from 'node-nats-streaming';
import {Ticket} from '../../models/ticket';
import {queueGroupName} from './queue-group-name';
import {TicketUpdatedPublisher} from '../publishers/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<orderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: orderCancelledEvent['data'], msg: Message){
        // Find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);

        // If no ticket, throw error
        if(!ticket){
            throw new Error('Ticket not found');
        }

        // Mark the ticket as being reserved by setting its orderId property
        ticket.set({orderId: undefined});

        // Save the ticket
        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket.orderId,
            userId: ticket.userId,
            price: ticket.price,
            title: ticket.title,
            // version: ticket.version,
        });

        // Publish an event saying this ticket was updated
        msg.ack();
    }
}