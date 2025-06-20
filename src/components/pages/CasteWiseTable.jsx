import React, { useEffect, useState } from "react";
import { useUsersData } from "../../context/AuthContext";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router";

const CasteWiseTable = () => {

    const navigate = useNavigate();
  const { fetchCasteCounts, fetchUsersByCaste } = useUsersData();

  const [casteCounts, setCasteCounts] = useState([]);
  const [expandedCastes, setExpandedCastes] = useState({});
  const [userData, setUserData] = useState({});
  const [totalUsersCount, setTotalUsersCount] = useState({});
  const [currentPage, setCurrentPage] = useState({});

  const USERS_PER_PAGE = 100;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCasteCounts();
      setCasteCounts(data);
    };

    fetchData();
  }, []);

  const toggleExpand = async (caste) => {
  const isOpen = expandedCastes[caste];

  // If already open, collapse it immediately on second click
  if (isOpen) {
    setExpandedCastes((prev) => ({ ...prev, [caste]: false }));
    return;
  }

  // Expand and fetch if not already loaded
  setExpandedCastes((prev) => ({ ...prev, [caste]: true }));

  if (!userData[caste]) {
    const { data, count } = await fetchUsersByCaste(caste, 1, USERS_PER_PAGE);
    setUserData((prev) => ({ ...prev, [caste]: data }));
    setTotalUsersCount((prev) => ({ ...prev, [caste]: count }));
    setCurrentPage((prev) => ({ ...prev, [caste]: 1 }));
  }
};


  const handlePageChange = async (caste, direction) => {
    const current = currentPage[caste] || 1;
    const newPage = direction === "next" ? current + 1 : current - 1;

    if (newPage < 1) return;

    const { data } = await fetchUsersByCaste(caste, newPage, USERS_PER_PAGE);

    setCurrentPage((prev) => ({ ...prev, [caste]: newPage }));
    setUserData((prev) => ({ ...prev, [caste]: data }));
  };

  return (
    <div className="p-6 max-w-[95%] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Caste Wise Table</h2>
      <button onClick={() => navigate(-1)} className="text-5xl rounded-4xl text-cyan-600 hover:cursor-pointer"> <IoArrowBackCircle /> </button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden border">
        <div className="bg-white rounded-xl shadow overflow-auto border h-screen no-scrollbar ">
        <table className="w-full">
          <thead className="bg-cyan-600 text-white">
            <tr>
              <th className="text-left px-6 py-4">Caste</th>
              <th className="text-left px-6 py-4">Total Users</th>
              <th className="text-left px-6 py-4">Expand</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {casteCounts.map((row, idx) => {
              const caste = row.caste || "Unknown";
              const isOpen = expandedCastes[caste];
              const users = userData[caste] || [];
              const page = currentPage[caste] || 1;
              const total = totalUsersCount[caste] || 0;
              const totalPages = Math.ceil(total / USERS_PER_PAGE);

              return (
                <React.Fragment key={idx}>
                  <tr className="hover:bg-cyan-50 transition">
                    <td className="px-6 py-4 font-semibold text-gray-800">{caste}</td>
                    <td className="px-6 py-4">{row.count ?? row.total ?? 0}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleExpand(caste)}
                        className="text-cyan-600 hover:text-cyan-800 text-xl"
                      >
                        {isOpen ? <IoChevronUp /> : <IoChevronDown />}
                      </button>
                    </td>
                  </tr>

                  {isOpen && (
                    <tr>
                      <td
                       colSpan={3} className="px-6 py-4 bg-gray-50"
                       onDoubleClick={() => toggleExpand(caste)}
                       >
                        <div className="overflow-x-auto overflow-y-auto max-h-[400px] border rounded-md">
                          <table className="min-w-full text-sm">
                            <thead className="bg-gray-200">
                              <tr>
                                {users.length > 0 &&
                                  Object.keys(users[0]).map((key) => (
                                    <th key={key} className="px-4 py-2 text-left">
                                      {key.replace(/_/g, " ").toUpperCase()}
                                    </th>
                                  ))}
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((user, i) => (
                                <tr
                                  key={i}
                                  className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}
                                >
                                  {Object.keys(user).map((key) => (
                                    <td key={key} className="px-4 py-2">
                                      {user[key] || <i className="text-gray-400">N/A</i>}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-between mt-4">
                          <button
                            disabled={page === 1}
                            onClick={() => handlePageChange(caste, "prev")}
                            className={`px-4 py-2 rounded ${
                              page === 1
                                ? "bg-gray-300 text-gray-500"
                                : "bg-cyan-600 text-white hover:bg-cyan-700"
                            }`}
                          >
                            Prev
                          </button>
                          <span className="text-gray-700">
                            Page {page} of {totalPages}
                          </span>
                          <button
                            disabled={page >= totalPages}
                            onClick={() => handlePageChange(caste, "next")}
                            className={`px-4 py-2 rounded ${
                              page >= totalPages
                                ? "bg-gray-300 text-gray-500"
                                : "bg-cyan-600 text-white hover:bg-cyan-700"
                            }`}
                          >
                            Next
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default CasteWiseTable;
