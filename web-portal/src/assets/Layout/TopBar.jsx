import { FaCog } from 'react-icons/fa'
import './styles/layout.css'

export function TopBar({className}){
    return(
        <div className={`topbar ${className??""}`}>
            <img src='/logo-no-text.png' className='appLogoForMenu'/>
            <p className="font-mono font-black text-green-800 text-3xl">FARMERS-GRID</p>
            <div className='flex-1 text-right'>
                <button><FaCog size={20} color='grey'/></button>
            </div>
        </div>
    )
}