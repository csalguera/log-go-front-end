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
  const [bookscrollPosition, setBookScrollPosition] = useState(0)
  const [bookscrollValue, setBookScrollValue] = useState(0)

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
      setBookScrollPosition(0)
      setBookScrollValue(0)
    }
    setScroll()
  }, [])

  setTimeout(() => {
    if (books.length > 3) handleBookRClick()
  }, 3000);

  function handleBookLClick(): void {
    if (bookscrollPosition <= 0) {
      setBookScrollPosition(books.length - 3)
      setBookScrollValue((books.length - 3) *- 382)
    } else {
      setBookScrollPosition(bookscrollPosition - 1)
      setBookScrollValue(bookscrollValue + 382)
    }
  }

  function handleBookRClick(): void {
    if (bookscrollPosition >= books.length - 3) {
      setBookScrollPosition(0)
      setBookScrollValue(0)
    } else {
      setBookScrollPosition(bookscrollPosition + 1)
      setBookScrollValue(bookscrollValue - 382)
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
          width: 1146,
          overflowX: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
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
              transform: bookscrollPosition ? `translate(${bookscrollValue}px)` : '',
              transition: 'ease-in-out 1s',
            }}
          >
            {movies!?.map(movie => (
              <MovieCardR
                key={movie.id}
                movie={movie}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box>
        <Button
          onClick={handleBookLClick}
          disabled={books.length <= 3 || bookscrollPosition <= 0 ? true : false}
          >
          Left
        </Button>
        <Button
          onClick={handleBookRClick}
          disabled={books.length <= 3 || bookscrollPosition >= books.length - 3 ? true : false}
        >
          Right
        </Button>
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
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
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
              transform: bookscrollPosition ? `translate(${bookscrollValue}px)` : '',
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
          onClick={handleBookLClick}
          disabled={books.length <= 3 || bookscrollPosition <= 0 ? true : false}
          >
          Left
        </Button>
        <Button
          onClick={handleBookRClick}
          disabled={books.length <= 3 || bookscrollPosition >= books.length - 3 ? true : false}
        >
          Right
        </Button>
      </Box>
    </>
  )
}

export default Home