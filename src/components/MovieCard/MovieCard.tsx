// npm packages
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../services/profileService'
import * as movieService from '../../services/movieService'

// components
import MovieForm from '../MovieForm/MovieForm';
import MovieDetails from './MovieDetails/MovieDetails';

// styles
import styles from '../../pages/ProfileDetails/ProfileDetails.module.css'

// types
import { Movie } from '../../types/models'
import { MovieFormData, EditMovieFormData } from '../../types/forms';

// props
import { MovieCardProps } from '../../types/props';

const MovieCard = (props: MovieCardProps): JSX.Element => {
  const { id } = useParams()
  const { user, profile } = props
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

  function displayForm(): void {
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
    setEditFormDisplay(false)
    setFormDisplay(false)
  }

  function handleEdit(): void {
    editFormDisplay
    ?
    setEditFormDisplay(false)
    :
    setEditFormDisplay(true)
  }

  async function handleUpdate(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    const updatedMovie = await movieService.updateMovie(editFormData)
    setMovies(movies!?.map(m => m.id === editFormData.movieId ? updatedMovie : m))
    setFormDisplay(false)
    setEditFormDisplay(false)
  }

  async function handleDelete(): Promise<void> {
    await movieService.deleteMovie(movie!.id)
    setMovies(movies.filter(m => m.id !== movie!.id))
    setIndex(movies.length - 2)
  }

  if (!movies) return <h2>Loading...</h2>
  return (
    <div className={styles.card}>
      <h2>Favorite Movies</h2>
      <MovieDetails
        user={user}
        profile={profile}
        movies={movies}
        movie={movie!}
        index={index}
      />

      {/* {user?.id === profile?.id
      ?
      <>
        {!editFormDisplay &&
          <button onClick={displayForm}>
            {formDisplay ? 'Cancel' : 'Add'}
          </button>
        }
        {formDisplay &&
          <MovieForm
            formData={editFormDisplay ? editFormData : formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        }
      </>
      :
      ''
      }
      {movies.length
      ?
      <>
        {user?.id === profile?.id
        ?
        <>
        {!formDisplay &&
          <button onClick={handleEdit}>
            {editFormDisplay ? 'Cancel' : 'Edit'}
          </button>
        }
        {editFormDisplay &&
          <MovieForm
            formData={editFormDisplay ? editFormData : formData}
            handleChange={handleEditForm}
            handleSubmit={handleUpdate}
          />
        }
        </>
        :
        ''
        }
        {!formDisplay && !editFormDisplay &&
          <>
            {user?.id === profile?.id
            ?
            <button onClick={handleDelete}>Delete</button>
            :
            ''
            }
            <h3>{movie!?.name}</h3>
            <h4>{index + 1} of {movies.length}</h4>
            <p>Released: {movie!?.releaseDate}</p>
            <button onClick={handleClick}>Prev Movie</button>
            <button onClick={handleClick}>Next Movie</button>
          </>
        }
      </>
      :
      <>
        {user?.id === profile?.id
        ?
        <>
          {!formDisplay && <p>Add Some Movies!</p>}
        </>
        :
        <h3>This user hasn't added movies yet!</h3>
        }
      </>
      } */}
    </div>
  )
}

export default MovieCard