// mui components
import Typography from "@mui/material/Typography"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from "@mui/material/Link";

// props
import { HomeBookCardProps } from "../../../../types/props"

const HomeBookCard = (props: HomeBookCardProps) => {
  const {
    book,
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
        alt={book?.name}
        height={300}
        image={book?.photo}
        sx={{
          objectFit: 'contain',
          py: 5,
          background: 'rgba(0,0,0,0.9)'
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Directed by: {book?.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Released: {book?.published}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Added by: <Link
            href={`/profiles/${book?.profile.id}`}
          >
            {book?.profile.name}
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

export default HomeBookCard