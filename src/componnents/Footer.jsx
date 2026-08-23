import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'
export default function Footer () {
    const {theme,setTheme}=useContext(ThemeContext)
    return (
         <div className={` ${theme==="light" ? "bg-black " : "bg-gray-600 "}`}>
            <div className={`w-screen flex items-center justify-center  h-[15vh]`}>
                <span className="text-gray-400 text-md">@copyright 2026</span>   
            </div>
         </div>
    )
}
