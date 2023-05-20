// npm modules
import { useState } from "react";
import { ChromePicker, ColorResult } from "react-color"

// mui components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

// services
import * as authService from '../../services/authService'

// types
import { ChangeFavColoreFormData } from "../../types/forms";

// props
import { ColorPickerProps } from "../../types/props";

const ColorPicker = (props: ColorPickerProps) => {
  const { user, handleAuthEvt, favColor, setFavColor } = props
  const theme = useTheme()

  const [favColorFormData, setFavColorFormData] = useState<ChangeFavColoreFormData>({ favColor: favColor })

  const handleChange = (color: ColorResult) => {
    setFavColor(color.hex)
    setFavColorFormData({ favColor: color.hex })
  }

  const handleSubmit = async () => {
    await authService.changeFavColor(favColorFormData)
    handleAuthEvt()
  }

  const handleReset = async () => {
    setFavColor(theme.palette.secondary.main)
    setFavColorFormData({ favColor: theme.palette.secondary.main })
  }

  const handleCancel = () => {
    setFavColor(user?.favColor)
    setFavColorFormData({ favColor })
  }

  return (
    <>
      <ChromePicker
        onChange={handleChange}
        color={favColor}
      />
      <Box>
        <Button
          type="submit"
          onClick={handleReset}
          disabled={favColor === '#1a76d2'}
        >
          Reset
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={favColor === user?.favColor}
        >
          Save
        </Button>
        <Button
          type="submit"
          onClick={handleCancel}
          disabled={favColor === user?.favColor}
        >
          Cancel
        </Button>
      </Box>
    </>
  )
}

export default ColorPicker