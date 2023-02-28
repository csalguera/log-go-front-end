// npm packages
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../services/profileService'

// components
import Avatar from '../../components/Avatar/Avatar';
import Loading from '../../components/Loading/Loading';
import MovieCard from '../../components/movies/MovieCard/MovieCard';
import BookCard from '../../components/books/BookCard/BookCard';

// stylesheets
import styles from './ProfileDetails.module.css'

// types
import { Profile, Movie, Book } from '../../types/models'

// props
import { ProfileDetailsProps } from '../../types/props';

const ProfileDetails = (props: ProfileDetailsProps): JSX.Element => {
  const { user } = props
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [movies, setMovies] = useState<Movie[] | []>([])
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
  }, [id])

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
    const fetchBooks = async (): Promise<void> => {
      try {
        const data = await profileService.getProfile(id)
        setBooks(data.books)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBooks()
  }, [id])

  if (!profile) return <Loading />
  return (
    <main className='page-component-container'>
      <div className={styles["profile-container"]}>
        <Avatar
          profile={profile}
          size1='118px'
          size2='110px'
          size3='48px'
        />
        <h2>{profile?.name}</h2>
        <div className={styles["card-container"]}>
          <MovieCard
            user={user}
            profile={profile}
            movies={movies}
            setMovies={setMovies}
          />
          <BookCard
            user={user}
            profile={profile}
            books={books}
            setBooks={setBooks}
          />
        </div>
      </div>
    </main>
  )
}

export default ProfileDetails