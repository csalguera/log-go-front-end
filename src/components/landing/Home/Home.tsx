// npm modules
import { useState, useEffect } from "react"

// components
import HomeCard from "../HomeCard/HomeCard"

// mui components
import Typography from "@mui/material/Typography"

// services
import * as indexService from "../../../services/indexService"

// types
import { Movie, Profile } from "../../../types/models"

// props
import { HomeProps } from "../../../types/props"

const Home = (props: HomeProps) => {
  const { user } = props
  const [movies, setMovies] = useState<Movie[] | []>([])

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const data = await indexService.index()
        setMovies(data.movies)
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovies()
  }, [])

  return (
    <>
      <Typography
        variant="h3"
      >
        This is the Home component
      </Typography>
      {movies.map(movie => (
        <HomeCard
          key={movie.name}
          resource={movie}
        />
      ))}
    </>
  )
}

export default Home