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
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        color='white'
        sx={{
          textShadow: `4px 4px 4px grey`
        }}
      >
        No Image
      </Typography>
    </Box>
  )
}

export default NoImage