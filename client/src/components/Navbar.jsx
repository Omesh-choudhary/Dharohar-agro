import React from 'react'
import { NavLink } from 'react-router-dom'
import "../components/App.css"
function Navbar() {
  return (
    <header>

        <nav className='w-screen h-12 bg-blue-400/50  z-30  relative top-0'>
        <div className="navbar w-[100vw] mx-auto h-full flex justify-evenly mobile:justify-between items-center">
        <div className="logo h-[6vh] w-[6vh] my-auto ">
                
                </div>
                <div className="list list-none text-white flex justify-end items-center gap-[5vw] mobile:gap-[4vw] px-[1vw] py-[0.3vh] font-semibold text-[1.5vh] mobile:text-[2vh] ">
                    <li> <NavLink activeClassName="active"  className="list-none " to="/">Home</NavLink> </li>
                    <li> <NavLink activeClassName="active" className="list-none " to="/data">Data</NavLink> </li>
                    <li> <NavLink activeClassName="active" className="list-none " to="/contact">Contact</NavLink> </li>
                    <li> <button className=''><NavLink className="list-none text-" to="/logout">Logout</NavLink></button> </li>
                </div>
        </div>
           
        </nav>
    </header>
  )
}

export default Navbar