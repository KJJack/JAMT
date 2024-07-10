import placeholder from '../assets/placeholder_profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faGithub } from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faStackOverflow} from '@fortawesome/free-brands-svg-icons';
import {faCode} from "@fortawesome/free-solid-svg-icons";
import {faTable} from "@fortawesome/free-solid-svg-icons";
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import {faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {faGear} from "@fortawesome/free-solid-svg-icons";

export default function NavbarComponent() {


    return(
        <div className="nav-container">
            <h3>Welcome, John Doe</h3>

            <div className="user-profile">
                <img src={placeholder}></img>

                <div className='link-container'>

                    <div className='link'>
                        <FontAwesomeIcon className='link-icon' icon={faGithub} style={{color: "#d0d6d6", height: "inherit", width: "inherit"}}/>
                    </div>

                    <div className='link'>
                        <FontAwesomeIcon className='link-icon' icon={faLinkedin} style={{color: "#d0d6d6", height: "inherit"}}/>
                    </div>
                    <div className='link'>
                        <FontAwesomeIcon className='link-icon' icon={faStackOverflow} style={{color: "#d0d6d6", height: "inherit"}}/>
                    </div>
                    <div className='link'>
                        <FontAwesomeIcon className='link-icon' icon={faCode} style={{color: "#d0d6d6", height: "inherit", width: "inherit"}}/>
                    </div>
                </div>
            </div>


            <div className="box">
                <FontAwesomeIcon className='link-icon' icon={faTable} style={{color: "#d0d6d6", height: "50px", width: "50px"}}/>
                
            </div>
            <div className="box">
                <FontAwesomeIcon className='link-icon' icon={faCalendarDays} style={{color: "#d0d6d6", height: "50px", width: "50px"}}/>
            </div>
            <div className="box">
                <FontAwesomeIcon className='link-icon' icon={faUserGroup} style={{color: "#d0d6d6", height: "50px", width: "50px"}}/>
            </div>
            <div className="box">
                <FontAwesomeIcon className='link-icon' icon={faGear} style={{color: "#d0d6d6", height: "50px", width: "50px"}}/>
            </div>
            
        </div>
    );
}