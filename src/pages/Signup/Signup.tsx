// npm packages
import { Dispatch, SetStateAction, useState } from 'react'

// components
import SignupForm from '../../components/SignupForm/SignupForm'

// mui components
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Zoom from '@mui/material/Zoom';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material';

// types
interface SignupProps {
  handleAuthEvt: () => void;
  displayAlert: boolean;
  setDisplayAlert: Dispatch<SetStateAction<boolean>>;
  handleClose: ()=> void;
}

const Signup = (props: SignupProps): JSX.Element => {
  const { displayAlert, handleClose } = props
  const theme = useTheme()
  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)

  return (
    <main className='page-component-container' style={{ backgroundColor: theme.palette.background.default }}>
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
