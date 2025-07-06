import { useEffect, useState } from 'react'
import { UsersList } from './components/UserList'
import './styles/UsersPage.css'
import { getUsersAPI } from '../apiConsumer/usersAPI';

export function UsersPage(){
    const [allUsers,setAllusers]=useState();
    useEffect(()=>{
        const fetchUsers=async()=>{
            const result=await getUsersAPI();
            setAllusers(result.data);
            console.log(result.data);
        }
        fetchUsers();
    },[])
    return(
        <div className='usersPage'>
            <UsersList users={allUsers}></UsersList>
        </div>
    )
}