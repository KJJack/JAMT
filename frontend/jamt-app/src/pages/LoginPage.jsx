import Login from "../components/Login";
import { UserContext } from "../util/UserContext";
import { useContext } from "react";

export default function LoginPage() {

    const { user, applications} = useContext(UserContext);
    const token = localStorage.getItem('token');

    console.log('From log in page User: ', user);
    console.log('From log in page Applications: ', applications);
    console.log('From log in page Token: ', token);

    return(
        <Login/>
    )
}