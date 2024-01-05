import {Listener, Subjects, orderCreatedEvent, orderStatus, NotFoundError} from '@umukorog-tickets/common'; 
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import {Ticket} from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class OrderCreatedListener extends Listener<orderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
  
    async onMessage(data: orderCreatedEvent['data'], msg: Message) {
      // Find the ticket that the order is reserving
      const ticket = await Ticket.findById(data.ticket.id);
  
      // If no ticket, throw error
      if (!ticket) {
        throw new Error('Ticket not found');
      }

      // Mark the ticket as being reserved by setting its orderId property
      ticket.set({ orderId: data.id });
  
      // Save the ticket
      await ticket.save();
      // await new TicketUpdatedPublisher(this.client).publish({
      await new TicketUpdatedPublisher(natsWrapper.client).publish({
          id: ticket.id,
          // version: ticket.version,
          title: ticket.title,
          price: ticket.price,
          userId: ticket.userId,
          orderId: ticket.orderId
      });
  
      // ack the message
      msg.ack();
    }
  }