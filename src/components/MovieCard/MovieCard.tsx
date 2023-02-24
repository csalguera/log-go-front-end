// npm packages
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../services/profileService'
import * as movieService from '../../services/movieService'

// components
import MovieForm from '../MovieForm/MovieForm';

// types
import { Movie } from '../../types/models'
import { MovieFormData } from '../../types/forms';

const MovieCard = (): JSX.Element => {
  const { id } = useParams()
  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [index, setIndex] = useState(0)
  const [formDisplay, setFormDisplay] = useState(false)
  const [formData, setFormData] = useState<MovieFormData>({
    name: '',
    releaseDate: '',
  })

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

  function displayForm(): void {
    formDisplay
    ?
    setFormDisplay(false)
    :
    setFormDisplay(true)
  }

  async function handleChange(evt: ChangeEvent<HTMLInputElement>): Promise<void> {
    if (evt.target)
    setFormData({
      ...formData, [evt.target.name]: evt.target.value
    })
  }

  async function handleSubmit(evt: FormEvent<HTMLFormElement>): Promise<void> {
    evt.preventDefault()
    const newMovie = await movieService.createMovie(formData)
    if (movies) setMovies([...movies, newMovie])
  }
  
  const { name, releaseDate } = formData

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
        <h2>Favorite Movies</h2>
        <div>
          <button onClick={displayForm}>
            +
          </button>
          {
            formDisplay
            ?
            <MovieForm
              name={name}
              releaseDate={releaseDate}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            :
            <p>Add some movies</p>
          }
        </div>
      </>
    }
    </>
  )
}

export default MovieCard