import { useEffect, useState, useMemo } from "react";
import { useUsersData } from "../../context/AuthContext";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router";

const AgeWiseTable = () => {
  const [ageTable, setAgeTable] = useState([]);
  const [count, setCount] = useState(0);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(31);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [debouncedMinAge, setDebouncedMinAge] = useState(minAge);
  const [debouncedMaxAge, setDebouncedMaxAge] = useState(maxAge);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(250);

  const { fetchByAgeRange } = useUsersData();
  const navigate = useNavigate();

  // debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMinAge(minAge);
      setDebouncedMaxAge(maxAge);
    }, 900); //

    return () => clearTimeout(handler); // cleanup timeout
  }, [minAge, maxAge]);

  useEffect(() => {
    const fetchData = async () => {
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count, genderCounts } = await fetchByAgeRange(
        minAge,
        maxAge,
        from,
        to
      );
      if (data) {
        setAgeTable(data);
        setCount(count);

        const males =
          genderCounts.find((g) => g.gender?.toLowerCase() === "m")?.total || 0;
        const females =
          genderCounts.find((g) => g.gender?.toLowerCase() === "f")?.total || 0;

        setMaleCount(males);
        setFemaleCount(females);
      }
    };
    fetchData();
  }, [debouncedMinAge, debouncedMaxAge, currentPage, pageSize]);

  useEffect(() => {
  setCurrentPage(1);
}, [debouncedMinAge, debouncedMaxAge]);

  const tableHeader = useMemo(() => {
    return ageTable.length > 0 ? Object.keys(ageTable[0]) : [];
  }, [ageTable]);

  const formatHeader = (header) => {
    return header
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Age-wise Data Table
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-700">
            <span>
              Total: <strong>{count}</strong>
            </span>
            <span>
              Males: <strong className="text-blue-600">{maleCount}</strong>
            </span>
            <span>
              Females: <strong className="text-pink-600">{femaleCount}</strong>
            </span>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-5xl cursor-pointer h-fit rounded-4xl text-cyan-600 hover:text-cyan-700"
          >
            <IoArrowBackCircle />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">
              Min Age
            </label>
            <input
              type="number"
              value={minAge}
              onChange={(e) => setMinAge(Number(e.target.value))}
              className="border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">
              Max Age
            </label>
            <input
              type="number"
              value={maxAge}
              onChange={(e) => setMaxAge(Number(e.target.value))}
              className="border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {ageTable.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-gray-500 text-xl mb-6">No data available</div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
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
                  {ageTable.map((user, index) => (
                    <tr
                      key={index}
                      className={`transition-all duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-cyan-50`}
                    >
                      {tableHeader.map((header) => (
                        <td
                          key={header}
                          className="px-6 py-4 text-gray-700 whitespace-nowrap"
                        >
                          {user[header] || (
                            <span className="text-gray-400 italic">N/A</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

                  <div className="flex justify-between items-center mt-4">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-cyan-600 text-white rounded disabled:opacity-50"
  >
    Previous
  </button>
  <span className="text-gray-700">
    Page <strong>{currentPage}</strong> of{" "}
    <strong>{Math.ceil(count / pageSize)}</strong>
  </span>
  <button
    onClick={() =>
      setCurrentPage((prev) =>
        prev < Math.ceil(count / pageSize) ? prev + 1 : prev
      )
    }
    disabled={currentPage >= Math.ceil(count / pageSize)}
    className="px-4 py-2 bg-cyan-600 text-white rounded disabled:opacity-50"
  >
    Next
  </button>
</div>


            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeWiseTable;
