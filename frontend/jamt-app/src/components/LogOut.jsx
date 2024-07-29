import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../util/UserContext";

export default function LogOut() {

    const { setUser, setApplications } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut= () => {
        console.log("Log out btn clicked");
        localStorage.removeItem('token');
        setUser(null);
        setApplications([]);
        navigate('/');
    }


    return(
        <div className="logout-btn-container" onClick={handleLogOut}>
            <FontAwesomeIcon icon={faRightFromBracket} id="logout-btn-icon" style={{ color: "#d0d6d6", height: "inherit", width: "inherit" }}/>
        </div>
    );
}
