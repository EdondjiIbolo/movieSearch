import responseMovies from '../mocks/resultados.json'
import noResponseMovies from '../mocks/no-resultado.json'
import { useState , useRef, useMemo} from 'react'
export  const useMovies =({search , sort})=>{
    const [searchMovie , setSearchMovies] = useState([])
    const movies = searchMovie?.Search
    const previusSearch = useRef(search)
    const mappedMovies = 
        movies?.map(movie=>({
            id:movie.imdbID,
            title:movie.Title,
            year:movie.Year,
            poster:movie.Poster
        }))
        const getMovies = ()=>{
            if(search == previusSearch.current) return
            if (search){

                // setSearchMovies(responseMovies)
                fetch(`https://www.omdbapi.com/?apikey=b6546aee&s=${search}`)
                .then(res => res.json())
                .then(respuesta=>setSearchMovies(respuesta))
                previusSearch.current = search

            }else{
                setSearchMovies(noResponseMovies)
            }
          }
    const sortMovies = useMemo(()=>{
       
        return sort 
        ? [...mappedMovies].sort((a,b)=>a.title.localeCompare(b.title))
        :mappedMovies
    },[sort , movies])
    
return { movies:sortMovies , getMovies }
}
