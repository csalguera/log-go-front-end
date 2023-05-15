// npm modules
import { useState, useEffect } from "react"

// components
import HomeMovieCard from "../HomeMovieCard/HomeMovieCard"

// mui components
import Typography from "@mui/material/Typography"

// services
import * as indexService from "../../../services/indexService"

// types
import { Movie, Book } from "../../../types/models"

// props
import { HomeProps } from "../../../types/props"
import { Box } from "@mui/material"

const Home = (props: HomeProps) => {
  const { user } = props
  const [movies, setMovies] = useState<Movie[] | []>([])
  const [books, setBooks] = useState<Book[] | []>([])

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

  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      try {
        const data = await indexService.index()
        setBooks(data.books)
      } catch (error) {
        console.log(error);
      }
    }
    fetchBooks()
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
          <HomeMovieCard
            key={movie.name}
            movie={movie}
          />
        ))}
      </Box>
      <Typography
        variant="h4"
        sx={{
          mt: 4,
        }}
      >
        {books.length} Most Recent Book Submissions
      </Typography>
    </>
  )
}

export default Home