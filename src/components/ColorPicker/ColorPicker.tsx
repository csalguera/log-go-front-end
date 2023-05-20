// npm modules
import { Dispatch, SetStateAction, useState } from "react";
import { ChromePicker, ColorResult } from "react-color"

// mui components
import Button from "@mui/material/Button";

// services
import * as authService from '../../services/authService'

interface ColorPickerProps {
  favColor: string | undefined;
  setFavColor: Dispatch<SetStateAction<string | undefined>>;
}

const ColorPicker = (props: ColorPickerProps) => {
  const { favColor, setFavColor } = props

  const [favColorFormData, setFavColorFormData] = useState({ favColor: '' })

  const handleChange = (color: ColorResult) => {
    setFavColor(color.hex)
    setFavColorFormData({ favColor: color.hex })
  }

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    await authService.changeFavColor(favColorFormData)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ChromePicker
          onChange={handleChange}
          color={favColor}
        />
        <Button
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  )
}

export default ColorPicker