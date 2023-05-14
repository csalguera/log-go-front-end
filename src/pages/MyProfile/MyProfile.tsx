// npm packages
import { useEffect, useState } from 'react'

// services
import * as profileService from '../../services/profileService'

// components
import Loading from '../../components/Loading/Loading'
import MovieCard from '../../components/movies/MovieCard/MovieCard'
import BookCard from '../../components/books/BookCard/BookCard'

// mui components
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// types
import { Profile, Movie, Book } from '../../types/models'

// styles
import styles from '../ProfileDetails/ProfileDetails.module.css'

// props
import { ProfileDetailsProps } from '../../types/props'

const MyProfile = (props: ProfileDetailsProps): JSX.Element => {
  const { user } = props
  const [myProfile, setMyProfile] = useState<Profile | null>(null)
  const [movieIdx, setMovieIdx] = useState(0)
  const [movie, setMovie] = useState<Movie | null>(null)
  const [movies, setMovies] = useState<Movie[] | []>([])
  const [bookIdx, setBookIdx] = useState(0)
  const [book, setBook] = useState<Book | null>(null)
  const [books, setBooks] = useState<Book[] | []>([])

  useEffect(() => {
    const fetchMyProfile = async (): Promise<void> => {
      try {
        const data: Profile = await profileService.getMyProfile()
        setMyProfile(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyProfile()
  }, [])

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const data = await profileService.getMyProfile()
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
        const data = await profileService.getMyProfile()
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
        const data = await profileService.getMyProfile()
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
        const data = await profileService.getMyProfile()
        setBook(data.books[bookIdx])
      } catch (error) {
        console.log(error)
      }
    }
    fetchBook()
  }, [])

  if (!myProfile) return <Loading />

  return (
    <main className='page-component-container'>
      <Avatar
        alt={myProfile.name}
        src={myProfile.photo ?? myProfile.name}
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
        {myProfile.name}
      </Typography>
      <MovieCard
        user={user}
        profile={myProfile}
        movieIdx={movieIdx}
        setMovieIdx={setMovieIdx}
        movie={movie}
        setMovie={setMovie}
        movies={movies}
        setMovies={setMovies}
      />
      <BookCard
        user={user}
        profile={myProfile}
        bookIdx={bookIdx}
        setBookIdx={setBookIdx}
        book={book}
        setBook={setBook}
        books={books}
        setBooks={setBooks}
      />
    </main>
  )
}

export default MyProfile