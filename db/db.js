const Ticket = require('../models/Ticket');

class MyDB{
  constructor(){
    this.tickets = [];
  }
  /**
   * create and save a new ticket
   * @param {string} username 
   * @param {number} price 
   * @returns{Ticket} return a ticket class
   */
  Create(username, price){
    
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  }

  /**
   * Sel bulk ticket
   * @param {string} username 
   * @param {number} price 
   * @param {number} quantity 
   * @returns {Array<Ticket>}
   */
  bulkCreate(username, price, quantity){
    const result = [];
    for(let i=0; i<quantity; i++){
      const ticket = this.Create(username, price);
      result.push(ticket);
    }
    return result;
  }
  
  /**
   * Return all available tickets
   */
  find(){
    return this.tickets;
  }

  /**
   * find ticket by ticket id
   * @param {string} ticketId 
   * @returns {Ticket} Ticket
   */
  findById(ticketId){
    const ticket = this.tickets.find(
      /**
       * @param {Ticket} ticketItem 
       */
      (ticketItem)=>{
        return ticketId==ticketItem.id;
      }
      // (ticketItem)=>ticketId==ticketItem.id
    );
    return ticket;
  }

  /**
   * Find all the tickets of an user
   * @param {string} username 
   * @returns{Array<Ticket>}
   */
  findByUsername(username){
    const tickets = this.tickets.filter(
      /**
       * @param {Ticket} ticket 
       * @returns Array<Ticket>
       */
      (ticket) => ticket.username===username
    );
    return tickets;
  }

  /**
   * Update ticket info
   * @param {string} ticketId 
   * @param {{username:string, price:number}} ticketBody 
   */
  updateById(ticketId, ticketBody){
    const ticket = this.findById(ticketId);
    ticket.username = ticketBody.username?? ticket.username;
    ticket.price = ticketBody.price?? ticket.price;
    ticket.updatedAt = new Date();

    return ticket;
  }

  /**
   * Delete ticket
   * @param {string} ticketId 
   */
  deleteById(ticketId){
    const index = this.tickets.findIndex((ticket)=>ticket.id===ticketId);
    if(index!==-1){
      this.tickets.splice(index,1);
      return true;
    } else{
      return false;
    }
  }

  /**
   * Finally find winner
   * @param {number} winnerCount 
   * @returns {Array<Ticket>}
   */
  draw(winnerCount){
    let indexes = new Array(winnerCount);
    for(let i=0; i<winnerCount; i++){
      let index = Math.floor(Math.random()*this.tickets.length);
      while(indexes.includes(index)){
        index = Math.floor(Math.random()*this.tickets.length)
      }
      indexes[i] = index;
    }
    const winners = indexes.map((index)=>this.tickets[index]);
    return winners;
  }
}

const myDB = new MyDB();
module.exports = myDB;