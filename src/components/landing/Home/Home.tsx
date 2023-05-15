// npm modules
import { useState, useEffect } from "react"

// mui components
import Typography from "@mui/material/Typography"

// services
import * as indexService from "../../../services/indexService"

// types
import { Resource } from "../../../types/models"

// props
import { HomeProps } from "../../../types/props"

const Home = (props: HomeProps) => {
  const { user } = props
  const [resources, setResources] = useState<Resource | null>(null)

  useEffect(() => {
    const fetchResources = async (): Promise<void> => {
      try {
        const data = await indexService.index()
        setResources(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchResources()
  }, [])

  return (
    <>
      <Typography
        variant="h3"
      >
        This is the Home component
      </Typography>
      {resources?.movies.map(movie => (
        movie.name
      ))}
    </>
  )
}

export default Home