import React from 'react'

const Navbar = () => {
  return (
   
  <nav className='bg-violet-800 flex justify-between text-white py-2'>
    <div className="logo">
      <span className="font-bold text-xl mx-8">iTask</span>
    </div>
    <ul className="flex gap-5 mx-9">
<li className='cursor-pointer hover:font-bold transition-all transition-3'>Home</li>
<li className='cursor-pointer hover:font-bold transition-all transition-3'>Your Task</li>
    </ul>
  </nav>
  )
}

export default Navbar
