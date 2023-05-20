// npm packages
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

// services
import * as movieService from '../../../services/movieService'

// components
import MovieForm from '../MovieForm/MovieForm';
import NoImage from '../../NoImage/NoImage';

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
import { useTheme } from '@mui/material';

// types
import { MovieFormData, EditMovieFormData, PhotoFormData } from '../../../types/forms';

// props
import { MovieCardCUDProps } from '../../../types/props';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ExpandMoreAnimation = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MovieCardCUD = (props: MovieCardCUDProps): JSX.Element => {
  const {
    user,
    profile,
    movieIdx,
    setMovieIdx,
    movie,
    setMovie,
    movies,
    setMovies,
  } = props

  const theme = useTheme()

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
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null,
  })

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) setPhotoData({ photo: evt.target.files.item(0) })
  }

  useEffect(() => {
    const editMovieData = () => {
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
  }, [movie])

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
    setPhotoData({
      photo: null,
    })
  }

  function handleEdit(): void {
    setEditFormDisplay(!editFormDisplay)
  }

  function handleCancelEdit():void {
    handleEdit()
    setPhotoData({
      photo: null,
    })
  }

  async function handleChange(evt: ChangeEvent<HTMLInputElement>): Promise<void> {
    setFormData({
      ...formData, [evt.target.name]: evt.target.value
    })
  }

  async function handleChangeEdit(evt: ChangeEvent<HTMLInputElement>): Promise<void> {
    setEditFormData({
      ...editFormData, [evt.target.name]: evt.target.value
    })
  }

  async function handleSubmit(evt: FormEvent<HTMLFormElement>): Promise<void> {
    evt.preventDefault()
    const newMovie = await movieService.createMovie(formData, photoData)
    setMovies([...movies!, newMovie])
    setMovieIdx(movies.length)
    setMovie(newMovie)
    handleCancelAdd()
  }

  async function handleUpdate(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    const updatedMovie = await movieService.updateMovie(editFormData, photoData)
    setMovies(movies.map(m => m.id === editFormData.movieId ? updatedMovie : m))
    setMovieIdx(movies.length - 1)
    setMovie(updatedMovie)
    handleCancelEdit()
  }

  async function handleDelete(): Promise<void> {
    await movieService.deleteMovie(movie!.id)
    setMovies(movies.filter(m => m.id !== movie!.id))
    setMovieIdx(movies.length - 2)
    setMovie(movies[movieIdx])
  }

  if (!movies) return <h2>Loading...</h2>

  return (
    <Card sx={{
      width: 400,
      maxHeight: formDisplay || editFormDisplay ? '975px' : '650px',
      transition: 'max-height 0.25s',
      m: 2,
      }}
    >
      {movie?.photo ? (
        <CardMedia
          component="img"
          alt=""
          height="300"
          image={movie?.photo}
          sx={{
            objectFit: 'contain',
            py: 5,
            backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.background.paper})`,
          }}
        />
      ) : (
        <NoImage />
      )}
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            height: 70,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {movie ? `${movie.name}` : `${profile?.name}'s Movies`}
        </Typography>
        <Typography variant="body2" color="teext.primary">
          {movie ? `Directed by: ${movie.director}` : `${profile?.name} has not added any movies.`}
        </Typography>
        <Typography variant="body2" color="teext.primary">
          {movie ? `Released: ${movie.releaseDate}` : 'Check again later.'}
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
            page={movieIdx + 1}
            onChange={(evt, value) => setMovieIdx(value - 1)}
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
          <ExpandMoreAnimation
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
          </ExpandMoreAnimation>
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
            formData={editFormDisplay ? editFormData : formData}
            handleSubmit={formDisplay ? handleSubmit : handleUpdate}
            handleChange={formDisplay ? handleChange : handleChangeEdit}
            handleCancel={formDisplay ? handleCancelAdd : handleCancelEdit}
            handleChangePhoto={handleChangePhoto}
          />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default MovieCardCUD