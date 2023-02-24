// npm packages
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../services/profileService'

// types
import { Movie } from '../../types/models'

const MovieCard = (): JSX.Element => {
  const { id } = useParams()
  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [index, setIndex] = useState(0)
  let movie
  if (movies) movie = movies[index]

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await profileService.getProfile(id)
        setMovies(data.movies)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMovies()
  }, [id])

  function handleClick(evt: React.MouseEvent): void {
    let btnContent: string | null = (evt.target as HTMLButtonElement).textContent

    if (btnContent === 'Prev Movie') {
      movies && index <= 0
      ?
      setIndex(movies.length - 1)
      :
      setIndex(index - 1)
    } else if  (btnContent === 'Next Movie') {
      movies && index >= movies.length - 1
      ?
      setIndex(0)
      :
      setIndex(index + 1)
    }
  }

  if (!movies) return <h2>Loading...</h2>
  return (
    <>
    {movies.length
      ?
      <div>
        <h2>Favorite Movies</h2>
        <p>Title: {movie?.name}</p>
        <p>Released: {movie?.releaseDate}</p>
        <button onClick={handleClick}>
          Prev Movie
        </button>
        <button onClick={handleClick}>
          Next Movie
        </button>
      </div>
      :
      <>
        <h2>No Movies</h2>
        <button>
          Add a movie
        </button>
      </>
    }
    </>
  )
}

export default MovieCard