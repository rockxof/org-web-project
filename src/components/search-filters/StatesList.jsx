const StatesList = ({setState}) => {

  const handleClick = (e)=>{
    setState(e.target.value)
  }

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Madhya Pradesh",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Tripura",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman & Nicobar (UT)",
    "Chandigarh (UT)",
    "Dadra & Nagar Haveli and Daman & Diu (UT)",
    "Delhi [National Capital Territory (NCT)]",
    "Jammu & Kashmir (UT)",
    "Ladakh (UT)",
    "Lakshadweep (UT)",
    "Puducherry (UT)",
  ];
  return (
    <select name="states" id="states">
        {states.map((state, idx)=>{
            return(
                <option onClick={handleClick} key={idx} value={state}>{state}</option>
            )
        })}
    </select>
  )
};

export default StatesList;
