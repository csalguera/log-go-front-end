// npm modules
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// mui components
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// types
import { AuthFormProps } from '../../types/props'
import { SignupFormData, PhotoFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const SignupForm = (props: AuthFormProps): JSX.Element => {
  const {
    updateMessage,
    handleAuthEvt,
    setDisplayAlert,
  } = props

  const navigate = useNavigate()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) setPhotoData({ photo: evt.target.files.item(0) })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    if(isSubmitted) return
    try {
      setIsSubmitted(true)
      await authService.signup(formData, photoData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
      setIsSubmitted(false)
      setDisplayAlert(true)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = (): boolean => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',

      }}
    >
      <TextField
        name='name'
        label='Name'
        value={name}
        onChange={handleChange}
        variant='outlined'
        focused
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name='email'
        label='Email'
        value={email}
        onChange={handleChange}
        variant='outlined'
        focused
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name='password'
        label='Password'
        value={password}
        type='password'
        onChange={handleChange}
        variant='outlined'
        focused
        required
        sx={{ mb: 2 }}
        />
      <TextField
        name='passwordConf'
        label='Confirm Password'
        value={passwordConf}
        type='password'
        onChange={handleChange}
        variant='outlined'
        focused
        required
        sx={{ mb: 2 }}
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
      <Box>
        <Button
          variant='outlined'
          type='submit'
          disabled={isFormInvalid() || isSubmitted}
        >
          {!isSubmitted ? 'Sign Up' : 'Sending...'}
        </Button>
        <Link
          href='/'
        >
          <Button
            variant='outlined'
          >
            Cancel
          </Button>
        </Link>
      </Box>
    </form>
  )
}

export default SignupForm
