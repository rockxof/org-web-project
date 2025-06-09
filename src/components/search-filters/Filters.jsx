import { useState } from "react"
import DistrictsList from "./DistrictsList"
import StatesList from "./StatesList"

const Filters = () => {
    const [state, setState] = useState("")
  return (
    <>
    <div className="flex justify-between px-8">

    <StatesList setState= {setState}/>
    {state === "Bihar" && <DistrictsList />}
    <button className="bg-blue-700/20 px-5 py-2 rounded-xl font-medium cursor-pointer">Find</button>
    </div>
    </>
  )
}

export default Filters