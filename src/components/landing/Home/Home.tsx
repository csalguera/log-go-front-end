// mui components
import Typography from "@mui/material/Typography"

// props
import { HomeProps } from "../../../types/props"

const Home = (props: HomeProps) => {
  const { user } = props

  return (
    <>
      <Typography
        variant="h3"
      >
        This is the Home component
      </Typography>
    </>
  )
}

export default Home