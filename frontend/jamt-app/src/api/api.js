import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:4723';

export const getUserApplications = async (userId) => {
    try {

        const token = localStorage.getItem('token');

        const response = await axios.get(
            `${API_URL}/application/${userId}`,
                {headers: {
                    "Authorization": token
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error('Error fetching data from getUserApplications: ', error);
        throw error;
    }
}

export const createUserApplication = async (userId, applicationData) => {
    try {

        const token = localStorage.getItem('token');

        console.log(userId);
        console.log(token);

        const response = await axios.post(
            `${API_URL}/application/${userId}`,
            applicationData,
            {headers: {
                "Authorization": token
            }}
        )

        return response.data;

    } catch (error) {
        console.error('Error creating application in createUserApplication: ', error);
        throw error;
    }
}

export const deleteUserApplication = async (userId, applicationId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.delete(
            `${API_URL}/application/${userId}/${applicationId}`,
            {headers: {
                "Authorization": token
            }}
        )

        return response;

    } catch (error) {
        console.log(`Error deleting application: ${applicationId} :::`, error);
        throw error;
    }
}

export const getCurrentUser = async () => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const decodeToken = jwtDecode(token);
            const userId = decodeToken.id;

            const response = await axios.get(
                `http://localhost:4723/users/${userId}`, {
                    headers: { Authorization: `${token}` }
                });

            return response.data;
        } catch(error) {
            console.log('Failed to fetch user:', error);
        }
    }
}
