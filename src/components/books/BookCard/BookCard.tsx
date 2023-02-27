// npm packages
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../../services/profileService'
import * as bookService from '../../../services/bookService'

// components
import BookForm from '../BookForm/BookForm';
import BookDetails from '../BookDetails/BookDetails';
import CUDBtns from '../../CUDBtns/CUDBtns';
import NextPrevBtns from '../../NextPrevBtns/NextPrevBtns';

// types
import { Book } from '../../../types/models'
import { BookFormData, EditBookFormData } from '../../../types/forms';

// styles
import styles from '../../../pages/ProfileDetails/ProfileDetails.module.css'

// props
import { BookCardProps } from '../../../types/props';

const BookCard = (props: BookCardProps): JSX.Element => {
  const { id } = useParams()
  const { user, profile } = props
  let book: Book | null
  const [books, setBooks] = useState<Book[] | []>([])
  const [index, setIndex] = useState(0)
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

  if (books) book = books[index]

  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      try {
        const data = await profileService.getProfile(id)
        setBooks(data.books)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBooks()
  }, [id])

  useEffect(() => {
    const fetchBookData = async () => {
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
    fetchBookData()
  }, [book!?.id])
  
  function handleClick(evt: React.MouseEvent): void {
    let btnContent: string | null = (evt.target as HTMLButtonElement).textContent

    if (btnContent === 'Prev Book') {
      books && index <= 0
      ?
      setIndex(books.length - 1)
      :
      setIndex(index - 1)
    } else if  (btnContent === 'Next Book') {
      books && index >= books.length - 1
      ?
      setIndex(0)
      :
      setIndex(index + 1)
    }
  }

  function displayForm(): void {
    formDisplay
    ?
    setFormDisplay(false)
    :
    setFormDisplay(true)
  }

  async function handleChange(evt: ChangeEvent<HTMLInputElement>): Promise<void> {
    setFormData({
      ...formData, [evt.target.name]: evt.target.value
    })
  }

  async function handleEditForm(evt: ChangeEvent<HTMLInputElement>): Promise<void> {
    setEditFormData({
      ...editFormData, [evt.target.name]: evt.target.value
    })
  }

  async function handleSubmit(evt: FormEvent<HTMLFormElement>): Promise<void> {
    evt.preventDefault()
    const newBook = await bookService.createBook(formData)
    setFormData({
      name: '',
      author: '',
      published: ''
    })
    setBooks([...books!, newBook])
    setIndex(books!?.length)
    setEditFormDisplay(false)
    setFormDisplay(false)
  }

  function handleEdit(): void {
    editFormDisplay
    ?
    setEditFormDisplay(false)
    :
    setEditFormDisplay(true)
  }

  async function handleUpdate(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    const updatedBook = await bookService.updateBook(editFormData)
    setBooks(books!?.map(m => m.id === editFormData.bookId ? updatedBook : m))
    setFormDisplay(false)
    setEditFormDisplay(false)
  }

  async function handleDelete(): Promise<void> {
    await bookService.deleteBook(book!.id)
    setBooks(books.filter(m => m.id !== book!.id))
    setIndex(books.length - 2)
  }

  if (!books) return <h2>Loading...</h2>
  return (
    <div className={styles.card}>
      <div className={styles["details-container"]}>
        <h2>Favorite Books</h2>
        {!formDisplay && !editFormDisplay &&
        <BookDetails
          user={user}
          profile={profile}
          books={books}
          book={book!}
          index={index}
        />
        }
        {formDisplay &&
          <BookForm
            formData={editFormDisplay ? editFormData : formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        }
        {editFormDisplay &&
          <BookForm
            formData={editFormDisplay ? editFormData : formData}
            handleChange={handleEditForm}
            handleSubmit={handleUpdate}
          />
        }
      </div>
      {books.length
      ?
      !formDisplay && !editFormDisplay &&
      <NextPrevBtns
        handleClick={handleClick}
        category={book!.category}
      />
      :
      ''
      }
      <CUDBtns
        user={user}
        profile={profile}
        resource={books}
        displayForm={displayForm}
        formDisplay={formDisplay}
        editFormDisplay={editFormDisplay}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default BookCard