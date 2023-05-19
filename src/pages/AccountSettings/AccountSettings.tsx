// npm modules
import { useState } from "react"
import { useNavigate } from "react-router"

// mui components
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

// components
import ChangeNameForm from "../../components/forms/ChangeNameForm/ChangeNameForm"

// services
import * as authService from '../../services/authService'

// props
import { AccountSettingsProps } from "../../types/props"

const AccountSettings = (props: AccountSettingsProps) => {
  const { handleAuthEvt } = props
  const navigate = useNavigate()

  const [favColorFormData, setFavColorFormData] = useState({ favColor: '' })

  const handleFavColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFavColorFormData({ ...favColorFormData, [evt.target.name]: evt.target.value })
  }

  const handleFavColorSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    await authService.changeFavColor(favColorFormData)
    setFavColorFormData({ favColor: '' })
    handleAuthEvt()
    navigate('/profiles/my-profile')
  }

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
      <ChangeNameForm
        handleAuthEvt={handleAuthEvt}
      />
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