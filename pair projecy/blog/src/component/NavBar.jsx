import React from 'react'
import './css/Navbar.css'
function NavBar({fn}) {
  return (
 <nav className='navbar'>
    <div className="nav-wrapper">

            <ul className="nav-mobile">
                <li onClick={()=>{fn("Allblogs")}}>Home</li>
                <li onClick={()=>{fn("create")}}>Create Now Post</li>
                <li onClick={()=>{fn("login")}}>Singout</li>
            </ul>
            
       
    </div>
 </nav>
  )
}

export default NavBar
