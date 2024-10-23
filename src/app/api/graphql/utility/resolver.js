import bcrypt from "bcrypt"
import { nanoid } from "nanoid"
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectToDatabase from "../../../../lib/mongoDB";
import FriendModel from "@/models/Friend";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const resolvers = {
  Query: {
    getUsers: async () => {
      await connectToDatabase();

      const users = await User.find({});
      return users;
    },

  },
  Mutation: {
    createUser: async (_, { username, password }) => {
      try {
        await connectToDatabase();

        const lowerUsername = username.toLowerCase();
        const hashPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({ username }, process.env.JWT_KEY, { expiresIn: '1h' });
        const uid = nanoid(10);

        const newUser = new User({
          uid,
          username: lowerUsername,
          password: hashPassword
        });
        await newUser.save()

        return {
          user: {
            uid,
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
    ,
    login: async (_, { username, password }) => {
      try {
        console.log("inside login");
        await connectToDatabase();

        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user)
          throw new Error("User is not present!");

        pubsub.publish("NOTIFICATION", {
          username
        });

        const hashedPassword = user.password;
        const uid = user.uid;

        const isVerifed = await bcrypt.compare(password, hashedPassword);

        if (!isVerifed) {
          throw new Error("Not Authenticated");
        }

        const token = jwt.sign({ username: username.toLowerCase() }, process.env.JWT_KEY, { expiresIn: "1h" });

        console.log({
          uid,
          username,
          token
        });

        return {
          user: {
            uid,
            username,
            token
          },
          response: {
            message: "user is logged in!",
            status: 200
          }
        };

      } catch (error) {
        console.log(error);
      }
    }
    ,
    addFriend: async (_, { uid1, uid2 }) => {
      try {
        const user1 = await User.findOne({ uid: uid1 });
        const user2 = await User.findOne({ uid: uid2 });

        const nf1 = new FriendModel({ uid: uid1 });
        const nf2 = new FriendModel({ uid: uid2 });

        user1.friends.push({ _id: nf2._id });
        user2.friends.push({ _id: nf1._id });

        await user1.save();
        await user2.save();

        return {
          response: {
            message: "user is added into list",
            success: true
          }
        }

      } catch (error) {

        return {
          response: {
            message: "Something went wrong",
            success: false
          }
        }
      }
    },
  },
  Subscription: {
    notification: {
      subscribe: async () => {
        console.log("Subscription resolver called");
        return pubsub.asyncIterator(['NOTIFICATION']);
      },
    },
  },
}

const sendMessage = (message) => {
  pubsub.publish('NEW_MESSAGE', { newMessage: message });
};

export default resolvers;