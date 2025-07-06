import { useEffect, useState } from 'react'
import { UsersList } from './components/UserList'
import './styles/UsersPage.css'
import { getUsersAPI } from '../apiConsumer/usersAPI';

export function UsersPage(){
    const [allUsers,setAllusers]=useState({});
    useEffect(()=>{
        const fetchUsers=async()=>{
            const result=await getUsersAPI();
            setAllusers(Object.fromEntries(result.data.map(user=>[user.id,user])));
        }
        fetchUsers();
    },[])
    return(
        <div className='usersPage'>
            <UsersList users={Object.values(allUsers)}></UsersList>
        </div>
    )
}