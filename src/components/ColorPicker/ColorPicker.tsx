// npm modules
import { useState } from "react";
import { ChromePicker, ColorResult } from "react-color"

// mui components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// services
import * as authService from '../../services/authService'

// types
import { ChangeFavColoreFormData } from "../../types/forms";

// props
import { ColorPickerProps } from "../../types/props";

const ColorPicker = (props: ColorPickerProps) => {
  const { favColor, setFavColor } = props

  const [favColorFormData, setFavColorFormData] = useState<ChangeFavColoreFormData>({ favColor: favColor })

  const handleChange = (color: ColorResult) => {
    setFavColor(color.hex)
    setFavColorFormData({ favColor: color.hex })
  }

  const handleSubmit = async () => {
    await authService.changeFavColor(favColorFormData)
  }

  const handleReset = async () => {
    setFavColor('#1a76d2')
    setFavColorFormData({ favColor: '#1a76d2' })
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          type="submit"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
    </>
  )
}

export default ColorPicker