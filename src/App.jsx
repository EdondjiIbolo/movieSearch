import {  useEffect, useState , useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useSearch(){
  const [search , setUpdateSearch] = useState('')
  const [error,setError] = useState(null)
  const isFirstInput = useRef(true)
  useEffect(()=>{
    if(isFirstInput.current){
      isFirstInput.current = search == ''
      return
    }
    if(search==''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if(search.length < 4){
      setError('La busqueda debe tener al menos 4 caracteres')
      return
    }
    setError(null)
  },[search])
  return { search , setUpdateSearch , error}
}

function App() {
  const [sort , setSort] = useState(false)
  const {setUpdateSearch , search , error} = useSearch()
  const { getMovies , movies} = useMovies({search , sort})

  const handlesubmit =(event)=>{
    event.preventDefault()
    getMovies()
  }
  const handlechange =(event)=>{
    const newSearch = event.target.value
    if(newSearch.startsWith(' ')) return
    setUpdateSearch(event.target.value)

  }
  const handleSort = ()=>{
    if(search=='')return
    setSort(!sort)
  }
  return (

    
    <div className='container'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form onSubmit={handlesubmit} className='form'>
          <input onChange={handlechange} value={search} type="text" placeholder='Avenger , Marvel , Limpia botas...' />
          <label htmlFor="time">
            <h3 style={{fontSize:'.5rem',color:'white'}}>filter by time</h3>
            <input id='time' type="checkbox" onChange={handleSort} checked={sort}/>
          </label>
          <button>Buscar</button>
        </form>
        {error && (
          <p style={{color:'red', fontSize:'.7rem',fontWeight:'bold'}}>{error}</p>
        )}
      </header>
      <main>
      <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
