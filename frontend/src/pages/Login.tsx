import { useNavigate } from 'react-router-dom';

export const Loginpage = () =>{
    const navigate = useNavigate();

    return(
        <main className="font-body flex justify-center">
            <form className=" flex flex-col p-12 gap-6 w-2/5 pt-20">
                <h1 className="font-heading font-bold text-center text-4xl"> Login </h1>
                <div className="flex flex-col gap-1">
                    <label className="font-medium"> Email </label>
                    <input 
                        type="email" 
                        required={true}
                        className="p-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" 
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-medium"> Password </label>
                    <input 
                        type="password" 
                        required={true}
                        className="p-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" 
                    />
                </div>
                <button 
                    type="submit"
                    className="bg-blue-500 text-white font-medium px-5 py-2 rounded-2xl shadow-custom-blue hover:shadow-none transform hover:translate-y-3 hover:opacity-90"
                    >Login</button>
                <div className="flex gap-2 justify-center">
                    <p> New to FF? </p>
                    <button 
                        onClick={() => {navigate("/signup")}}
                        className="underline hover:opacity-70"
                    > Create new Account </button>
                </div>
            </form> 
        </main>
    )
}