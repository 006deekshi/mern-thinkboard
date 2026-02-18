import React from 'react'
import {Link} from "react-router"
import {PlusIcon } from "lucide-react"

const Navbar = () => {
  return (
    <header className='nav-bar'>
        <div className='navbar-content'>
           <div>
            <h1 className='title'>
            ThinkBoard
           </h1>
           </div>
           <div className='button'>
            <Link to={"/create"} className="note-btn">
            <PlusIcon className='plus-icon'/>
            <span>New Note</span>
            </Link>
           </div>
        </div>
    </header>
  )
}

export default Navbar