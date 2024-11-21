import { useNavigate } from 'react-router-dom';

export const Navbar = () =>{
    const navigate = useNavigate();

    const isLogged = localStorage.getItem("ffisLogged");

    return(
        <section className="navbar">
            <nav>
                <button> light/dark mode icon</button>
                <button onClick={() => {navigate("/")}}> Home icon </button>
                <button onClick={() => {
                        if(!isLogged){
                            navigate("/profile")
                        }else{
                            navigate("/signup")
                        }
                    }}> profile icon </button>
            </nav>
        </section>
    )
}