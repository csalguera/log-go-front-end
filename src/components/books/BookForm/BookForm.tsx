// mui components
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

// types
import { BookFormProps } from "../../../types/props"

const BookForm = (props : BookFormProps): JSX.Element => {
  const { formData, handleSubmit, handleChange, handleCancel, handleChangePhoto } = props
  const { name, author, published } = formData

  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <TextField
        name='name'
        value={name}
        label='Title'
        variant='outlined'
        onChange={handleChange}
        focused
        required
        sx={{
          mb: 2,
        }}
      />
      <TextField
        name='author'
        value={author}
        label='Author'
        variant='outlined'
        onChange={handleChange}
        focused
        required
        sx={{
          mb: 2,
        }}
      />
      <TextField
        name='published'
        value={published}
        label='Published'
        variant='outlined'
        onChange={handleChange}
        focused
        required
        sx={{
          mb: 2,
        }}
      />
      <Box
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Typography>
          Upload Photo
        </Typography>
        <TextField
          name='photo'
          type='file'
          onChange={handleChangePhoto}
          sx={{
            "& fieldset": { border: 'none' },
            width: '240px'
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        >
        <Button
          type='submit'
        >
          Save
        </Button>
        <Button
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </form>
  )
}

export default BookForm