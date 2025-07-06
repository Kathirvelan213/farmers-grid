import { useNavigate } from 'react-router-dom'
import '../styles/UsersPage.css'

export function UsersList({users}){
    return(
        <div className='usersList'>
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
            {users.map(user=><UserInfoRecord key={user.id} user={user}/>)}
        </div>
    )
}

function UserInfoRecord({user}){
    const navigate=useNavigate();
    return(
        <div className='userInfoRecord'>
            <div className='profileTopBar'>
                <img className='profilePic' src='/BlankProfilePic.jpg'/>
                <div className='nameDiv'>
                    <label className='font-bold'>{user.userName}</label>
                    <label className='leading-none'>seller</label>
                </div>
            </div>
            <div className='profileMiddleBar'>
                <div>
                location

                </div>
                <div>

                percentage match
                distance?
                </div>
            </div>
            <div className='bottomBar'>
                <button className='w-[48%] bg-gray-400'>Message</button>
                <button className='w-[48%] bg-green-400' onClick={()=>navigate(`/user/${user.userName}`)}>View</button>
            </div>
        </div>
    )
}



