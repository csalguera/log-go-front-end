// mui components
import Typography from "@mui/material/Typography"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from "@mui/material/Link";


// props
import { HomeCardProps } from "../../../types/props"

const HomeCard = (props: HomeCardProps) => {
  const {
    resource,
  } = props

  return (
    <Card
      sx={{
        width: 350,
        m: 2,
      }}
    >
      <CardMedia
        component="img"
        alt={resource?.name}
        height={300}
        image={resource?.photo}
        sx={{
          objectFit: 'contain',
          py: 5,
          background: 'rgba(0,0,0,0.9)'
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {resource?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Directed by: {resource?.director}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Released: {resource?.releaseDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Added by: <Link
            href={`/profiles/${resource?.profile.id}`}
          >
            {resource?.profile.name}
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

export default HomeCard