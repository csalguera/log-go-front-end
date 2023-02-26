// stylesheets
import styles from '../../pages/ProfileDetails/ProfileDetails.module.css'

// types
import { BookFormProps } from "../../types/props"

const BookForm = ({ formData, handleSubmit, handleChange }: BookFormProps): JSX.Element => {
  const { name, author, published } = formData

  return (
    <>
      <form
      className={styles.form}
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
          name='author'
          placeholder='Enter Author'
          value={author}
          onChange={handleChange}
          required={true}
        />
        <input
          type="text"
          name='published'
          placeholder='Enter Publish Year'
          value={published}
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

export default BookForm