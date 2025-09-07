import '../styles/UsersPage.css'
import { useNavigate } from 'react-router-dom'

export function UsersPageForRetailers({sellers,matchScores,handleMessageClick}){
    if(Object.keys(sellers).length==0||Object.keys(matchScores).length==0){
        return(
            <div>loading</div>
        )
    }
    return(
        <div className='usersPage'>
            <UsersList sellers={sellers} matchScores={matchScores} handleMessageClick={handleMessageClick}></UsersList>
        </div>
    )
}

function UsersList({sellers,matchScores,handleMessageClick}){
    return(
        <div className='usersList'>
            {sellers.map(seller=><UserInfoRecord key={seller.id} seller={seller} matchScores={matchScores[seller.id]} handleMessageClick={handleMessageClick}/>)}
        </div>
    )
}

function UserInfoRecord({seller,matchScores,handleMessageClick}){
    const navigate=useNavigate();
    return(
        <div className='userInfoRecord'>
            <div className='profileTopBar'>
                <img className='profilePic' src='/BlankProfilePic.jpg'/>
                <div className='nameDiv'>
                    <label className='font-bold'>{seller.userName}</label>
                    <label className='leading-none'>seller</label>
                </div>
            </div>
            <div className='profileMiddleBar'>

                <div>

                    DISTANCE {matchScores.distance}
                    <br></br>
                    LATITUDE {seller.latitude}
                    <br></br>
                    LONGITUDE {seller.longitude}
                    <br></br>
                    MATCHED PRODUCTS {matchScores.matchedProductCount}
                    <br></br>
                    TOTAL PRODUCTS WANTED {matchScores.productMatchScoreForRetailer==0?0:matchScores.matchedProductCount/matchScores.productMatchScoreForRetailer}
                    
                </div>
            </div>
            <div className='bottomBar'>
                <button className='w-[48%] bg-gray-400' onClick={()=>{handleMessageClick(seller.id);}}>Message</button>
                <button className='w-[48%] bg-green-400' onClick={()=>navigate(`/user/${seller.userName}`)}>View</button>
            </div>
        </div>
    )
}