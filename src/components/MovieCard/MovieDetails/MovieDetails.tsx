// props
import { MovieDetailsProps } from "../../../types/props"

const MovieDetails = (props: MovieDetailsProps): JSX.Element => {
  const { user, profile, movies, movie, index } = props
  return (
    <>
      {movies.length
      ?
      <>
        <h4>{index + 1} of {movies.length}</h4>
        <h3>{movie!?.name}</h3>
        <h4>Released: {movie!?.releaseDate}</h4>
      </>
      :
      user?.id === profile?.id
      ?
      <h4>Add Some Movies!</h4>
      :
      <h4>{profile?.name} hasn't added any movies yet!</h4>
      }
    </>
  )
}

export default MovieDetails