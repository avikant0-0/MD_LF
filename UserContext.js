import { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [isadmin, setisadmin] = useState(true);
  return (
    <UserType.Provider value={{ isadmin, setisadmin }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
