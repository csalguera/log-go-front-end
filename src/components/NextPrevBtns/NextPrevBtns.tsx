// props
import { NextPrevBtnsProps } from "../../types/props";

const NextPrevBtns = (props: NextPrevBtnsProps) => {
  const { handleClick, category } = props

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