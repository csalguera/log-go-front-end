// mui components
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

const Loading = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'background.default'
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  )
}

export default Loading