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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

// styles
// import styles from '../../../pages/ProfileDetails/ProfileDetails.module.css'

// types
import { Movie } from '../../../types/models'
import { MovieFormData, EditMovieFormData } from '../../../types/forms';

// props
import { MovieCardProps } from '../../../types/props';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


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

  function handleAdd(): void {
    setFormDisplay(!formDisplay)
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
    <Card sx={{ maxWidth: 450, minheight: 350 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://img.freepik.com/free-photo/solid-concrete-wall-textured-backdrop_53876-129493.jpg?w=360"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie!?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Directed by: {movie!?.director}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Released: {movie!?.releaseDate}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={movies.length}
            siblingCount={0}
            color="primary"
            showFirstButton
            showLastButton
            onChange={(evt, value) => setIndex(value - 1)}
          />
        </Stack>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <ExpandMore
            expand={formDisplay}
            onClick={handleAdd}
            aria-expanded={formDisplay}
            aria-label="show more"
            color='primary'
            // disabled={formDisplay ? true : false}
            sx={{
              ml: 0,
            }}
          >
            <AddIcon />
          </ExpandMore>
          <Button
            size="small"
            onClick={handleEdit}
          >
            <EditIcon />
          </Button>
          <Button
            size="small"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </CardActions>
      <Collapse in={formDisplay} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <TextField />
          <TextField />
          <TextField />
        </CardContent>
      </Collapse>
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