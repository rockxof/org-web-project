import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const UsersData = ({gender}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [gender]);

  console.log("logging from line-11 ", gender);
  

  const fetchUsers = async () => {
    try {

      if(gender){
        const {data, error} = await supabase.from("Sample_Data").select("*").eq("sex", gender)
        setUsers(data)
      }else{
        const { data, error } = await supabase.from("Sample_Data").select("*");
  
        if (data) {
          setUsers(data);
          
        }
        console.log("error fetching usersdata: ", error.message);

      }

    } catch (error) {
      console.log("error fetching data ", error);
    }
  };

  console.log("fetching users at last: ", users);

  return (
    <div>
      <h1 className="text-center font-bold text-4xl mt-20">
        HELLO FROM FETCH USERS COMPONENTS
      </h1>

      <div className="w-svw  overflow-auto h-svh no-scrollbar">
        <table className="border-collapse max-w-4xl w-full mt-8 mx-auto ">
          <thead className="border border-[#ddd] ">
            <tr>
              <th className="border border-[#ddd}">Id</th>
              <th className="border border-[#ddd}">Address</th>
              <th className="border border-[#ddd}">PartNo</th>
              <th className="border border-[#ddd}">YA</th>
              <th className="border border-[#ddd}">SectionNo</th>
              <th className="border border-[#ddd}">HouseNo</th>
              <th className="border border-[#ddd}">Ename</th>
              <th className="border border-[#ddd}">E_Surname</th>
              <th className="border border-[#ddd}">VEName</th>
              <th className="border border-[#ddd}">VE_SurName</th>
              <th className="border border-[#ddd}">Correct Surname</th>
              <th className="border border-[#ddd}">sex</th>
              <th className="border border-[#ddd}">CAST</th>
              <th className="border border-[#ddd}">RName</th>
              <th className="border border-[#ddd}">R_SurName</th>
              <th className="border border-[#ddd}">VRName</th>
              <th className="border border-[#ddd}">VR_SurName</th>
              <th className="border border-[#ddd}">RType</th>
              <th className="border border-[#ddd}">Age</th>
              <th className="border border-[#ddd}">IDCardNo</th>
              <th className="border border-[#ddd}">ContactNo</th>
              <th className="border border-[#ddd}">PSName</th>
              <th className="border border-[#ddd}">Corrected Surname</th>
            </tr>
          </thead>

          <tbody>
            {users
              ? users.map((user) => {
                  // console.log(user.HouseNo);
                
                  return (
                    <tr key={user?.s_no} className="hover:bg-cyan-200/10">
                      <td className="border border-[#ddd} text-center">
                        {user?.s_no}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.Address}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.PartNo}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.YA}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.SectionNo}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.HouseNo}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.Ename}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.E_Surname}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.VEName}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.VE_SurName}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.Correct_Surname}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.sex}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.CAST}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.RName}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.R_SurName}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.VRName}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.VR_SurName}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.RType}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.Age}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.IDCardNo}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.ContactNo}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.PSName}
                      </td>
                      <td className="border border-[#ddd} text-center">
                        {user?.Corrected_Surname}
                      </td>
                    </tr>
                  );
                })
              : console.log("Null")}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersData;
