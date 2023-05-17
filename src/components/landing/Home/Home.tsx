// npm modules
import { useState, useEffect } from "react"

// components
import MovieCardR from "../../movies/MovieCardR/MovieCardR"
import BookCardR from "../../books/BookCardR/BookCardR"

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
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollValue, setScrollValue] = useState(0)

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

  useEffect(() => {
    const setScroll = () => {
      setScrollPosition(0)
      setScrollValue(0)
    }
    setScroll()
  }, [])

  function handleLClick(): void {
    if (scrollPosition <= 0) {
      setScrollPosition(books.length - 3)
      setScrollValue((books.length - 3) *- 382)
    } else {
      setScrollPosition(scrollPosition - 1)
      setScrollValue(scrollValue + 382)
    }
  }

  function handleRClick(): void {
    if (scrollPosition >= books.length - 3) {
      setScrollPosition(0)
      setScrollValue(0)
    } else {
      setScrollPosition(scrollPosition + 1)
      setScrollValue(scrollValue - 382)
    }
  }

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
          <MovieCardR
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
          width: 1146,
          overflowX: 'hidden',
          border: 'solid',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            border: 'solid red',
            width: 1164,
            overflowX: 'hidden'
          }}
        >
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              height: 600,
              transform: scrollPosition ? `translate(${scrollValue}px)` : '',
              transition: 'ease-in-out 1s',
            }}
          >
            {books!?.map(book => (
              <BookCardR
                key={book.id}
                book={book}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box>
        <Button
          onClick={handleLClick}
        >
          Left
        </Button>
        <Button
          onClick={handleRClick}
        >
          Right
        </Button>
      </Box>
    </>
  )
}

export default Home