import { createContext, use, useState } from "react";
import { supabase } from "../supabaseClient";
import { useEffect } from "react";

const AuthContext = createContext();
const DataContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [userRole, setUserRole] = useState(undefined);

  console.log(userRole);

  // signIn
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      const { data: user } = await supabase.from("user").select("*").single();

      if (error) {
        console.error("sign in error occurred: ", error);
        return { success: false, error: error.message };
      }
      localStorage.setItem("role", user.role);

      // document.cookie = user.role;
      // console.log(cookie);

      localStorage.setItem("session", data.session.access_token);
      setUserRole(localStorage.getItem("role"));
      console.log("sign-in success");
      return { success: true, data, user };
    } catch (error) {
      console.error("an error occurred: ", error);
    }
  };

  //
  const signOut = () => {
    const { error } = supabase.auth.signOut();
    if (!error) {
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

    setUserRole(localStorage.getItem("role"));

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, signInUser, signOut, userRole, setUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const DataContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [newUserData, setNewUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState({total: "", M: "", F: ""})

  // console.log(Boolean(search))


    useEffect(() => {
      if(!search) {
        fetchUsersData();
        return;
      }

      const timer = setTimeout(searchByInput, 500);

      return ()=> clearTimeout(timer);
    }, [search]);

  useEffect(() => {
    fetchUsersData();
    fetchTableHeader();
  }, []);

  // setting range from and to dynamically
  const rangeFromAndTo = () => {
    const dataPerPage = 249;
    let from = currentPage * dataPerPage;
    let to = from + dataPerPage;

    if (currentPage > 0) {
      from += 1;
    }

    return { from, to, dataPerPage };
  };

  // search by text
  const searchByInput = async () => {
    const { data, error } = await supabase
      .from("96_Baruraj")
      .select()
      .textSearch("EName", search);

    try {
      if (data) setUsersData(data);
      if (error) {
        console.error("error-search by input ", error);
      }
    } catch (error) {
      console.error("error searching data ", error);
    }
  };

  const fetchUsersData = async () => {
    const { from, to, dataPerPage } = rangeFromAndTo();

    const { data, count, error } = await supabase
      .from("96_Baruraj")
      .select("*", { count: "exact" })
      .order("id", { ascending: true })
      .range(from, to);
    // .range((currentPage - 1) * dataPerPage, currentPage * dataPerPage - 1)

    const totalPages = count ? Math.ceil(count / dataPerPage) : 0;
    setCounts({total: [count]});
    try {
      console.log(totalPages);

      console.log(count);
      {
        data
          ? setUsersData(data)
          : console.error("error occurred fetching users Data ", error);
      }
    } catch (error) {
      console.log("error fetching data ", error);
    }
  };

  //get add new data table
  const fetchTableHeader = async () => {
    const { data, error } = await supabase
      .from("Add_New_Data")
      .select("*")
      .limit(1);
    try {
      {
        data
          ? setNewUserData(data)
          : console.error("error occurred fetching users Data ", error);
      }
    } catch (error) {
      console.error("error fetching getNewData ", error);
    }
  };

  // adding the new data
  const addNewData = async (newPerson, setNewPerson) => {
    const { error } = await supabase
      .from("Add_New_Data")
      .insert(newPerson)
      .single();

    if (error) {
      alert("error while adding person ", error);
    }
    alert("Added Successfully");
    setNewPerson({});
  };

  return (
    <DataContext.Provider
      value={{ usersData, fetchUsersData, newUserData, addNewData, setSearch, counts }}
    >
      {children}
    </DataContext.Provider>
  );
};

const UserAuth = () => {
  return use(AuthContext);
};

const useUsersData = () => {
  return use(DataContext);
};

export { UserAuth, useUsersData };
