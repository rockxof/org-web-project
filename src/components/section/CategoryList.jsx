import { useUsersData } from "../../context/AuthContext";
import "../../index.css"
import { useNavigate } from "react-router"

const CategoryList = () => {
    const navigate = useNavigate();

    // dataContext API
    const {setSearchColumn} = useUsersData();
  return (
    <div className="grid alpe grid-cols-4 w-full gap-10 justify-items-center mt-8">
        <div onClick={() => {navigate('/voters-list'), setSearchColumn("EName")}} className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-red-400">Voters Lists</div>
        <div onClick={() => {navigate('/family-wise-list'), setSearchColumn("HouseNo")}} className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-violet-400">Family Wise List</div>
        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-blue-600">Caste Wise List</div>
        <div onClick={() => {navigate('/age-wise-list'), setSearchColumn("Age")}} className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-yellow-600">Age Wise List</div>
        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-rose-700">Area List</div>
        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-purple-700">Address Wise List</div>

        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-red-400">Gender Wise List</div>
        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-violet-400">Supporter Party</div>
        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-blue-600">Influencers</div>
        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-yellow-600">Residential Wise List</div>
        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-rose-700">Loyal Party Supporter</div>
        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-purple-700">Lorem, ipsum.</div>

        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-red-400">Lorem, ipsum dolor.</div>
        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-violet-400">Lorem, ipsum.</div>
        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-blue-600">ipsum.</div>
        <div className="grid-box w-48 text-center rounded-xl font-bold p-4 bg-yellow-600">dolor sit amet.</div>
    </div>
  )
}

export default CategoryList