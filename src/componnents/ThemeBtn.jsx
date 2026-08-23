import React from "react";
import { ThemeContext } from "./ThemeProvider";
export default function ThemeBtn (){
      const {theme,toggleTheme}=React.useContext(ThemeContext)
       return (
            <button className={`bg-white text-black rounded-md p-1 cursor-pointer ${theme==="light" && "bg-black! text-white!"}`} onClick={toggleTheme}>
                 {theme==="light" ? "☀️ clair" : "🌙 nuit"} 
            </button>
          
       )
}