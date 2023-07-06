/* eslint-disable react/prop-types */
 const RenderResult =({movies})=>{
    return(
      <ul className="movies">{
        movies.map(
        movie =>(
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p> 
            <img src={movie.poster} alt={movie.title} /> 
          </li>
         )
        )
      }
      </ul>
    )
  }
  const RenderNoResult =()=>{
    return(
      <h1>no hay peliculas con este titulo</h1>
    )
  }


  export function Movies ({movies}){
   
    const hasMovies = movies?.length > 0
 
    return(
        hasMovies ?  <RenderResult movies={movies} /> : <RenderNoResult/>
    )
  }