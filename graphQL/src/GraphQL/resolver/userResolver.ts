import User from "../../model/user";
import bcrypt from 'bcrypt';
import {ApolloError} from 'apollo-server';
import { generateJWTToken } from "../../utils";
import { GraphQLError } from "graphql";

const userResolver = {
    Query: {
        getUsers: async() => {
            const allUsers = await User.find();
            return allUsers;
        },
        getUser: async(_, { id }) => {
            const user = await User.findById(id)
            return user;
        }
    }, 
    Mutation: {
        createUser: async(_, args) => {
            const { input } = args
            const { name, email, age, gender, password } = input

            const saltHashLength = 10
            const salt = await bcrypt.genSalt(saltHashLength)
            const hash = await bcrypt.hash(password, salt)
            // console.log("ARGS", input)
            const newUser = await User.create({
                name, email, age, gender, password: hash
            })
            return newUser;
        },
        loginUser: async(_:unknown, args: any) => {
            const { input } = args
            const { email, password } = input
            const user = await User.findOne({ email })
            
            if(!user){
                throw new ApolloError('User not found')
            }

            const validate = await bcrypt.compare(password, user.password)
            if(!validate){
                throw new ApolloError("Invalid Credentials")
            }
            
            const token = generateJWTToken(user.id)
            return { ...user, token }
        },
        updateUser: async(_:unknown, args: any, context: any) => {
            try {
                if (!context.userData) {
                    throw new GraphQLError('User is not authenticated', {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                            http: { status: 401 },
                        },
                    });
                }
                const { _id, email, password, name } = args.input;
                const user = await User.findById(_id);

                if (!user) {
                    throw new Error('User not found!');
                }

                // Updating the user information
                if (name) user.name = name;
                if (email) user.email = email;
                if (password) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    user.password = hashedPassword;
                }
                // Save the updated user to the database
                const updatedUser = await user.save();
                return updatedUser;
            } catch (error) {
                throw new ApolloError(`Failed to update User: ${error}`);
            }
        },
    }
}

export default userResolver;