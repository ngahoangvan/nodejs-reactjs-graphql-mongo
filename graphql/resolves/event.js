const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');
const { transformEvent } = require('./merge');


module.exports = {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: '5dad5e344beb0e004ea62066'
    });
    let createdEvent;
    try {
      const creator = await User.findById('5dad5e344beb0e004ea62066')
      if (!creator) {
        throw new Error('User not found.');
      }
      const result = await event.save()
      createdEvent = transformEvent(result);
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (error) {
      throw error
    }
  },
  deleteEvent: async args => {
    try {
      const event = await Event.findById({ _id: args.eventId });
      console.log(event);
      await Event.deleteOne({ _id: args.eventId });
      return transformEvent(event)
    } catch (error) {
      throw error
    }
  }
}