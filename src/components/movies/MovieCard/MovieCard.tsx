// npm packages
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

// services
import * as movieService from '../../../services/movieService'

// components
import MovieForm from '../MovieForm/MovieForm';
import MovieDetails from '../MovieDetails/MovieDetails';
import CUDBtns from '../../CUDBtns/CUDBtns';
import NextPrevBtns from '../../NextPrevBtns/NextPrevBtns';

// mui components
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// styles
// import styles from '../../../pages/ProfileDetails/ProfileDetails.module.css'

// types
import { Movie } from '../../../types/models'
import { MovieFormData, EditMovieFormData } from '../../../types/forms';

// props
import { MovieCardProps } from '../../../types/props';

const MovieCard = (props: MovieCardProps): JSX.Element => {
  const { user, profile, movies, setMovies } = props
  let movie: Movie | null
  const [index, setIndex] = useState(0)
  const [formDisplay, setFormDisplay] = useState(false)
  const [editFormDisplay, setEditFormDisplay] = useState(false)

  const [formData, setFormData] = useState<MovieFormData>({
    name: '',
    director: '',
    releaseDate: '',
  })
  const [editFormData, setEditFormData] = useState<EditMovieFormData>({
    movieId: null,
    name: '',
    director: '',
    releaseDate: '',
  })

  if (movies) movie = movies[index]

  useEffect(() => {
    const editMovieData = async () => {
      try {
        setEditFormData({
          movieId: movie!?.id,
          name: movie!?.name,
          director: movie!?.director,
          releaseDate: movie!?.releaseDate!?.toString(),
        })
      } catch (error) {
        console.log(error);
      }
    }
    editMovieData()
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
      director: '',
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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://img.freepik.com/free-photo/solid-concrete-wall-textured-backdrop_53876-129493.jpg?w=360"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sample
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, fuga incidunt laboriosam officiis ipsa ducimus eius assumenda exercitationem nostrum cumque dolore non explicabo amet blanditiis ipsam qui asperiores tenetur consequatur.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    // <div className={styles.card}>
    //   <div className={styles["details-container"]}>
    //     <h2>Favorite Movies</h2>
    //     {!formDisplay && !editFormDisplay &&
    //     <MovieDetails
    //       user={user}
    //       profile={profile}
    //       movies={movies}
    //       movie={movie!}
    //       index={index}
    //     />
    //     }
    //     {formDisplay &&
    //       <MovieForm
    //         formData={editFormDisplay ? editFormData : formData}
    //         handleChange={handleChange}
    //         handleSubmit={handleSubmit}
    //       />
    //     }
    //     {editFormDisplay &&
    //       <MovieForm
    //         formData={editFormDisplay ? editFormData : formData}
    //         handleChange={handleEditForm}
    //         handleSubmit={handleUpdate}
    //       />
    //     }
    //   </div>
    //   {movies.length
    //   ?
    //   !formDisplay && !editFormDisplay &&
    //   <NextPrevBtns
    //     handleClick={handleClick}
    //     category={movie!.category}
    //   />
    //   :
    //   ''
    //   }
    //   <CUDBtns
    //     user={user}
    //     profile={profile}
    //     resource={movies}
    //     displayForm={displayForm}
    //     formDisplay={formDisplay}
    //     editFormDisplay={editFormDisplay}
    //     handleEdit={handleEdit}
    //     handleDelete={handleDelete}
    //   />
    // </div>
  )
}

export default MovieCard