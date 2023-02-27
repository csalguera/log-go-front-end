const NextPrevBtns = (props) => {
  const { handleClick, category } = props

  console.log(category);
  

  return (
    <div>
      <button onClick={handleClick}>
        Prev {category}
      </button>
      <button onClick={handleClick}>
        Next {category}
      </button>
    </div>
  )
}

export default NextPrevBtns