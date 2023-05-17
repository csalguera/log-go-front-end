// npm modules
import { useState, useEffect } from "react"

// components
import BookCardR from "../../books/BookCardR/BookCardR"

// mui components
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

// props
import { BookCarouselProps } from "../../../types/props"

const BookCarousel = (props: BookCarouselProps) => {
  const { books } = props
  const [bookscrollPosition, setBookScrollPosition] = useState(0)
  const [bookscrollValue, setBookScrollValue] = useState(0)

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

export default BookCarousel