const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transformEvent, transformBooking } = require('./merge');


module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error
    }
  },
  bookEvent: async args => {
    try {
      const fetchEvent = await Event.findOne({ _id: args.eventId });
      const booking = new Booking({
        user: '5dad5e344beb0e004ea62066',
        event: fetchEvent
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (error) {
      throw error
    }
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById({ _id: args.bookingId }).populate('event');
      const event = transformEvent(booking._doc.event)
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (error) {
      throw error
    }
  }
}