const BookCUDBtns = () => {
  return (
    <div>
      {!editFormDisplay && user?.id === profile?.id &&
        <button onClick={displayForm}>
          {formDisplay ? 'Cancel' : 'Add'}
        </button>
      }
      {movies.length && user?.id === profile?.id
      ?
      !formDisplay &&
        <button onClick={handleEdit}>
          {editFormDisplay ? 'Cancel' : 'Edit'}
        </button>
      :
      ''
      }
      {movies.length && user?.id === profile?.id
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