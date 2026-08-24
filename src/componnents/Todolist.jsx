import React from 'react'
import { useState ,useRef,useEffect,useMemo,useContext} from 'react'
import ThemeBtn from './ThemeBtn';
import { ThemeContext } from './ThemeProvider';


export default function Todolist () {
  //recuperation du contexte theme
  const {theme,toggleTheme}=useContext(ThemeContext);
  const [tasks,setTasks]=useState([]);
  const [tachesFiltrer,setTachesFiltrer]=useState([]);
  const [task,setTask]=useState('');
  const [text,setText]=useState('');
  const inputRef=useRef(null);
  
  //tableau categorie
  const Categories=["Education","Société","Actualité"]
  const [categorie,setCategorie]=useState("Education");
  
  const [currentTask,setCurrentTask]=useState();
  const [openModal,setOpenModal]=useState(false);
  const [categorieChoisi,setCategorieChoisi]=useState('');
  //Gestion totale des erreurs 
  const [error,setError]=useState({empty:false,full:false,editInputIsEmpty:false}); 

  const triggerError = name =>{
   setError(prev=>({...prev,[name]:true}))
   //desactiver le message d'erreur
   setTimeout(() => {
      setError(prev=>({...prev,[name]:false}));
   }, 3000);
  }
  //ajouter une nouvelle tache!
  function AjouterTache() {
    if(task.trim()==='') return triggerError('empty');
    if(tasks.length>=3) return triggerError('full');
    
    const element={
      id:Date.now(),
      text:task.trim(),
      done:false,
      categorie:categorie
    }
    setTasks(prev =>[...prev,element]);
    setTask('');
    inputRef.current.focus();
    setCategorieChoisi(categorieChoisi);
  }

  //Terminer une tache
  function SetDone(id) {
    setTasks(tasks.map(t=>(t.id===id? {...t, done: !t.done} :t)))
  }

  //ouvrir la modale
  function toggleModal(element){
    setOpenModal(!openModal);
    setCurrentTask(element);

  }

  //Editer la tache
function EditerTache() {
  if(currentTask.text.trim()==='')return triggerError('editInputIsEmpty');

  
  setTasks(tasks.map(n=>
    n.id===currentTask.id ? currentTask : n
  ))
  setOpenModal(!openModal);
  return setCurrentTask(null);
}
  //Supprimer une tache
  function DeleteTask(id) {
    setTasks(tasks.filter(t=>(t.id!==id)))
  }
//filtrer les taches lorsque  lutilisateur choisi sa categorie
  useEffect(()=>{
     setTachesFiltrer(tasks.filter(task=>(categorieChoisi === task.categorie || categorieChoisi === '')))
  },[categorieChoisi,tasks])

//rechercher une tache parmi les taches visibles 
useMemo(()=>{
   setTachesFiltrer(tasks.filter(task=>(task.text.includes(text.trim()) || text.trim() ==='')))
},[text,tasks])
  return (
    <>
      {/*modale permettant la modification de la tache*/
        openModal &&
        <div  className="h-screen w-screen fixed  bg-[#00000066] z-9999 grid place-items-center transition-all duration-300 ease-in ">
          <div className={`grid gap-2 ${theme==="dark"? "bg-gray-800" :"bg-gray-50"} p-8 rounded-lg w-[75vw]`} >
                  <span className={`font-bold text-lg ${theme==="dark"? "" :"text-gray-600"}`}>Modifier votre tache</span>
                  <input
                    value={currentTask.text}
                    onInput={(e)=>setCurrentTask(prev=>({...prev, text:e.target.value}))}
                    type="text" 
                    placeholder='Editez votre tache...'
                    className={`mt-5 bg-transparent border-2 ${theme==="dark"? "" :"placeholder:text-gray-400 text-gray-600"}  border-[#121212] pt-1 pb-0.5 px-2 rounded-md focus:outline-none focus:shadow-sm focus:shadow-[#121212] `}
                  />
                  <div className={`flex gap-2 flex-wrap w-[60vw] ${theme==="dark"? "" :"text-gray-600"} `}>
                    {Categories.map((n)=>
                          <div className='flex gap-1' key={n}>
                            <input type="radio" name="categorie2" id="" value={n} checked={n === currentTask.categorie} className='w-4 cursor-pointer' onChange={()=>setCurrentTask(prev=>({...prev, categorie:n}))} />
                            <label htmlFor={n}>{n} </label>
                          </div>
                    )}
                  </div>
                  <button
                    onClick={()=>EditerTache()}
                    className='w-[60vw] bg-green-700 rounded-sm pt-0.5 pb-0.5 text-md font-bold cursor-pointer hover:bg-green-900'
                  >
                    ✅
                  </button>
                  <span className='block text-md text-center text-red-500 font-bold  '>
                      {error.editInputIsEmpty && "veuiller remplir correctement le champ de texte"}
                  </span>
          </div>
        </div> 
      }
      <div className={`flex justify-center items-center  min-h-screen ${theme==="dark"? "bg-gray-800" :"bg-gray-50"}`}>
          <div className=''> 
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className={`font-bold text-xl ${theme==="light" && "text-gray-800"}`}>Mes taches journalières </h1>
                        <span className={`text-sm text-gray-300  ${theme==="light" && "text-gray-500"}`}>Aujourd'hui</span>
                    </div>
                    <ThemeBtn  />
                </div>
                <div className='grid gap-2 '>
                  <input
                    value={task}
                    onInput={(e)=>setTask(e.target.value)}
                    ref={inputRef}
                    type="text" 
                    placeholder='Ajouter une tache...'
                    className={` md:w-[60vw] mt-5  bg-transparent border-2 ${theme==="dark"? "" :"placeholder:text-gray-400 text-gray-600"}  border-[#121212] pt-1 pb-0.5 px-2 rounded-md focus:outline-none focus:shadow-sm focus:shadow-[#121212] `}
                  />
                  <div className={`flex gap-2 flex-wrap w-[85vw] md:w-[60vw] ${theme==="dark"? "" :"text-gray-600"} `}>
                    {Categories.map((n)=>
                          <div className='flex gap-1' key={n}>
                            <input type="radio" name="categorie" id="" value={n} checked={n === categorie} className='w-4 cursor-pointer' onChange={()=>setCategorie(n)} />
                            <label htmlFor={n}>{n}</label>
                          </div>
                    )}
                  </div>
                  <button
                    onClick={()=>AjouterTache()}
                    className=' md:w-[60vw] bg-green-700 rounded-sm pt-0.5 pb-0.5 text-md font-bold cursor-pointer hover:bg-green-900'
                  >
                    Ajouter
                  </button>
                  <span className='block text-md text-center text-red-500 font-bold  '>
                      {error.empty && "veuillez remplir correctement le champ de texte"}
                      {error.full && "limite de taches atteinte"}
                  </span>
                </div>
                <div className='grid gap-1.5'>
                    <input 
                      type="text" 
                      onInput={(e)=>setText(e.target.value)}
                      placeholder='Rechercher une tache...'
                      className={`mt-5 md:w-[60vw] bg-transparent border-2 ${theme==="dark"? "" :"placeholder:text-gray-400 text-gray-600"}  border-[#121212] pt-1 pb-0.5 px-2 rounded-md focus:outline-none focus:shadow-sm focus:shadow-[#121212] `}
                    />
                    <div className={`flex gap-2 flex-wrap w-[85vw] md:w-[60vw] ${theme==="dark"? "" :"text-gray-600"} `}>
                      <div className='flex gap-1'>
                              <input type="radio" name="categorieshow" id="" value={"tous"} checked={categorieChoisi === ''} className='w-4 cursor-pointer' onChange={()=>setCategorieChoisi('')} />
                              <label htmlFor={"Tous"}>Tous</label>
                      </div> 
                      {Categories.map((n)=>
                            <div className='flex gap-1' key={n}>
                              <input type="radio" name="categorieshow" id="" value={n} checked={n === categorieChoisi} className='w-4 cursor-pointer' onChange={()=>setCategorieChoisi(n)} />
                              <label htmlFor={n}>{n}</label>
                            </div>
                      )}
                  </div>
                    <div className=''>
                        {tachesFiltrer.map((task) =>
                            <div
                              key={task}
                              className='flex gap-1 w-[85vw] md:w-[60vw] pt-1 pb-1'
                            >
                              <input 
                                onChange={()=>SetDone(task.id)}
                                type="checkbox" 
                                checked={task.done} 
                                className='bg-amber-500 w-5 mx-1 cursor-pointer'
                            />
                            <span 
                                className={`${task.done && 'line-through text-gray-400!'} block flex-8 text-xl ${theme==="dark"? "" :"text-gray-800"} `}
                            >
                              {task.text}
                            </span>
                            <button 
                              className={`flex-1 p-1 px-2 rounded-sm ${task.done ? 'bg-gray-600 cursor-no-drop ':'bg-green-700 cursor-pointer hover:bg-green-900'}`}
                              onClick={()=>toggleModal(task) }
                              disabled={task.done}
                            >
                              ✏️
                            </button>
                            <button 
                              className='flex-1 p-1 px-2 bg-red-800 rounded-sm cursor-pointer hover:bg-red-950 '
                              onClick={()=>DeleteTask(task.id) }
                            >
                              ❌
                            </button>
                            
                            </div>
                          
                        )}
                    </div>
                    <span className='block text-center text-gray-400'>
                      {!tachesFiltrer.length && "Liste vide"}
                    </span>

                    {tachesFiltrer.length>0 && 
                         <span className={`block  text-gray-300 ${theme==="dark"? "" :"placeholder:text-gray-400 text-gray-600"}`}>
                          {`${tachesFiltrer.filter(task=>task.done).length}
                            terminée(s) sur 
                            ${tachesFiltrer.length}
                          `}
                        </span>
                    }
                </div>
          </div>
      </div>
  </>  
  )
}


