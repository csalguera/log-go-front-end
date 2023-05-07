// npm modules
import { Dispatch, SetStateAction, useState } from 'react'

// components
import LoginForm from '../../components/LoginForm/LoginForm'

// mui components
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Zoom from '@mui/material/Zoom';
import Alert from '@mui/material/Alert';

// stylesheets
// import styles from './Login.module.css'

// types
interface LoginPageProps {
  handleAuthEvt: () => void;
  displayAlert: boolean;
  setDisplayAlert: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
} 

const LoginPage = (props: LoginPageProps): JSX.Element => {
  const { displayAlert, handleClose } = props

  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)

  return (
    <main className='page-component-container'>
      {/* <main className={styles.container}>
        <h1>Log In</h1>
        <p>{message}</p>
        <LoginForm {...props} updateMessage={updateMessage} />
      </main> */}
      <Typography
        variant='h3'
        sx={{
          mb: 4,
        }}
      >
        Log In
      </Typography>
      <LoginForm
        {...props}
        updateMessage={updateMessage}
      />
      <Zoom in={displayAlert}>
        <Stack
          spacing={2}
        >
          <Alert
            onClose={handleClose}
            severity='error'
            variant='outlined'
            sx={{
              mt: 4
            }}
          >
            {message}
          </Alert>
        </Stack>
      </Zoom>
    </main>
  )
}

export default LoginPage
