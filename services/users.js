const mongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new mongoLib();
  }
  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }
  async createUser({ user }) {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password);
    const createdUser = this.mongoDB.create(this.collection, {
      name,
      email,
      hashedPassword
    });
    return createdUser;
  }
}

module.exports = UsersService;