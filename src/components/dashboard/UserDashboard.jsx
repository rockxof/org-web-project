import TableHeader from '../pages/TableHeader';
import SignOut from '../navbar/SignOut';
import NewDetails from '../pages/NewDetails';
import UsersAddForm from '../section/UsersAddForm';
import { useEffect } from 'react';

const UserDashboard = () => {

  return (
    <>
     < SignOut />
    {/* < TableHeader /> */}
    {/* <NewDetails /> */}
    <UsersAddForm />
  </>
  )
}

export default UserDashboard