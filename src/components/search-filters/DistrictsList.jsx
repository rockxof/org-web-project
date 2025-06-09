const DistrictsList = () => {
  const districts = [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur (Bhabua)",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger (Monghy)",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia (Purnea)",
    "Rohtas",
    "Samastipur",
    "Saharsa",
    "Sheohar	",
    "Sheikhpura	",
    "Saran",
    "Sitamarhi",
    "Supaul",
    "Siwan	",
    "Vaishali	",
    "West Champaran",
  ];
  return (
    <select name="districts" id="districts">
        {districts.map((district, idx)=>{
            return(
                <option value={district}>{district}</option>
            )
        })}
    </select>
  );
};

export default DistrictsList;
