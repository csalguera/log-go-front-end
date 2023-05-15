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
import { Box } from "@mui/material"

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
        Welcome, {user?.name}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          mt: 4,
        }}
      >
        {movies.length} Most Recent Movie Submissions
      </Typography>
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {movies.map(movie => (
          <HomeCard
            key={movie.name}
            movie={movie}
          />
        ))}
      </Box>
    </>
  )
}

export default Home