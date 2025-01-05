const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      const userData = JSON.parse(localStorage.getItem("user") ?? "{}");
      if (userData.token) setUser(userData);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
