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

// props
import { MovieCardRProps } from "../../../types/props"

const MovieCardR = (props: MovieCardRProps) => {
  const {
    movie,
  } = props

  return (
    <Card
      sx={{
        width: 350,
        m: 2,
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
            backgroundImage: 'linear-gradient(to bottom, rgba(26,118,210,1), rgba(0,0,0,1))',
          }}
        />
      ) : (
        <NoImage />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Directed by: {movie?.director}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Released: {movie?.releaseDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
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