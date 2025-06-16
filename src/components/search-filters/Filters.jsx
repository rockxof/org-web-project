import { useEffect, useState } from "react"
import DistrictsList from "./DistrictsList"
import StatesList from "./StatesList"
import { biharConstituencies } from "./AssemblyList"

const AcMenu = () =>{

  return(
    <select name="" >
      {biharConstituencies.map(dist =>{
        (
          <option value={dist}>{dist}</option>
        )
      })}
    </select>
  )
}


const Filters = () => {
    const [state, setState] = useState("")
    const [district, setDistrict] = useState("")

    useEffect(()=>{

    },[])
     

  return (
    <>
    <div className="flex justify-between px-8">

    <StatesList setState= {setState}/>
    {state === "Bihar" && <DistrictsList setDistrict={setDistrict}/>}
    {district === "Muzaffarpur" && <AcMenu />}
    <button className="bg-blue-700/20 px-5 py-2 rounded-xl font-medium cursor-pointer">Find</button>
    </div>
    </>
  )
}

export default Filters