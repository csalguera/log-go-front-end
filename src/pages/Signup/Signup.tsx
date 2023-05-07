// npm packages
import { useState } from 'react'

// components
import SignupForm from '../../components/SignupForm/SignupForm'

// mui components
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Zoom from '@mui/material/Zoom';
import Alert from '@mui/material/Alert';

// types
interface SignupProps {
  handleAuthEvt: () => void;
}

const Signup = (props: SignupProps): JSX.Element => {
  const [message, setMessage] = useState('')
  const [displayAlert, setDisplayAlert] = useState(false)

  const updateMessage = (msg: string): void => setMessage(msg)

  const handleClose = () => {
    setDisplayAlert(false)
  }

  return (
    <main className='page-component-container'>
      <Typography
        variant='h3'
        sx={{
          mb: 4,
        }}
      >
        Sign Up
      </Typography>
      <SignupForm
        {...props}
        updateMessage={updateMessage}
        setDisplayAlert={setDisplayAlert}
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

export default Signup
