import mongoose from "mongoose";
import { Order, orderStatus } from './orders';
import { updateIfCurrentPlugin } from "mongoose-update-if-current";


interface TicketAttrs {
    id: string;
    title: string;
    price: number;
    // version: number;

}

export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    // version: number;
    isReserved(): Promise<boolean>;//this is a function that returns a promise that resolves to a boolean
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
    findByEvent(event: { id: string, version: number }): Promise<TicketDoc | null>;
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

// ticketSchema.set('versionKey', 'version');//this is to change the version key from __v to version
// ticketSchema.plugin(updateIfCurrentPlugin);//this is to change the version key from __v to version

ticketSchema.statics.findByEvent = (event: { id: string, version: number }) => {
    return Ticket.findOne({
        _id: event.id,
        // version: event.version - 1//this is to find the ticket with the given id and version
    })//this is to find the ticket with the given id and version
}
ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket({
        _id: attrs.id,//this is to make sure that the ticket id is the same as the order id
        title: attrs.title,
        price: attrs.price
    });
}
ticketSchema.methods.isReserved = async function() {
    //this is a function that returns a promise that resolves to a boolean

    // Make sure that this ticket is not already reserved
    // Run query to look at all orders. Find an order where the ticket
    // is the ticket we just found *and* the orders status is *not* cancelled.
    // If we find an order from that means the ticket *is* reserved
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [//$in is a mongo operator means that the status is either one of the following
                orderStatus.Created,
                orderStatus.AwaitingPayment,
                orderStatus.Complete
            ]
        }
    });

    return !!existingOrder;//this returns true if existingOrder is not null and false if it is null
};


const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };