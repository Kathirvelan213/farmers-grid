import '../styles/global.css'

export function Sidebar({iteems,className}){
    var items=['home','myproducts','chats','prices'];
    return (
        <div className={`sidebar ${className!=null?className:""}`}>
            {items.map((item,index)=>(
                <SidebarItem key={index} item={item}></SidebarItem>
            ))}
        </div>
    )
}

function SidebarItem({item}){
    return(
        <button className='sidebarItem'>{item}</button>
    )
}