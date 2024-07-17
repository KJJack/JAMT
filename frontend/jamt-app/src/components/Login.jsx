import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../util/UserContext';


function Login() {

    const [formData, setFormData] = useState({ username: '', password: ''});
    const [message, setMessage] = useState({ text: '', color: ''});
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };


    const handleSubmit = async(event) => {
        event.preventDefault();

        const loginData = {
            email: formData.username,
            password: formData.password
        };

        try {
            const response = await axios.post('http://localhost:4723/login', loginData);

            if (response.status === 200) {
                setMessage({ text: 'Login Successful', color: 'green'});
                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log('Login Successful: ', response.data);
                setUser(response.data.user);
                console.log('User set in context setUser: ', user);
                navigate('/home');
            }
        } catch(error) {
            setMessage({ text: error.response.data.message, color: 'red'});
            console.log('Error: ', error);
        } finally {
            setFormData({ username: '', password: ''});
        }
    };



    return(
        <div className="login-container">
            <div className="login-title">
                <h1>Welcome to JAMT</h1>
                <h5 style={{color: message.color}}>{message.text}</h5>
            </div>
            <div className="login-field">
                <input 
                    type='email' 
                    name='username'
                    placeholder="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <input 
                    type='password'
                    name='password' 
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button onClick={handleSubmit}>Login</button>
            </div>

            <div className="login-foot">
                <span><a className="create-link">Create Account</a></span>
                <span><a className="help-link">Help</a></span>
            </div>
        </div>
    );
}

export default Login;