import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear(); //remove the nats logs from the terminal

//stan is the client
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'//this is the url of the nats-depl pod
});

//when stan successfully connects to the nats streaming server, 
// it will emit an event called connect    
 stan.on('connect', async () => {
    console.log('publisher connected to nats')
    
    const publisher = new TicketCreatedPublisher(stan);
    try {
        await publisher.publish({
            id: '123',
            title: 'concert',
            price: 20
        });
    } catch (error) {
        console.log(error)
    }
    
    //we need to convert the data to json string before we can publish it to the nat server
    // const data = JSON.stringify({
    //     id: '123',
    //     title: 'concert',
    //     price: 20
    // });
    // //publish the data to the nats server; 
    // stan.publish('ticket:created', data, () => {//ticket:created is the channel name, ticket is the channel and created is the event    
    //     console.log('event published')
    // })
 })