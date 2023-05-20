// mui components
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material"

const Footer = (): JSX.Element => {
  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pb: 2,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Link
          underline="hover"
          href="https://github.com/csalguera/log-go-front-end"
          target="_blank"
          rel="noreferrer"
          sx={{
            mx: 1,
            fontWeight: 'bold',
          }}
        >
          GitHub
        </Link>
        <Typography
          color='primary'
          sx={{
            mx: 1,
            fontWeight: 'bold',
          }}
        >
          |
        </Typography>
        <Link
          underline="hover"
          href="https://github.com/csalguera/log-go-front-end/blob/main/attributions.md"
          target="_blank"
          rel="noreferrer"
          sx={{
            mx: 1,
            fontWeight: 'bold',
          }}
        >
          Attributions
        </Link>
      </Box>
    </>
  )
}

export default Footer