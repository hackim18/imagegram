const { ObjectId } = require("mongodb");
const database = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

class User {
  static collection() {
    return database.collection("users");
  }

  static async login(username, password) {
    const userCollection = this.collection();
    const user = await userCollection.findOne({ username });

    if (!user) {
      throw new GraphQLError("Invalid username or password", {
        extensions: {
          code: "UNAUTHORIZED",
        },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new GraphQLError("Invalid username or password", {
        extensions: {
          code: "UNAUTHORIZED",
        },
      });
    }

    const access_token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    return {
      access_token,
      _id: user._id,
      email: user.email,
    };
  }

  static async findAll() {
    const userCollection = this.collection();
    const data = await userCollection.find({}).toArray();
    return data;
  }

  static async findById(_id) {
    const userCollection = this.collection();
    const data = await userCollection.findOne({ _id: new ObjectId(_id) });
    return data;
  }

  static async findByEmail(email) {
    const userCollection = this.collection();
    const data = await userCollection.findOne({ email: email });
    return data;
  }
  static async getUser(username) {
    const userCollection = this.collection();
    const user = await userCollection.findOne({ username });
    return user;
  }

  static async createUser(newUser) {
    const userCollection = this.collection();

    const data = await userCollection.insertOne({
      ...newUser,
      password: bcrypt.hashSync(newUser.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(data);
    const output = this.findById(data.insertedId);
    return output;
  }

  static async searchByUsernameOrName(search) {
    const userCollection = this.collection();
    const regex = new RegExp(search, "i");
    const data = await userCollection.find({ $or: [{ username: regex }, { name: regex }] }).toArray();
    return data;
  }
}

module.exports = User;
