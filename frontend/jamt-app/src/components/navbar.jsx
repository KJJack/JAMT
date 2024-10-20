import placeholder from '../assets/placeholder_profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faStackOverflow} from '@fortawesome/free-brands-svg-icons';
import {faCode} from "@fortawesome/free-solid-svg-icons";
import {faTable} from "@fortawesome/free-solid-svg-icons";
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import {faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {faGear} from "@fortawesome/free-solid-svg-icons";

import { useContext, useEffect } from 'react';
import { UserContext } from '../util/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function NavbarComponent() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('User in Navbar has changed:', user);
    }, [user]);



    const homeNavigation = () => {
        navigate('/home');
    }

    const calendarNavigation = () => {
        navigate('/calendar');
    }


    return(
        <div className="nav-container">
            {console.log('Navbar context for user: ', user)}
            {user ? 
            (<h3 className='navbar-user-name'>{user.firstname + ' ' + user.lastname}</h3>) 
            : (<h3 className='navbar-user-name'>John Doe</h3>)}

            <div className="user-profile">
                <img src={placeholder}></img>

                <div className='link-container'>

                    <div className='link'>
                        <FontAwesomeIcon className='link-icon' icon={faGithub} style={{height: "inherit", width: "inherit"}}/>
                    </div>

                    <div className='link'>
                        <FontAwesomeIcon className='link-icon' icon={faLinkedin} style={{height: "inherit"}}/>
                    </div>
                    <div className='link'>
                        <FontAwesomeIcon className='link-icon' icon={faStackOverflow} style={{height: "inherit"}}/>
                    </div>
                    <div className='link'>
                        <FontAwesomeIcon className='link-icon' icon={faCode} style={{height: "inherit", width: "inherit"}}/>
                    </div>
                </div>
            </div>


            <div className="box">
                <FontAwesomeIcon className='box-icon' onClick={homeNavigation} icon={faTable} style={{height: "40px", width: "40px"}}/>
                
            </div>
            <div className="box">
                <FontAwesomeIcon className='box-icon' onClick={calendarNavigation} icon={faCalendarDays} style={{height: "40px", width: "40px"}}/>
            </div>
            <div className="box">
                <FontAwesomeIcon className='box-icon' icon={faUserGroup} style={{height: "40px", width: "40px"}}/>
            </div>
            <div className="box">
                <FontAwesomeIcon className='box-icon' icon={faGear} style={{height: "40px", width: "40px"}}/>
            </div>
            
        </div>
    );
}