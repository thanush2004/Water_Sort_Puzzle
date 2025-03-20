import "../styles/HomePage.css"
import { Navigate, useNavigate } from "react-router-dom";
function HomePage(){
    const navigate=useNavigate();
    return<>
    <div className="Home_container">
    <button onClick={() => navigate("/board")}><p>Start Game</p> <img src={"./src/assets/right-arrow.png"}></img></button>
    </div>

    </>
}
export default HomePage;