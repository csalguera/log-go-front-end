// types
import { MovieFormProps } from "../../types/props"

const MovieForm = ({ name, releaseDate, handleSubmit, handleChange, edit }: MovieFormProps): JSX.Element => {
  
  return (
    <>
      <form
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name={`${edit ? 'editName' : 'name'}`}
          placeholder='Title'
          value={name}
          onChange={handleChange}
        />
        <input
          type="text"
          name={`${edit ? 'editReleaseDate' : 'releaseDate'}`}
          placeholder='Release Year'
          value={releaseDate}
          onChange={handleChange}
        />
        <button>
          Submit
        </button>
      </form>
    </>
  )
}

export default MovieForm