
const GenderMenu = ({setGender}) => {
  return (
    <div className="text-center">
      <h1>DropDown Menu</h1>
      <select
        name="gender"
        id=""
        className="mt-4"
        onClick={(e) => setGender(e.target.value)}
      >
        <option value="">Select a gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
    </div>
  );
};

export default GenderMenu;
