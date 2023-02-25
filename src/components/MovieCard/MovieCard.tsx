// npm packages
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../services/profileService'
import * as movieService from '../../services/movieService'

// components
import MovieForm from '../MovieForm/MovieForm';

// types
import { Movie } from '../../types/models'
import { MovieFormData, EditMovieFormData } from '../../types/forms';

const MovieCard = (): JSX.Element => {
  const { id } = useParams()
  let movie: Movie | null
  const [movies, setMovies] = useState<Movie[] | []>([])
  const [index, setIndex] = useState(0)
  const [formDisplay, setFormDisplay] = useState(false)
  const [editFormDisplay, setEditFormDisplay] = useState(false)

  const [formData, setFormData] = useState<MovieFormData>({
    name: '',
    releaseDate: '',
  })
  const [editFormData, setEditFormData] = useState<EditMovieFormData>({
    movieId: null,
    name: '',
    releaseDate: '',
  })

  if (movies) movie = movies[index]

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const data = await profileService.getProfile(id)
        setMovies(data.movies)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMovies()
  }, [id])

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setEditFormData({
          movieId: movie!?.id,
          name: movie!?.name,
          releaseDate: movie!?.releaseDate!?.toString(),
        })
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovieData()
  }, [movie!?.id])
  
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

  function displayForm(evt: React.MouseEvent): void {
    (evt.target as HTMLButtonElement).textContent === '+'
    ?
    (evt.target as HTMLButtonElement).textContent = '-'
    :
    (evt.target as HTMLButtonElement).textContent = '+'

    formDisplay
    ?
    setFormDisplay(false)
    :
    setFormDisplay(true)
  }

  async function handleChange(evt: ChangeEvent<HTMLInputElement>): Promise<void> {
    setFormData({
      ...formData, [evt.target.name]: evt.target.value
    })
  }

  async function handleEditForm(evt: ChangeEvent<HTMLInputElement>): Promise<void> {
    setEditFormData({
      ...editFormData, [evt.target.name]: evt.target.value
    })
  }

  async function handleSubmit(evt: FormEvent<HTMLFormElement>): Promise<void> {
    evt.preventDefault()
    const newMovie = await movieService.createMovie(formData)
    setFormData({
      name: '',
      releaseDate: ''
    })
    setMovies([...movies!, newMovie])
    setIndex(movies!?.length)
  }

  function handleEdit(evt: React.MouseEvent): void {
    (evt.target as HTMLButtonElement).textContent === 'Edit'
    ?
    (evt.target as HTMLButtonElement).textContent = 'Cancel'
    :
    (evt.target as HTMLButtonElement).textContent = 'Edit'

    editFormDisplay
    ?
    setEditFormDisplay(false)
    :
    setEditFormDisplay(true)
  }

  async function handleUpdate(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    const updatedMovie = await movieService.updateMovie(editFormData)
    console.log(editFormData);
    setMovies(movies!?.map(m => m.id === editFormData.movieId ? updatedMovie : m))
  }

  async function handleDelete(): Promise<void> {
    await movieService.deleteMovie(movie!.id)
    setMovies(movies.filter(m => m.id !== movie!.id))
    setIndex(movies.length - 2)
  }
  
  if (!movies) return <h2>Loading...</h2>
  return (
    <>
      <h2>Favorite Movies</h2>
      <h3>{index + 1} of {movies.length}</h3>
      {!formDisplay && <button onClick={handleEdit}>Edit</button>}
      {!editFormDisplay && <button onClick={displayForm}>+</button>}
      <button onClick={handleDelete}>X</button>

      {editFormDisplay &&
        <MovieForm
          formData={editFormDisplay ? editFormData : formData}
          handleChange={handleEditForm}
          handleSubmit={handleUpdate}
        />
      }
      
      {formDisplay &&
        <MovieForm
          formData={editFormDisplay ? editFormData : formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      }

      {!formDisplay && !editFormDisplay &&
        <>
          {movies.length
          ?
            <>
              <p>Title: {movie!?.name}</p>
              <p>Released: {movie!?.releaseDate}</p>
              <button onClick={handleClick}>
                Prev Movie
              </button>
              <button onClick={handleClick}>
                Next Movie
              </button>
            </>
          :
            <p>Add Some Movies!</p>
          }
        </>
      }
    </>
  )
}

export default MovieCard