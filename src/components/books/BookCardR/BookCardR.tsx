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
import { BookCardRProps } from "../../../types/props"

const BookCardR = (props: BookCardRProps) => {
  const { user, book } = props

  const theme = useTheme()

  return (
    <Card
      sx={{
        width: 350,
        mx: 2,
      }}
    >
      {book?.photo ? (
        <CardMedia
          component="img"
          alt={book?.name}
          height={300}
          image={book?.photo}
          sx={{
            objectFit: 'contain',
            py: 5,
            backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.background.paper})`,
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
          {book?.name}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Directed by: {book?.author}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Released: {book?.published}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Added by: <Link
            href={user?.id === book?.profile.id ? `/profiles/my-profile` : `/profiles/${book?.profile.id}`}
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

export default BookCardR