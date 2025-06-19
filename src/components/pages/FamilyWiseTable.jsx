import { useEffect, useMemo, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useUsersData } from "../../context/AuthContext";

const FamilyWiseTable = () => {
  const {
    fetchFamilyWise,
    setSearchColumn,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useUsersData();

  const [usersData, setUsersData] = useState([]);
  const [counts, setCounts] = useState({ total: 0 });

  const navigate = useNavigate();

  const loadFamilyWiseData = async () => {
    const { data, count } = await fetchFamilyWise();
    if (data) {
      setUsersData(data);
      setCounts({ total: count });
    }
  };

  useEffect(() => {
    loadFamilyWiseData();
  }, []);

  const groupedData = useMemo(() => {
    if (!usersData || usersData.length === 0) return [];

    const houseGroups = {};
    usersData.forEach((user) => {
      const house = user.HouseNo || "Unknown";
      if (!houseGroups[house]) {
        houseGroups[house] = [];
      }
      houseGroups[house].push(user);
    });

    const sortedHouses = Object.keys(houseGroups).sort();
    let toggle = false;
    const result = [];

    sortedHouses.forEach((house) => {
      toggle = !toggle;
      const groupColor = toggle ? "bg-cyan-100" : "bg-sky-100";
      const groupMembers = houseGroups[house];

      result.push({
        isGroupHeader: true,
        houseNo: house,
        groupCount: groupMembers.length,
        groupColor,
      });

      groupMembers.forEach((member) => {
        result.push({
          ...member,
          isGroupHeader: false,
          groupColor,
        });
      });
    });

    return result;
  }, [usersData]);

  const tableHeader = useMemo(() => {
    let keyOfArr;
    if (usersData.length > 0) {
      keyOfArr = Object.keys(usersData[0]);
    } else {
      keyOfArr = [];
    }

    if (keyOfArr.length > 11) {
      const [item] = keyOfArr.splice(11, 1);
      keyOfArr.unshift(item);
    }

    return keyOfArr;
  }, [usersData]);

  const formatHeader = (header) => {
    return header
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const dataPerPage = 250;
  const fromRecord = currentPage * dataPerPage + 1;
  const toRecord = Math.min((currentPage + 1) * dataPerPage, counts.total || 0);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              User Data Dashboard
            </h1>
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-cyan-600">
                {usersData.length} <span className="text-gray-600">of</span>{" "}
                {counts.total}
              </span>{" "}
              records
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-5xl cursor-pointer h-fit rounded-4xl text-cyan-600 hover:text-cyan-700 "
          >
            <IoArrowBackCircle />
          </button>
        </div>

        {usersData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-gray-500 text-xl mb-6">No data available</div>
            <button
              onClick={loadFamilyWiseData}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md"
            >
              Load Sample Data
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Table controls */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
              <div className="relative mb-4 md:mb-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  onChange={(e) => {
                    setSearchColumn("HouseNo");
                    setSearch(e.target.value);
                    setCurrentPage(0);
                  }}
                  type="text"
                  placeholder="Search by House No..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-full md:w-64"
                />
              </div>

              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                    />
                  </svg>
                  Sort
                </button>
                <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filter
                </button>
              </div>
            </div>

            {/* Responsive table container */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyan-600 text-white">
                  <tr>
                    {tableHeader.map((header, idx) => (
                      <th
                        key={idx}
                        className="px-6 py-4 text-left font-semibold tracking-wider whitespace-nowrap"
                      >
                        <div className="flex items-center">
                          {formatHeader(header)}
                          <svg
                            className="h-4 w-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                          </svg>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {groupedData.map((item, index) => {
                    if (item.isGroupHeader) {
                      return (
                        <tr key={`header-${item.houseNo}`}>
                          <td
                            colSpan={tableHeader.length}
                            className={`px-6 py-3 font-bold text-gray-800 ${item.groupColor} text-lg border-t-4 border-cyan-300`}
                          >
                            🏠 House No: {item.houseNo} &nbsp;
                            <span className="text-sm font-medium text-gray-700">
                              ({item.groupCount}{" "}
                              {item.groupCount === 1 ? "member" : "members"})
                            </span>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr
                        key={item?.s_no || index}
                        className={`transition-all duration-150 hover:bg-cyan-200 ${item.groupColor}`}
                      >
                        {tableHeader.map((header) => (
                          <td
                            key={header}
                            className="px-6 py-4 text-gray-800 whitespace-nowrap"
                          >
                            {item[header] || (
                              <span className="text-gray-400 italic">N/A</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-sm text-gray-700 mb-4 md:mb-0">
                  Showing <span className="font-semibold">1</span> to{" "}
                  <span className="font-semibold">{usersData.length}</span> of{" "}
                  <span className="font-semibold">{usersData.length}</span>{" "}
                  results
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 0))
                    }
                    disabled={currentPage === 0}
                    className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage + 1 >= totalPages}
                    className="px-4 py-2 text-sm bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyWiseTable;
