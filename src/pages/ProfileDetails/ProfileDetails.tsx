// npm packages
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../services/profileService'

// types
import { Profile, Movie } from '../../types/models'

const ProfileDetails = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [index, setIndex] = useState(0)
  let movie
  if (movies) movie = movies[index]

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const data: Profile = await profileService.getProfile(id)
        setProfile(data)
        setMovies(data.movies)
        setIndex(0)
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile()
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

  return (
    <>
      <h1>Profile Details</h1>
      <p>{profile?.name}</p>
      <img src={profile?.photo} alt="Profile Photo" />
      {
        movies?.length
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
        <p>Add Movies</p>
      }
    </>
  )
}

export default ProfileDetails