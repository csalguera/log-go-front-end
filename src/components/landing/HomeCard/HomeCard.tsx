// props
import { HomeCardProps } from "../../../types/props"

const HomeCard = (props: HomeCardProps) => {
  const {
    resource,
  } = props

  return (
    <>
      <h1>{resource!?.name}</h1>
    </>
  )
}

export default HomeCard