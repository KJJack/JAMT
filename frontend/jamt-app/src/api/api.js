import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:4723';
const getToken = () => localStorage.getItem('token');
const setHeaders = () => ({
    headers: {
        "Authorization": getToken()
    }
})

export const postUserLogin = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, loginData)
        return response;
    } catch (error) {
        console.log('Error logging on with user: ', loginData.email);
        throw error;
    }
}

export const getUserApplications = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/application/${userId}`, setHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching data from getUserApplications: ', error);
        throw error;
    }
}

export const createUserApplication = async (userId, applicationData) => {
    try {
        const response = await axios.post(`${API_URL}/application/${userId}`, applicationData, setHeaders());
        return response.data;
    } catch (error) {
        console.error('Error creating application in createUserApplication: ', error);
        throw error;
    }
}

export const deleteUserApplication = async (userId, applicationId) => {
    try {
        const response = await axios.delete(`${API_URL}/application/${userId}/${applicationId}`, setHeaders());
        return response.data;
    } catch (error) {
        console.log(`Error deleting application: ${applicationId} :::`, error);
        throw error;
    }
}

export const updateUserApplication = async (userId, applicationId, application) => {
    try {
        const response = await axios.put(`${API_URL}/application/${userId}/${applicationId}`, application, setHeaders());
        return response.data;
    } catch (error) {
        console.log(`Error deleting application: \nUserID ${userId} \n${applicationId} \n${application}`)
        throw(error)
    }
};

export const getCurrentUser = async () => {
    if (getToken()) {
        try {
            const decodeToken = jwtDecode(getToken());
            const userId = decodeToken.id;
            const response = await axios.get(`${API_URL}/users/${userId}`, setHeaders());
            return response.data;
        } catch(error) {
            console.log('Failed to fetch user:', error);
        }
    }
}
