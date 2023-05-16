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

// stylesheets
// import styles from './LoginForm.module.css'

// types
import { LoginFormProps } from '../../types/props'
import { LoginFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const LoginForm = (props: LoginFormProps): JSX.Element => {
  const {
    updateMessage,
    handleAuthEvt,
    setDisplayAlert,
  } = props
  
  const navigate = useNavigate()

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
      setDisplayAlert(true)
      setTimeout(() => {
        setDisplayAlert(false)
      }, 3000);
    }
  }

  const { email, password } = formData

  const isFormInvalid = (): boolean => {
    return !(email && password)
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
        name='email'
        label='Email'
        value={formData.email}
        onChange={handleChange}
        variant='outlined'
        focused
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name='password'
        label='Password'
        value={formData.password}
        type='password'
        onChange={handleChange}
        variant='outlined'
        focused
        required
        sx={{ mb: 2 }}
        />
      <Box>
        <Button
          variant='outlined'
          type='submit'
          disabled={isFormInvalid()}
        >
          Log In
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
    // <form
    //   autoComplete="off"
    //   onSubmit={handleSubmit}
    //   className={styles.container}
    // >
    //   <div className={styles.inputContainer}>
    //     <label htmlFor="email" className={styles.label}>Email</label>
    //     <input
    //       type="text"
    //       id="email"
    //       value={formData.email}
    //       name="email"
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <div className={styles.inputContainer}>
    //     <label htmlFor="password" className={styles.label}>Password</label>
    //     <input
    //       type="password"
    //       id="password"
    //       value={formData.password}
    //       name="password"
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <div className={styles.inputContainer}>
    //     <button disabled={isFormInvalid()} className={styles.button}>
    //       Log In
    //     </button>
    //     <Link to="/">
    //       <button>Cancel</button>
    //     </Link>
    //   </div>
    // </form>
  )
}

export default LoginForm
