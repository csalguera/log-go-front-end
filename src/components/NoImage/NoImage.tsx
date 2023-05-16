// mui components
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const NoImage = () => {
  return (
    <Box
      height={300}
      sx={{
        py: 5,
        backgroundImage: 'linear-gradient(to bottom, rgba(26,118,210,1), rgba(0,0,0,1))',
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