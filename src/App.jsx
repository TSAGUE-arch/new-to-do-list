import { useState } from 'react'
import './App.css'
import Todolist from './componnents/Todolist'
import Footer from './componnents/Footer'
import { ThemeProvider } from './componnents/ThemeProvider'
export default function App() { 
  //const [theme,setTheme]=useState("dark");
  return (
    <ThemeProvider>
      <div>
        <Todolist />  
        <Footer />
      </div>
    </ThemeProvider>
  )
}


