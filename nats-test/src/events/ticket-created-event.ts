import { Subjects } from "./subjects";


// This interface is used to describe the properties that a TicketCreatedEvent will have
export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
    };
}