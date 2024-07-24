import NavbarComponent from "../components/navbar";
import { useContext } from 'react';
import { UserContext } from '../util/UserContext.jsx';

export default function Calendar() {

    const { user } = useContext(UserContext);

    return(
        <>
            <NavbarComponent/>
            <h1>Under Development</h1>
        </>
    )
}