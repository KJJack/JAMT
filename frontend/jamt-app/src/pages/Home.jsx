import NavbarComponent from '../components/navbar.jsx'
import AppTable from '../components/AppTable.jsx';
import Paginate from '../components/Paginate.jsx';
import Logo from '../components/Logo.jsx';
import LogOut from '../components/LogOut.jsx';
import { useContext } from 'react';
import { UserContext } from '../util/UserContext.jsx';

export default function Home() {

    const { user } = useContext(UserContext);
    console.log('User in Home:', user); // Check user here
    
    return(
        <>
            <NavbarComponent/>
            <LogOut/>
            <Logo />
            <Paginate/>
        </>
    );
}