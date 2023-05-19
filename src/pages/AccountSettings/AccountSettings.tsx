// mui components
import Typography from "@mui/material/Typography"

// components
import ChangeNameForm from "../../components/forms/ChangeNameForm/ChangeNameForm"
import ChangeFavColorForm from "../../components/forms/ChangeFavColorForm/ChangeFavColorForm"
import ColorPicker from "../../components/ColorPicker/ColorPicker"

// props
import { AccountSettingsProps } from "../../types/props"

const AccountSettings = (props: AccountSettingsProps) => {
  const { handleAuthEvt } = props

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
      <ChangeFavColorForm
        handleAuthEvt={handleAuthEvt}
      />
      <ColorPicker />
    </main>
  )
}

export default AccountSettings