// npm modules
import { useState, useEffect } from "react"

// components
import HomeMovieCard from "../HomeMovieCard/HomeMovieCard"
import HomeBookCard from "./HomeBookCard/HomeBookCard"

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
        const { movies } = await indexService.fetchData()
        setMovies(movies)
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovies()
  }, [])

  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      try {
        const { books } = await indexService.fetchData()
        setBooks(books)
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
        {movies && movies.length >= 5 ? 5 : movies.length} Most Recent Movie Submissions
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
        {movies!?.map(movie => (
          <HomeMovieCard
            key={movie.id}
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
        {books && books.length >= 5 ? 5 : books.length} Most Recent Book Submissions
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
        {books!?.map(book => (
          <HomeBookCard
            key={book.id}
            book={book}
          />
        ))}
      </Box>
    </>
  )
}

export default Home