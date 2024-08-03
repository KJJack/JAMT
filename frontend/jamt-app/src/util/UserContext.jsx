import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, getUserApplications } from '../api/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const result = await getCurrentUser();
        console.log(result);
        setUser(result);

      } catch(error) {
        console.error('Error fetching user in UserContext: ', error);
      }
    }

    fetchUser();

  }, []);

  useEffect(() => {
    if (user) {
      const fetchApplications = async () => {
        try {
          const userId = user.id || user._id;
          const result = await getUserApplications(userId);
          setApplications(result);
        } catch(error) {
          console.log('Error getting applications in UserContext: ', error);
        }
      }
      fetchApplications();
    }

  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, applications, setApplications }}>
      {children}
    </UserContext.Provider>
  );
};