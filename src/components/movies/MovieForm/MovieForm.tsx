// mui components
import { TextField, Box, Button } from "@mui/material"

// types
import { MovieFormProps } from "../../../types/props"

const MovieForm = (props: MovieFormProps): JSX.Element => {
  const { formData, handleSubmit, handleChange, handleCancel } = props
  const { name, director, releaseDate } = formData

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
        name='director'
        value={director}
        label='Director'
        variant='outlined'
        onChange={handleChange}
        focused
        required
        sx={{
          mb: 2,
        }}
      />
      <TextField
        name='releaseDate'
        value={releaseDate}
        label='Released'
        variant='outlined'
        onChange={handleChange}
        focused
        required
        sx={{
          mb: 2,
        }}
      />
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

export default MovieForm