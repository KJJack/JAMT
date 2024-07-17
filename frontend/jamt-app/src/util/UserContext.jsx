import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};