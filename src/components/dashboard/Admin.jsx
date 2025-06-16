import { useUsersData } from "../../context/AuthContext";
import GenderMenu from "../dropdown/DropDownMenu";
import { useEffect, useState } from "react";
import Filters from "../search-filters/Filters";
import UsersTable from "../pages/UsersTable";
import SignOut from "../navbar/SignOut";
import { UserAuth } from "../../context/AuthContext";

const Admin = () => {
  const [gender, setGender] = useState("");
  const { userRole, session } = UserAuth();
  const { fetchUsersData } = useUsersData();

  const { refresh_token } = session;

  // useEffect(() => {
  //   fetchUsersData();
  // }, []);

  return (
    <>
      <SignOut />
      {/* <GenderMenu setGender= {setGender}/> */}
      <Filters />
      {/* {userRole === 'admin' && <UsersTable />} */}

      <UsersTable />

      {/* <UsersData gender={gender}/> */}

      {/* <iframe
        className="mx-auto mt-16"
        title="Sample Report Demo"
        width="1140"
        height="541.25"
        src="https://playground.powerbi.com/sampleReportEmbed"
        frameborder="0"
        allowFullScreen="true"
      ></iframe> */}
    </>
  );
};

export default Admin;
