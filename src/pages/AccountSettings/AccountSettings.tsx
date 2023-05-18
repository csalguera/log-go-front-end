// npm modules
import { useState } from "react"

// mui components
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

// services
import * as authService from '../../services/authService'
import * as profileService from '../../services/profileService'

const AccountSettings = () => {
  const [nameFormData, setNameFormData] = useState({ name: '' })

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNameFormData({ ...nameFormData, [evt.target.name]: evt.target.value })
  }

  const handleNameSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    await authService.changeUsername(nameFormData)
    await profileService.changeUsername(nameFormData)
  }

  const { name } = nameFormData

  return (
    <main className='page-component-container'>
      <Typography
        variant='h3'
        sx={{
          mb: 4,
        }}
      >
        Account Settings
      </Typography>
      <form
        autoComplete="off"
        onSubmit={handleNameSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          label='Name'
          name="name"
          value={name}
          onChange={handleNameChange}
          focused
        />
        <Button
          type="submit"
        >
          Submit
        </Button>
      </form>
    </main>
  )
}

export default AccountSettings