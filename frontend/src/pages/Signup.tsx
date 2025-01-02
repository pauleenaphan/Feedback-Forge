import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { CREATE_USER } from "../services/UserAPI";
import { useMutation } from '@apollo/client';

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
        <main>
            <form className="signupForm" onSubmit={handleSubmit}>
                <label>Name:</label>
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username}
                    onChange={handleChange} 
                    required 
                />

                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange} 
                    required 
                />

                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password}
                    onChange={handleChange} 
                    required 
                />

                <label>Confirm Password:</label>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword}
                    onChange={handleChange} 
                    required 
                />

                <button type="submit">Sign Up</button>
                <p> Existing user? </p>
                <button onClick={() => {navigate("/login")}}> Login </button>
            </form>
        </main>
    );
}