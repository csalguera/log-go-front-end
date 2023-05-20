// components
import NoImage from "../../NoImage/NoImage";

// mui components
import Typography from "@mui/material/Typography"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material";

// props
import { MovieCardRProps } from "../../../types/props"

const MovieCardR = (props: MovieCardRProps) => {
  const {
    movie,
  } = props

  const theme = useTheme()

  return (
    <Card
      sx={{
        width: 350,
        mx: 2,
      }}
    >
      {movie?.photo ? (
        <CardMedia
          component="img"
          alt={movie?.name}
          height={300}
          image={movie?.photo}
          sx={{
            objectFit: 'contain',
            py: 5,
            backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main}, rgba(0,0,0,1))`,
          }}
        />
      ) : (
        <NoImage />
      )}
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            height: 60,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {movie?.name}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Directed by: {movie?.director}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Released: {movie?.releaseDate}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Added by: <Link
            href={`/profiles/${movie?.profile.id}`}
          >
            {movie?.profile.name}
          </Link>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default MovieCardR