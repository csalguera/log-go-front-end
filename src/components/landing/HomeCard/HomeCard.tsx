// props
import { HomeCardProps } from "../../../types/props"

const HomeCard = (props: HomeCardProps) => {
  const {
    movie,
  } = props

  return (
    <>
      <h1>{movie!?.name}</h1>
    </>
  )
}

export default HomeCard