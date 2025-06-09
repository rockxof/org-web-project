import { useUsersData } from "../../context/AuthContext";

const TableHeader = () => {
    const {usersData} = useUsersData();
    let tableHeader = [];
    
     usersData.map((user, idx) => {
    if (idx === 1) return;
    tableHeader = Object.keys(user);
  });


  return (
    <div className="w-svw  overflow-auto h-svh no-scrollbar">
      <table className="border-collapse max-w-4xl w-full mt-8 mx-auto ">
        <thead className="border border-[#ddd] ">
          <tr>
            {tableHeader?.map((tr, idx) => {
              return (
                
                <th key={idx} className="border border-[#ddd}">
                  {tr}
                </th>
              );
            })}
          </tr>
        </thead>
      

      <tbody>

    {usersData.map(user=>{
        return(
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
                        {user?.Sub_cast}
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
        )
    })}
    </tbody>
    </table>
      </div>
  )
}

export default TableHeader;