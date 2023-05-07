// npm modules
import { Dispatch, SetStateAction, useState } from 'react'

// components
import LoginForm from '../../components/LoginForm/LoginForm'

// stylesheets
import styles from './Login.module.css'

// types
interface LoginPageProps {
  handleAuthEvt: () => void;
  displayAlert: boolean;
  setDisplayAlert: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
} 

const LoginPage = (props: LoginPageProps): JSX.Element => {
  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)

  return (
    <main className='page-component-container'>
      <main className={styles.container}>
        <h1>Log In</h1>
        <p>{message}</p>
        <LoginForm {...props} updateMessage={updateMessage} />
      </main>
    </main>
  )
}

export default LoginPage
