// npm packages
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

// services
import * as movieService from '../../../services/movieService'

// components
import MovieForm from '../MovieForm/MovieForm';

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
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

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

  function handleAdd(): void {
    setFormDisplay(!formDisplay)
  }

  function handleCancelAdd(): void {
    handleAdd()
    setFormData({
      name: '',
      director: '',
      releaseDate: '',
    })
  }

  function handleEdit(): void {
    setEditFormDisplay(!editFormDisplay)
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
    <Card sx={{
      width: 400,
      maxHeight: formDisplay || editFormDisplay ? '630px' : '360px',
      transition: 'max-height 0.25s'
      }}
    >
      <CardMedia
        component="img"
        alt=""
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
            page={index + 1}
            onChange={(evt, value) => setIndex(value - 1)}
            disabled={formDisplay || editFormDisplay ? true : false}
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
            disabled={
              formDisplay
              ||
              editFormDisplay
              ||
              user?.id !== profile?.id
              ?
              true
              :
              false
            }
            sx={{
              ml: 0,
            }}
          >
            <AddIcon />
          </ExpandMore>
          <ExpandMore
            expand={editFormDisplay}
            onClick={handleEdit}
            aria-expanded={editFormDisplay}
            aria-label="show more"
            color='primary'
            disabled={
              formDisplay
              ||
              editFormDisplay
              ||
              !movies.length
              || user?.id !== profile?.id
              ?
              true
              :
              false
            }
            sx={{
              ml: 0,
            }}
          >
            <EditIcon />
          </ExpandMore>
          <Button
            size="small"
            onClick={handleDelete}
            disabled={
              formDisplay
              ||
              editFormDisplay
              ||
              !movies.length
              || user?.id !== profile?.id
              ?
              true
              :
              false
            }
          >
            <DeleteIcon />
          </Button>
        </Box>
      </CardActions>
      <Collapse
        in={formDisplay || editFormDisplay}
        timeout="auto"
        unmountOnExit
      >
        <CardContent
        >
          <MovieForm
            formData={formDisplay ? formData : editFormData}
            handleSubmit={formDisplay ? handleSubmit : handleUpdate}
            handleChange={formDisplay ? handleChange : handleEditForm}
            handleCancel={formDisplay ? handleCancelAdd : handleEdit}
          />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default MovieCard