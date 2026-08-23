import React from "react";
import { createContext,useState } from "react";

      const ThemeContext=createContext()
      const ThemeProvider = ({children}) => {
          const [theme,setTheme]=useState("dark");
          const toggleTheme=()=>{setTheme(prev=>prev==="dark" ? "light" : "dark")}
          return(
            <ThemeContext.Provider value={{theme,toggleTheme}}>
                {children}
            </ThemeContext.Provider>
          )
      }

export {ThemeContext,ThemeProvider}