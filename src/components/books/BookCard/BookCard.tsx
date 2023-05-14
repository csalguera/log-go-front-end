// npm packages
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

// services
import * as bookService from '../../../services/bookService'

// components
import BookForm from '../BookForm/BookForm';

// mui components
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

// types
import { BookFormData, EditBookFormData, PhotoFormData } from '../../../types/forms';

// props
import { BookCardProps } from '../../../types/props';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ExpandMoreAnimation = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BookCard = (props: BookCardProps): JSX.Element => {
  const {
    user,
    profile,
    bookIdx,
    setBookIdx,
    book,
    setBook,
    books,
    setBooks
  } = props

  const [formDisplay, setFormDisplay] = useState(false)
  const [editFormDisplay, setEditFormDisplay] = useState(false)
  const [formData, setFormData] = useState<BookFormData>({
    name: '',
    author: '',
    published: '',
  })
  const [editFormData, setEditFormData] = useState<EditBookFormData>({
    bookId: null,
    name: '',
    author: '',
    published: '',
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null,
  })

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) setPhotoData({ photo: evt.target.files.item(0) })
  }

  useEffect(() => {
    const editBookData = async () => {
      try {
        setEditFormData({
          bookId: book!?.id,
          name: book!?.name,
          author: book!?.author,
          published: book!?.published!?.toString(),
        })
      } catch (error) {
        console.log(error);
      }
    }
    editBookData()
  }, [book])

  function handleAdd(): void {
    setFormDisplay(!formDisplay)
  }

  function handleCancelAdd(): void {
    handleAdd()
    setFormData({
      name: '',
      author: '',
      published: '',
    })
    setPhotoData({
      photo: null,
    })
  }

  function handleEdit(): void {
    setEditFormDisplay(!editFormDisplay)
  }

  function handleCancelEdit(): void {
    handleEdit()
    setPhotoData({
      photo: null,
    })
  }

  async function handleChange(evt: ChangeEvent<HTMLInputElement>): Promise<void> {
    setFormData({
      ...formData, [evt.target.name]: evt.target.value
    })
  }

  async function handleChangeEdit(evt: ChangeEvent<HTMLInputElement>): Promise<void> {
    setEditFormData({
      ...editFormData, [evt.target.name]: evt.target.value
    })
  }

  async function handleSubmit(evt: FormEvent<HTMLFormElement>): Promise<void> {
    evt.preventDefault()
    const newBook = await bookService.createBook(formData, photoData)
    setFormData({
      name: '',
      author: '',
      published: ''
    })
    setBooks([...books!, newBook])
    setBookIdx(books.length)
    setBook(newBook)
    handleCancelAdd()
  }

  async function handleUpdate(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    const updatedBook = await bookService.updateBook(editFormData, photoData)
    setBooks(books!?.map(m => m.id === editFormData.bookId ? updatedBook : m))
    setBookIdx(books.length - 1)
    setBook(updatedBook)
    handleCancelEdit()
  }

  async function handleDelete(): Promise<void> {
    await bookService.deleteBook(book!.id)
    setBooks(books.filter(m => m.id !== book!.id))
    setBookIdx(books.length - 2)
    setBook(books[bookIdx])
  }

  if (!books) return <h2>Loading...</h2>
  return (
    <Card sx={{
      width: 400,
      maxHeight: formDisplay || editFormDisplay ? '930px' : '600px',
      transition: 'max-height 0.25s',
      mx: 2,
      }}
    >
      <CardMedia
        component="img"
        alt=""
        height="300"
        image={book!?.photo ? book.photo : "https://img.freepik.com/free-photo/solid-concrete-wall-textured-backdrop_53876-129493.jpg?w=360"}
        sx={{
          objectFit: 'contain',
          py: 5,
          background: 'rgba(0,0,0,0.9)'
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book ? `${book.name}` : `${profile?.name}'s Books`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book ? `Author: ${book.author}` : `${profile?.name} has not added any books.`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book ? `Published: ${book.published}` : 'Check again later.'}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={books.length}
            siblingCount={0}
            color="primary"
            showFirstButton
            showLastButton
            page={bookIdx + 1}
            onChange={(evt, value) => setBookIdx(value - 1)}
            disabled={formDisplay || editFormDisplay ? true : false}
          />
        </Stack>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <ExpandMoreAnimation
            expand={formDisplay}
            onClick={handleAdd}
            aria-expanded={formDisplay}
            aria-label="show more"
            color='primary'
            disabled={
              formDisplay
              ||
              editFormDisplay
              ||
              user?.id !== profile?.id
              ?
              true
              :
              false
            }
            sx={{
              ml: 0,
            }}
          >
            <AddIcon />
          </ExpandMoreAnimation>
          <ExpandMore
            expand={editFormDisplay}
            onClick={handleEdit}
            aria-expanded={editFormDisplay}
            aria-label="show more"
            color='primary'
            disabled={
              formDisplay
              ||
              editFormDisplay
              ||
              !books.length
              || user?.id !== profile?.id
              ?
              true
              :
              false
            }
            sx={{
              ml: 0,
            }}
          >
            <EditIcon />
          </ExpandMore>
          <Button
            size="small"
            onClick={handleDelete}
            disabled={
              formDisplay
              ||
              editFormDisplay
              ||
              !books.length
              || user?.id !== profile?.id
              ?
              true
              :
              false
            }
          >
            <DeleteIcon />
          </Button>
        </Box>
      </CardActions>
      <Collapse
        in={formDisplay || editFormDisplay}
        timeout="auto"
        unmountOnExit
      >
        <CardContent
        >
          <BookForm
            formData={editFormDisplay ? editFormData : formData}
            handleSubmit={formDisplay ? handleSubmit : handleUpdate}
            handleChange={formDisplay ? handleChange : handleChangeEdit}
            handleCancel={formDisplay ? handleCancelAdd : handleCancelEdit}
            handleChangePhoto={handleChangePhoto}
          />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default BookCard