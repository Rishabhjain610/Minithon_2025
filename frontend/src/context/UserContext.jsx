import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthDataContext } from './AuthContext'; // Assuming this provides serverUrl

// 1. Create the context
export const UserDataContext = createContext(null);

// 2. Create the provider component
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(AuthDataContext);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Make the API call with credentials to send the httpOnly cookie
        const response = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Not authenticated or server error:", error.response?.data?.message || error.message);
        setUser(null); // Ensure user is null if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []); // Re-run if serverUrl changes

  // 3. Provide the user state and a setter function to children
  return (
    <UserDataContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;