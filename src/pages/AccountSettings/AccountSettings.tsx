// mui components
import Typography from "@mui/material/Typography"

// components
import ChangeNameForm from "../../components/forms/ChangeNameForm/ChangeNameForm"
import ColorPicker from "../../components/ColorPicker/ColorPicker"

// props
import { AccountSettingsProps } from "../../types/props"

const AccountSettings = (props: AccountSettingsProps) => {
  const { handleAuthEvt, favColor, setFavColor } = props

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
      <ColorPicker
        favColor={favColor}
        setFavColor={setFavColor}
      />
    </main>
  )
}

export default AccountSettings