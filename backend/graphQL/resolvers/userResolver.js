const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userResolver = {
    Query:{ //We are getting the user by ID
        getUser: async(_, { id }) =>{
            try{
                const user = await User.findById(id).populate("projects");
                if(!user){
                    throw new Error("User not found");
                }
                return user
            }catch(error){
                console.error("Error creating user:", error);
                throw new Error(error.message);
            }
        }
    },

    Mutation:{
        createUser: async (_, { input }) =>{
            try{
                console.log("create user mutation is running");
                const existingUser = await User.findOne({ username: input.username });
                if(existingUser){
                    throw new Error("User already exist");
                }else{
                    console.log('Creating user with input:', input); 

                    const cryptPass = await bcrypt.hash(input.password, 10);
                    const newUser = new User({
                        username: input.username,
                        email: input.email,
                        password: cryptPass,
                    })

                    await newUser.save();
                    return newUser;
                }
            }catch(error){
                console.error("error", error);
                throw new Error("Error creating user", error.message);
            }
        },
        // deleteUser: async(_, { id }) =>{
        //     try{
        //         const user = await User.findByIdAndDelete(id);
        //         if(!user){
        //             throw new Error("User not found");
        //         }
        //         return user;
        //     }catch(error){
        //         throw new Error("Error deleting user", error.message);
        //     }
        // }
        login: async (_, { input }) => {
            try {
                const user = await User.findOne({ email: input.email });
                if (!user) {
                    throw new Error("User not found");
                }
    
                // Compare the password with the hashed one in the database
                const validPassword = await bcrypt.compare(input.password, user.password);
                if (!validPassword) {
                    throw new Error("Invalid credentials");
                }
    
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '100h' });
    
                // Return the token and the user
                return {
                    token,
                    user
                };
            } catch (error) {
                throw new Error(`Error logging in: ${error.message}`);
            }
        }
    }
}

module.exports = userResolver;