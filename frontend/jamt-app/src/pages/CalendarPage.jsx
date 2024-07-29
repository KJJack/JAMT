import NavbarComponent from "../components/navbar.jsx";
import { useContext, useState } from 'react';
import { UserContext } from '../util/UserContext.jsx';
import Calendar from 'react-calendar';


const ValuePiece = Date | null;

const Value = ValuePiece | [ValuePiece, ValuePiece];


export default function CalendarPage() {

    const { user } = useContext(UserContext);

    return(
        <>
            <NavbarComponent/>
            <h1>Under Development</h1>
            <Calendar/>
        </>
    )
}