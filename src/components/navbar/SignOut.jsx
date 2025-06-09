import { useNavigate } from 'react-router';
import { UserAuth } from '../../context/AuthContext';

const SignOut = () => {

    const { signOut, userRole } = UserAuth()
    const navigate = useNavigate();


    const handleSignOut = async () => {
    // console.log("Logout session ", session);
    try{
      await signOut();
      navigate("/login");
    }
    catch(err){
      console.log(err);
      
    }
  };
  return (
      <>
    <div>
      <p
        onClick={handleSignOut}
        className="bg-red-600 p-3 w-24  ml-auto mt-2 mr-2 rounded-xl font-medium cursor-pointer"
      >
        Sign Out
      </p>
      <h1 className="text-blue-900/70 text-center font-bold text-4xl first-letter:uppercase">
        {userRole} DashBoard
      </h1>
      <h4 className="text-amber-300 text-2xl">Hello <span className='first-letter:uppercase'>{userRole}</span></h4>
    </div>
    </>
    )
}

export default SignOut