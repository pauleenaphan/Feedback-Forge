const User = require("../models/userModel");
const bcrypt = require('bcryptjs');

const userResolver = {
    Query:{ //We are getting the user by ID
        getUser: async(_, { id }) =>{
            try{
                const user = await User.findById(id);
                if(!user){
                    throw new Error("User not found");
                }
                return user
            }catch(error){
                throw new Error(error.message);
            }
        }
    },

    Mutation:{
        createUser: async (_, { input }) =>{
            try{
                const existingUser = await User.findOne({ name: input.name });
                if(existingUser){
                    throw new Error("User already exist");
                }else{
                    console.log('Creating user with input:', input); 

                    const cryptPass = await bcrypt.hash(input.password, 10);
                    const newUser = new User({
                        name: input.name,
                        email: input.email,
                        password: cryptPass,
                    })

                    await newUser.save();
                    return newUser;
                }
            }catch(error){
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
    }
}

module.exports = userResolver;