// types
import { MovieFormProps } from "../../types/props"

const MovieForm = ({ formData, handleSubmit, handleChange }: MovieFormProps): JSX.Element => {
  const { name, releaseDate } = formData

  return (
    <>
      <form
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name='name'
          placeholder='Enter Title'
          value={name}
          onChange={handleChange}
          required={true}
        />
        <input
          type="text"
          name='releaseDate'
          placeholder='Enter Release Year'
          value={releaseDate}
          onChange={handleChange}
          required={true}
        />
        <button>
          Submit
        </button>
      </form>
    </>
  )
}

export default MovieForm