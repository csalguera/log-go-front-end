// styles
import styles from '../../../pages/ProfileDetails/ProfileDetails.module.css'

// types
import { MovieFormProps } from "../../../types/props"

const MovieForm = ({ formData, handleSubmit, handleChange }: MovieFormProps): JSX.Element => {
  const { name, director, releaseDate } = formData

  return (
    <>
      <h4>Enter Movie Details:</h4>
      <form
        className={styles.form}
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <div className={styles["inputs-container"]}>
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
            name='director'
            placeholder='Enter Director'
            value={director}
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
        </div>
        <button>
          Submit
        </button>
      </form>
    </>
  )
}

export default MovieForm