// npm modules
import { useState, useEffect } from "react"

// components
import MovieCardR from "../../movies/MovieCardR/MovieCardR"

// mui components
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import MobileStepper from "@mui/material/MobileStepper"

// props
import { MovieCarouselProps } from "../../../types/props"

const MovieCarousel = (props: MovieCarouselProps) => {
  const { movies } = props
  const [moviescrollPosition, setMovieScrollPosition] = useState(0)
  const [moviescrollValue, setMovieScrollValue] = useState(0)

  useEffect(() => {
    const setScroll = () => {
      setMovieScrollPosition(0)
      setMovieScrollValue(0)
    }
    setScroll()
  }, [])

  setTimeout(() => {
    if (movies.length > 3) handleMovieRClick()
  }, 3000);

  function handleMovieLClick(): void {
    if (moviescrollPosition <= 0) {
      setMovieScrollPosition(movies.length - 3)
      setMovieScrollValue((movies.length - 3) *- 382)
    } else {
      setMovieScrollPosition(moviescrollPosition - 1)
      setMovieScrollValue(moviescrollValue + 382)
    }
  }

  function handleMovieRClick(): void {
    if (moviescrollPosition >= movies.length - 3) {
      setMovieScrollPosition(0)
      setMovieScrollValue(0)
    } else {
      setMovieScrollPosition(moviescrollPosition + 1)
      setMovieScrollValue(moviescrollValue - 382)
    }
  }

  return (
    <>
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
              transform: moviescrollPosition ? `translate(${moviescrollValue}px)` : '',
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
      {movies.length >= 3 ? (
        <Box
          sx={{
            width: 1146,
          }}
        >
          <MobileStepper
            steps={movies.length > 3 ? movies.length - 2 : movies.length ? 1 : 0}
            position="static"
            activeStep={moviescrollPosition}
            backButton={
              <Button
              onClick={handleMovieLClick}
              disabled={movies.length <= 3 || moviescrollPosition <= 0 ? true : false}
              >
              <KeyboardArrowLeft />
              BACK
            </Button>
            }
            nextButton={
              <Button
              onClick={handleMovieRClick}
              disabled={movies.length <= 3 || moviescrollPosition >= movies.length - 3 ? true : false}
            >
              NEXT
              <KeyboardArrowRight />
            </Button>
            }
          />
        </Box>
      ) : (
        ''
      )}
    </>
  )
}

export default MovieCarousel