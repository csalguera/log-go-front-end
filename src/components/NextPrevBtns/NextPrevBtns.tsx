const NextPrevBtns = (props) => {
  const { handleClick, resource } = props

  return (
    <div>
      <button onClick={handleClick}>
        Prev {resource.category}
      </button>
      <button onClick={handleClick}>
        Next {resource.category}
      </button>
    </div>
  )
}

export default NextPrevBtns