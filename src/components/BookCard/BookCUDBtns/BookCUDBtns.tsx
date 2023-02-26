const BookCUDBtns = (props) => {
  const {
    user,
    profile,
    books,
    displayForm,
    formDisplay,
    editFormDisplay,
    handleEdit,
    handleDelete,
  } = props

  return (
    <div>
      {!editFormDisplay && user?.id === profile?.id &&
        <button onClick={displayForm}>
          {formDisplay ? 'Cancel' : 'Add'}
        </button>
      }
      {books.length && user?.id === profile?.id
      ?
      !formDisplay &&
        <button onClick={handleEdit}>
          {editFormDisplay ? 'Cancel' : 'Edit'}
        </button>
      :
      ''
      }
      {books.length && user?.id === profile?.id
      ?
      !formDisplay && !editFormDisplay &&
      <button onClick={handleDelete}>
        Delete
      </button>
      :
      ''
      }
    </div>
  )
}

export default BookCUDBtns