const BookDetails = (): JSX.Element => {
  return (
    <>
      {books.length
      ?
      <>
        <h4>{index + 1} of {books.length}</h4>
        <h3>{book!?.name}</h3>
        <h4>Author: {book!?.author}</h4>
        <h4>Released: {book!?.published}</h4>
      </>
      :
      user?.id === profile?.id
      ?
      <h4>Add Some Books!</h4>
      :
      <h4>{profile?.name} hasn't added any books yet!</h4>
      }
    </>
  )
}

export default BookDetails