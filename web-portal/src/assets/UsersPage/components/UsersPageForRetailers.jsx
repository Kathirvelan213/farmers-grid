import '../styles/UsersPage.css'
import { useNavigate } from 'react-router-dom'

export function UsersPageForRetailers({users,matchScores}){
    return(
        <div className='usersPage'>
                <UsersList users={users}></UsersList>
            </div>
    )
}

function UsersList({users,matchScores}){
    return(
        <div className='usersList'>
            {users.map(user=><UserInfoRecord key={user.id} user={user} matchScores={matchScores}/>)}
        </div>
    )
}

function UserInfoRecord({user,matchScores}){
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