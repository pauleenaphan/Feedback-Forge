import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { CREATE_USER } from "../services/UserAPI";
import { useMutation } from '@apollo/client';

// import background from "../assets/formBackground.png";

export const Signuppage = () =>{
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [createUser] = useMutation(CREATE_USER);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log(formData.username, formData.email, formData.password)

        try {
            console.log("trying this ")
            const { data } = await createUser({
                variables: {
                    input: {
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,

                    },
                },
            });

            console.log("User created successfully:", data.createUser);
            navigate("/home");
        } catch (error) {
            console.error("Error creating user:", error);
        }

    };

    return (
        <main className="font-body flex justify-center">
            {/* <div className="flex justify-center items-center w-[120%]">
                <img src={background} alt="background" className="w-3/5"></img>
            </div> */}
            
            <form className=" flex flex-col p-12 gap-6 w-2/5 pt-20" 
                onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 text-center">
                    <h1 className="font-heading font-bold text-center text-4xl"> Sign Up</h1>
                    <p className="text-gray-500"> Join FeedbackForge to share your projects and get feedback from a community of creators like yourself</p>
                </div>
                
                <div className="flex flex-col gap-1">
                    <label className="font-medium">Name</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username}
                        onChange={handleChange} 
                        required 
                        className="p-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" 
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-medium">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange} 
                        required 
                        className="p-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-medium">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange} 
                        required 
                        className="p-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-medium">Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword}
                        onChange={handleChange} 
                        required 
                        className="p-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                

                <button 
                    type="submit"
                    className="bg-blue-500 text-white font-medium px-5 py-2 rounded-2xl shadow-custom-blue hover:shadow-none transform hover:translate-y-3 hover:opacity-90"
                    >Sign Up</button>
                <div className="flex gap-2 justify-center">
                    <p> Existing user? </p>
                    <button 
                        onClick={() => {navigate("/login")}}
                        className="underline hover:opacity-70"
                    > Login </button>
                </div>
            </form>
        </main>
    );
}