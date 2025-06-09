import { createContext, use, useState } from "react";
import { supabase } from "../supabaseClient";
import { useEffect } from "react";

const AuthContext = createContext();
const DataContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [userRole, setUserRole] = useState(undefined);

  console.log(userRole)



  // signIn
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      const {data: user} = await supabase.from("user").select("*").single()


      if (error) {
        console.error("sign in error occurred: ", error);
        return { success: false, error: error.message };
      }
      localStorage.setItem("role", user.role)

      // document.cookie = user.role;
      // console.log(cookie);
      

      localStorage.setItem("session", data.session.access_token)
      setUserRole(localStorage.getItem("role"))
      console.log("sign-in success");
      return { success: true, data , user};
    } catch (error) {
      console.error("an error occurred: ", error);
    }
  };

  //
  const signOut = () => {
    const { error } = supabase.auth.signOut();
    if(!error) {
      localStorage.removeItem("session");
      localStorage.removeItem("role");

    }
    if (error) {
      console.log("error occurred while signing out: ", error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
    });

    setUserRole(localStorage.getItem("role"))
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(session);
      
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, signInUser, signOut, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const DataContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    const { data, error } = await supabase.from("Sample_Data").select("*");
    try {
      {
        data
          ? setUsersData(data)
          : console.error("error occurred fetching users Data ", error);
      }
    } catch (error) {
      console.log("error fetching data ", error);
    }
  };

  return (
    <DataContext.Provider value={{ usersData, fetchUsersData }}>
      {children}
    </DataContext.Provider>
  );
};

export const UserAuth = () => {
  return use(AuthContext);
};

export const useUsersData = () => {
  return use(DataContext);
};
