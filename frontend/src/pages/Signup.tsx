import { useNavigate } from 'react-router-dom';

export const Signuppage = () =>{
    const navigate = useNavigate();

    return(
        <section className="signuppage">
            <form>
                <label> Email </label>
                <input type="email" required={true}/>

                <label> Username </label>
                <input type="text" required={true}/>

                <label> Password </label>
                <input type="password" required={true}/>

                <label> Confirm Password </label>
                <input type="password" required={true}/>
            </form>

            <p> Existing User? </p>
            <button onClick={() => {navigate("/login")}}> Login </button>
        </section>
    )
}