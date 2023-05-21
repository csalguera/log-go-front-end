// mui components
import Typography from "@mui/material/Typography"

// components
import ChangeNameForm from "../../components/forms/ChangeNameForm/ChangeNameForm"
import ColorPicker from "../../components/ColorPicker/ColorPicker"
import { useTheme } from "@mui/material"

// props
import { AccountSettingsProps } from "../../types/props"

const AccountSettings = (props: AccountSettingsProps) => {
  const { user, handleAuthEvt, favColor, setFavColor } = props
  const theme = useTheme()

  return (
    <main className='page-component-container' style={{ backgroundColor: theme.palette.background.default }}>
      <Typography
        variant='h3'
        sx={{
          mb: 4,
          color: 'text.primary'
        }}
      >
        Account Settings
      </Typography>
      <ChangeNameForm
        handleAuthEvt={handleAuthEvt}
      />
      <ColorPicker
        user={user}
        handleAuthEvt={handleAuthEvt}
        favColor={favColor}
        setFavColor={setFavColor}
      />
    </main>
  )
}

export default AccountSettings