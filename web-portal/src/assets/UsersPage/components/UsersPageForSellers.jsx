import '../styles/UsersPage.css'
import { useNavigate } from 'react-router-dom'

export function UsersPageForSellers({retailers,matchScores}){    
    return(
        <div className='usersPage'>
                <UsersList retailers={retailers} matchScores={matchScores}></UsersList>
            </div>
    )
}

function UsersList({retailers,matchScores}){
    return(
        <div className='usersList'>
            {retailers.map(retailer=><UserInfoRecord key={retailer.id} retailer={retailer} matchScores={matchScores[retailer.id]}/>)}
        </div>
    )
}

function UserInfoRecord({retailer,matchScores}){
    const navigate=useNavigate();
    return(
        <div className='userInfoRecord'>
            <div className='profileTopBar'>
                <img className='profilePic' src='/BlankProfilePic.jpg'/>
                <div className='nameDiv'>
                    <label className='font-bold'>{retailer.userName}</label>
                    <label className='leading-none'>retailer</label>
                </div>
            </div>
            <div className='profileMiddleBar'>

                <div>

                    DISTANCE {matchScores.distance}
                    <br></br>
                    LATITUDE {retailer.latitude}
                    <br></br>
                    LONGITUDE {retailer.longitude}
                    <br></br>
                    MATCHED PRODUCTS {matchScores.matchedProductCount}
                    <br></br>
                    TOTAL PRODUCTS WANTED {matchScores.matchedProductCount/matchScores.productMatchScoreForRetailer}
                    
                </div>
            </div>
            <div className='bottomBar'>
                <button className='w-[48%] bg-gray-400'>Message</button>
                <button className='w-[48%] bg-green-400' onClick={()=>navigate(`/user/${retailer.userName}`)}>View</button>
            </div>
        </div>
    )
}