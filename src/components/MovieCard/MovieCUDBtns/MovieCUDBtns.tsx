const MovieCUDBtns = (props): JSX.Element => {
  const {
    user,
    profile,
    movies,
    displayForm,
    formDisplay,
    editFormDisplay,
    handleEdit,
    handleDelete,
  } = props

  return (
    <>
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
    </>
  )
}

export default MovieCUDBtns