const bcrypt = require('bcryptjs');
const User = require('../..//models/user');


module.exports = {
  createUser: async args => {
    try {
      const user = await User.findOne({ email: args.userInput.email });
      if (user) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await newUser.save()
      return { ...result._doc, _id: result.id, password: null };
    } catch (error) {
      throw error;
    }
  },
  login: async args => {
    try {
      const user = await User.findOne({ email: args.email });
      if (user) {
        throw new Error('User exists already');
      }
      console.log("User is not created");

    } catch (error) {
      throw error;
    }
  }
}