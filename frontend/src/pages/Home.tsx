import { useNavigate } from 'react-router-dom';

export const Homepage = () =>{
    const navigate = useNavigate();

    const isLogged = localStorage.getItem("ffisLogged");

    return(
        <section className="homepage">
            <header>
                <h1> Feedback Forge </h1>
                <p> Receieve feedback on your projects today from people around the world! </p>
            </header>
            {/* if user is not logged send them to profile page  */}
            {isLogged ? (
                <button onClick={() => console.log("Open Add Project Modal")}>
                    Add Your Project
                </button>
            ) : (
                <button onClick={() => navigate("/signup")}>
                    Join Today!
                </button>
            )}
            <section className="homeProjectsContainer">
                {/* Project card */}
                <div className="projectCardContainer">
                    <h1> project name </h1>
                    <p> project description </p>
                    <p> date posted </p>
                    <p> tech stack </p>
                    <p> live site button </p>
                    <p> github button </p>
                    <p> button to popup comment modal </p>
                </div>
            </section>
        </section>
    )
}