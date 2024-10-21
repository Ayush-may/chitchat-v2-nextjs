import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectToDatabase from "../../../../lib/mongoDB";

const resolvers = {
  Query: {
    getUsers: async () => {
      await connectToDatabase();

      const users = await User.find({});
      return users;
    },
    getUserByUsername: async (_, { username }) => {
      await connectToDatabase();

      const user = await User.findOne({ username: username.toLowerCase() });
      const token = jwt.sign({ username: username.toLowerCase() }, process.env.JWT_KEY, { expiresIn: "1h" });

      return {
        username,
        password: user.password,
        created_at: (new Date(user.created_at)).toString(),
        token
      };
    }

  },
  Mutation: {
    createUser: async (_, { username, password }) => {
      try {
        await connectToDatabase();

        const lowerUsername = username.toLowerCase();
        const hashPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({ username }, process.env.JWT_KEY, { expiresIn: '1h' });

        const newUser = new User({ username: lowerUsername, password: hashPassword });
        await newUser.save()

        return {
          user: {
            username,
            token
          },
          response: {
            success: true,
            message: "User is created successfully"
          }
        }

      }
      catch (error) {
        console.error(error);
        return {
          user: null,
          response: {
            success: false,
            message: error.message,
          },
        };
      }
    }
  }
}

export default resolvers;