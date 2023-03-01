import { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color'


const ColorPicker = (): JSX.Element => {
  const [color, setColor] = useState('#000000')
  
  return (
    <>
      <ChromePicker
        color={color}
        onChange={(newColor: ColorResult) => setColor(newColor.hex)}
      />
    </>
  )
}

export default ColorPicker