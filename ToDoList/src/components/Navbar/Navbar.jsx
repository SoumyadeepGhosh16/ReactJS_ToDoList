import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-violet-950 text-white ">
        <div className="logo">
           <span className="font-bold text-xl mx-8 p-8 ">iTask</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all duration-200 p-7">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all duration-200 p-7">Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
