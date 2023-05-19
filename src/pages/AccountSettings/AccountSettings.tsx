// npm modules
import { useState } from "react"
import { useNavigate } from "react-router"

// mui components
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

// services
import * as authService from '../../services/authService'
import * as profileService from '../../services/profileService'

interface AccountSettingsProps {
  handleAuthEvt: () => void;
}

const AccountSettings = (props: AccountSettingsProps) => {
  const { handleAuthEvt } = props
  const navigate = useNavigate()
  
  const [nameFormData, setNameFormData] = useState({ name: '' })
  const [favColorFormData, setFavColorFormData] = useState({ favColor: '' })

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNameFormData({ ...nameFormData, [evt.target.name]: evt.target.value })
  }

  const handleFavColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFavColorFormData({ ...favColorFormData, [evt.target.name]: evt.target.value })
  }

  const handleNameSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    await authService.changeUsername(nameFormData)
    await profileService.changeUsername(nameFormData)
    setNameFormData({ name: '' })
    handleAuthEvt()
    navigate('/profiles/my-profile')
  }

  const handleFavColorSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    await authService.changeFavColor(favColorFormData)
    setFavColorFormData({ favColor: '' })
    handleAuthEvt()
    navigate('/profiles/my-profile')
  }

  const { name } = nameFormData
  const { favColor } = favColorFormData

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
          required
        />
        <Button
          type="submit"
        >
          Submit
        </Button>
      </form>
      <form
        autoComplete="off"
        onSubmit={handleFavColorSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          label='Favorite Color'
          name="favColor"
          value={favColor}
          onChange={handleFavColorChange}
          focused
          required
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