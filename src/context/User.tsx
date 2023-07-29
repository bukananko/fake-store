import { useState, createContext } from "react";
import { UserProps } from "../interfaces";

interface UserContextProps {
  user: UserProps;
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
}

export const UserContext = createContext({} as UserContextProps);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : {}
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
