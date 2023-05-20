// npm modules
import { useState } from "react"
import { useNavigate } from "react-router"

// mui components
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

// services
import * as profileService from '../../../services/profileService'
import * as authService from '../../../services/authService'

// props
import { ChangeNameFormProps } from "../../../types/props"

const ChangeNameForm = (props: ChangeNameFormProps) => {
  const { handleAuthEvt } = props
  const navigate = useNavigate()
  const [nameFormData, setNameFormData] = useState({ name: '' })

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNameFormData({ ...nameFormData, [evt.target.name]: evt.target.value })
  }
  
  const handleNameSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    await authService.changeUsername(nameFormData)
    await profileService.changeUsername(nameFormData)
    setNameFormData({ name: '' })
    handleAuthEvt()
    navigate('/profiles/my-profile')
  }

  const { name } = nameFormData

  return (
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
  )
}

export default ChangeNameForm