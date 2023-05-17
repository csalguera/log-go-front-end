// npm modules
import { useState, useEffect } from "react"

// components
import MovieCardR from "../../movies/MovieCardR/MovieCardR"
import BookCardR from "../../books/BookCardR/BookCardR"
import MovieCarousel from "../MovieCarousel/MovieCarousel"
import BookCarousel from "../BookCarousel/BookCarousel"

// mui components
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

// services
import * as indexService from "../../../services/indexService"

// types
import { Movie, Book } from "../../../types/models"

// props
import { HomeProps } from "../../../types/props"

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
      <MovieCarousel
        movies={movies}
      />
      <Typography
        variant="h4"
        sx={{
          mt: 4,
        }}
      >
        {books && books.length >= 5 ? 5 : books.length} Most Recent Book Submissions
      </Typography>
      <BookCarousel
        books={books}
      />
    </>
  )
}

export default Home