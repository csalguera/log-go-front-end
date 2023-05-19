// npm modules
import { useState } from "react"
import { useNavigate } from "react-router"

// mui components
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

// services
import * as authService from '../../../services/authService'

// props
import { AccountSettingsProps } from "../../../types/props"

const ChangeFavColorForm = (props: AccountSettingsProps) => {
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
  )
}

export default ChangeFavColorForm