// mui components
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

// props
import { LoadingProps } from "../../types/props"

const Loading = (props: LoadingProps): JSX.Element => {
  const { loading } = props

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading