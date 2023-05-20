// mui components
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material"

const NoImage = () => {
  const theme = useTheme()

  return (
    <Box
      height={300}
      sx={{
        py: 5,
        backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.background.paper})`,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        color='white'
        sx={{
          textShadow: `4px 4px 4px grey`,
          py: 2,
        }}
      >
        No Image
      </Typography>
      <Typography
        variant="h4"
        color='white'
        sx={{
          textShadow: `4px 4px 4px grey`,
          py: 2,
        }}
      >
        Available
      </Typography>
    </Box>
  )
}

export default NoImage