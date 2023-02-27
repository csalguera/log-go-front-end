// styles
import styles from './CUDBtns.module.css'

// props
import { CUDBtnsProps } from "../../types/props"

const CUDBtns = (props: CUDBtnsProps) => {
  const {
    user,
    profile,
    resource,
    displayForm,
    formDisplay,
    editFormDisplay,
    handleEdit,
    handleDelete,
  } = props

  return (
    <div className={styles["buttons-container"]}>
      {resource.length && user?.id === profile?.id
      ?
      !formDisplay &&
        <button
          onClick={handleEdit}
          className={styles["edit-btn"]}
        >
          {editFormDisplay ? 'Cancel' : 'Edit'}
        </button>
      :
      ''
      }
      {!editFormDisplay && user?.id === profile?.id &&
        <button
          onClick={displayForm}
          className={styles["add-btn"]}
        >
          {formDisplay ? 'Cancel' : 'Add'}
        </button>
      }
      {resource.length && user?.id === profile?.id
      ?
      !formDisplay && !editFormDisplay &&
      <button
        onClick={handleDelete}
        className={styles["delete-btn"]}
      >
        Delete
      </button>
      :
      ''
      }
    </div>
  )
}

export default CUDBtns