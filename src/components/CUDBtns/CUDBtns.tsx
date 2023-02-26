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
    <div>
    {!editFormDisplay && user?.id === profile?.id &&
      <button onClick={displayForm}>
        {formDisplay ? 'Cancel' : 'Add'}
      </button>
    }
    {resource.length && user?.id === profile?.id
    ?
    !formDisplay &&
      <button onClick={handleEdit}>
        {editFormDisplay ? 'Cancel' : 'Edit'}
      </button>
    :
    ''
    }
    {resource.length && user?.id === profile?.id
    ?
    !formDisplay && !editFormDisplay &&
    <button onClick={handleDelete}>
      Delete
    </button>
    :
    ''
    }
  </div>
  )
}

export default CUDBtns