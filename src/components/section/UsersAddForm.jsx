import { useEffect, useMemo, useState } from 'react';
import { useUsersData } from '../../context/AuthContext';

const UsersAddForm = () => {
  const { newUserData, addNewData } = useUsersData();

  const [newPerson, setNewPerson] = useState({})

  console.log(newPerson)

  const updateFields = useMemo(() => {
      return newUserData.length > 0 ? Object.keys(newUserData[0]) : [];
    }, [newUserData]);


    const handleSubmit = async(e)=>{
      e.preventDefault();

        addNewData(newPerson, setNewPerson)
  
    }



  return (
    <div className='bg-blue-950 p-5'>
        <h2 className='text-center font-semibold text-3xl'>User Details Update</h2>

      {/* form to add New Users data */}
      <form onSubmit={handleSubmit} className='m-4'>
      {updateFields.map((field, id)=>{
        return (
          <input type="text"
          key={id}
        placeholder= {field}
        onChange={e => 
          setNewPerson( prev => ({...prev, [field] : e.target.value}))
        }
        className='m-3 p-2.5 bg-red-50 rounded-xl'
       />
        )
      })}

        <button type='submit' className='block mx-auto bg-red-700/70 p-4 rounded-xl font-semibold'>Add Details</button>
      </form>
    </div>
  )
}

export default UsersAddForm