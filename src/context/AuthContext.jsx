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
  const [searchColumn, setSearchColumn] = useState("EName");
  const [counts, setCounts] = useState({ total: 0, M: 0, F: 0 });
  const [viewMode, setViewMode] = useState("default");

  const [ageRange, setAgeRange] = useState({ min: 18, max: 31 });

  const dataPerPage = 250;

  const rangeFromAndTo = () => {
    const from = currentPage * dataPerPage;
    const to = from + dataPerPage - 1;
    return { from, to };
  };

  const { from, to } = rangeFromAndTo();

  const searchByInput = async () => {
    try {
      const { data, error } = await supabase
        .from("96_Baruraj")
        .select("*")
        .ilike(searchColumn, `%${search}%`);

      if (error) {
        console.error("Search error: ", error);
        return;
      }

      setUsersData(data);
    } catch (error) {
      console.error("Error during search: ", error);
    }
  };

  const fetchUsersData = async () => {
    try {
      const { data, count, error } = await supabase
        .from("96_Baruraj")
        .select("*", { count: "exact" })
        .order("id", { ascending: true })
        .range(from, to);

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }

      setUsersData(data);
      setCounts(prev => ({ ...prev, total: count }));
    } catch (error) {
      console.log("Fetch users data error:", error);
    }
  };

// Family Wise Data
  const fetchFamilyWise = async () => {
  setViewMode("familyWise");
  const { from, to } = rangeFromAndTo();

  const { data, count, error } = await supabase
    .from("96_Baruraj")
    .select("*", { count: "exact" })  // Add count option
    .order("HouseNo", { ascending: false })
    // .range(from , to); // Uncomment if needed for pagination

  if (error) {
    console.log("Error while fetching family-wise data", error);
    return { data: null, count: 0 };
  }

  return { data, count }; // ✅ Now returns data and count
};


  // age range wise data
 const fetchByAgeRange = async (minAge = ageRange.min, maxAge = ageRange.max) => {
    setViewMode("ageRange");
    const { from, to } = rangeFromAndTo();
    const { data, count, error } = await supabase
      .from("96_Baruraj")
      .select("id, EName, E_Surname, CASTE, Age, Gender", { count: "exact" })
      .gte("Age", minAge)
      .lte("Age", maxAge)
      .range(from, to);

    if (error) {
      console.error("Error fetching users:", error);
    } else {
      return { data, count };
    }
  };


  const fetchTableHeader = async () => {
    const { data, count, error } = await supabase
      .from("Add_New_Data")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Error fetching table header data:", error);
      return;
    }

    setNewUserData(data);
    setCounts(prev => ({ ...prev, total: count }));
  };

  const addNewData = async (newPerson, setNewPerson) => {
    const { error } = await supabase
      .from("Add_New_Data")
      .insert(newPerson)
      .single();

    if (error) {
      alert("Error while adding person: " + error.message);
    } else {
      alert("Added Successfully");
      setNewPerson({});
    }
  };

  const totalPages = Math.ceil(counts.total / dataPerPage);

  // Fetch default data or search result
  useEffect(() => {
    if (!search) {
      fetchUsersData();
    } else {
      const timer = setTimeout(searchByInput, 400);
      return () => clearTimeout(timer);
    }
  }, [search]);

  // Re-fetch data when page changes (only if no search is active)
  useEffect(() => {
    if (viewMode === "default") {
      fetchUsersData();
    }
  }, [currentPage, viewMode]);

  // Fetch structure for header
  useEffect(() => {
    if (localStorage.getItem("role") === "user") {
      fetchTableHeader();
    }
  }, []);




  return (
    <DataContext.Provider
      value={{
        usersData,
        fetchUsersData,
        newUserData,
        addNewData,
        setSearch,
        counts,
        setSearchColumn,
        fetchFamilyWise,
        currentPage,
        setCurrentPage,
        totalPages,
        fetchByAgeRange,
        setViewMode,
        setAgeRange
      }}
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
