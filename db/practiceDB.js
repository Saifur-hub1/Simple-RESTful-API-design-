const Ticket = require('../models/Ticket');

class MyDB{
  constructor(){
    this.tickets = [];
  }

  /**
   * Create and Save new ticket
   * @param {string} username 
   * @param {number} price 
   */
  Create(username, price){
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  }

  /**
   * 
   * @param {string} username 
   * @param {number} price 
   * @param {number} quantity 
   * @returns {Array<Ticket>}
   */
  bulkCreate(username, price, quantity){
    const result = [];
    for(let i=0; i<quantity; i++){
      const ticket = this.Create(username);
      result.push(ticket);
    }
    return result;
  }

  /**
   * Return all available tickets
   * @returns {Array<Ticket>}
   */
  find(){
    return this.tickets;
  }
  
  /**
   * 
   * @param {string} ticketId 
   * @returns {Ticket}
   */
  findById(ticketId){
    const ticket = this.tickets.find(
      /**
       * 
       * @param {Ticket} ticketItem 
       */
      (ticketItem)=>{
        return ticketId== ticketItem.id;
      }
    );
    return ticket
  }

  /**
   * 
   * @param {string} username 
   * @returns {Array<Ticket>}
   */
  findByUsername(username){
    const tickets = this.tickets.filter(
      /**
       * 
       * @param {Ticket} ticket 
       * @returns {Array<Ticket>}
       */
      (ticket)=>{
        return ticket.username== username;
      }
    );
    return tickets;
  }

  /**
   * 
   * @param {string} ticketId 
   * @param {{username:string, price:number}} ticketBody 
   */
  updateById(ticketId, ticketBody){
    const ticket = this.findById(ticketId);
    ticket.username = ticketBody.username ?? ticket.username;
    ticket.price = ticketBody.price ?? ticket.price;
    ticket.updatedAt = new Date();

    return ticket;
  }

  /**
   * 
   * @param {string} ticketId 
   */
  deletebyId(ticketId){
    const index = this.tickets.findIndex((ticket)=>{
      return ticket.id===ticketId;
    });
    if(index !==-1 ){
      this.tickets.splice(index, 1);
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
  Draw(winnerCount){
    let indexes = new Array(winnerCount);
    for(let i=0; i<indexes.length; i++){
      let index = Math.floor(Math.random()*this.tickets.length);
      while(indexes.includes(index)){
        index = Math.floor(Math.random()*this.tickets.length);
      }
      indexes.push(index);
    }
    const winners = indexes.map(
      (index)=>{
        return this.tickets[index];
      }
    );

    return winners
  }
}

const myDB = new MyDB();
module.exports = myDB;