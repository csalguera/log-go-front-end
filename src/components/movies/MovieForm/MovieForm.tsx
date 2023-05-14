// mui components
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

// types
import { MovieFormProps } from "../../../types/props"

const MovieForm = (props: MovieFormProps): JSX.Element => {
  const { formData, handleSubmit, handleChange, handleCancel, handleChangePhoto } = props
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

export default MovieForm