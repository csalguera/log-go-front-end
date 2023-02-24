// types
import { MovieFormProps } from "../../types/props"

const MovieForm = ({ name, releaseDate, handleSubmit, handleChange }: MovieFormProps): JSX.Element => {
  
  return (
    <>
      <form
      autoComplete='off'
      onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder='Title'
          value={name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="releaseDate"
          placeholder='Release Year'
          value={releaseDate}
          onChange={handleChange}
        />
        <button>
          Add
        </button>
      </form>
    </>
  )
}

export default MovieForm