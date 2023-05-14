// npm packages
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../services/profileService'

// components
import Loading from '../../components/Loading/Loading';
import MovieCard from '../../components/movies/MovieCard/MovieCard';
import BookCard from '../../components/books/BookCard/BookCard';

// mui components
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// types
import { Profile, Movie, Book } from '../../types/models'

// props
import { ProfileDetailsProps } from '../../types/props';

const ProfileDetails = (props: ProfileDetailsProps): JSX.Element => {
  const { user } = props
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [movieIdx, setMovieIdx] = useState(0)
  const [movie, setMovie] = useState<Movie | null>(null)
  const [movies, setMovies] = useState<Movie[] | []>([])
  const [bookIdx, setBookIdx] = useState(0)
  const [book, setBook] = useState<Book | null>(null)
  const [books, setBooks] = useState<Book[] | []>([])

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const data: Profile = await profileService.getProfile(id)
        setProfile(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile()
  }, [])

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
  }, [])

  useEffect(() => {
    const fetchMovie = async (): Promise<void> => {
      try {
        const data = await profileService.getProfile(id)
        setMovie(data.movies[movieIdx])
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovie()
  }, [movieIdx, movies])

  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      try {
        const data = await profileService.getProfile(id)
        setBooks(data.books)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBooks()
  }, [])

  useEffect(() => {
    const fetchBook = async (): Promise<void> => {
      try {
        const data = await profileService.getProfile(id)
        setBook(data.books[bookIdx])
      } catch (error) {
        console.log(error)
      }
    }
    fetchBook()
  }, [bookIdx, books])


  if (!profile) return <Loading />

  return (
    <main className='page-component-container'>
      <Avatar
        alt={profile.name}
        src={profile.photo ?? profile.name}
        sx={{
          width: 100,
          height: 100,
          fontSize: 50,
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
        }}
      />
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          my: 2,
        }}
      >
        {profile.name}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <MovieCard
          user={user}
          profile={profile}
          movieIdx={movieIdx}
          setMovieIdx={setMovieIdx}
          movie={movie}
          setMovie={setMovie}
          movies={movies}
          setMovies={setMovies}
        />
        <BookCard
          user={user}
          profile={profile}
          bookIdx={bookIdx}
          setBookIdx={setBookIdx}
          book={book}
          setBook={setBook}
          books={books}
          setBooks={setBooks}
        />
      </Box>
    </main>
  )
}

export default ProfileDetails