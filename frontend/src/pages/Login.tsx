import { useNavigate } from 'react-router-dom';

export const Loginpage = () =>{
    const navigate = useNavigate();

    return(
        <section className="loginpage">
            <form>
                <label> Email </label>
                <input type="email" required={true}/>

                <label> Password </label>
                <input type="password" required={true}/>
            </form>

            <p> New to FF? </p>
            <button onClick={() => {navigate("/signup")}}> Create new Account </button>
        </section>
    )
}