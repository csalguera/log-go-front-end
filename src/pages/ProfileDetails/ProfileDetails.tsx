// npm packages
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// services
import * as profileService from '../../services/profileService'

// types
import { Profile, List } from '../../types/models'

const ProfileDetails = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [lists, setLists] = useState<List[] | null>(null)

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const data: Profile = await profileService.getProfile(id)
        setProfile(data)
        setLists(data.lists)
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile()
  }, [id])
  

  return (
    <>
      <h1>Profile Details</h1>
      <p>{profile?.name}</p>
      <img src={profile?.photo} alt="Profile Photo" />
      {lists?.map(list => (
        <div key={list.id}>
          <p>Favorite Movie: {list.movie}</p>
          <p>Favorite Book: {list.book}</p>
          <p>Favorite Tv Show: {list.tvShow}</p>
          <p>Favorite Song: {list.song}</p>
          <p>Favorite Video Game: {list.videoGame}</p>
          <p>Favorite Board Game: {list.boardGame}</p>
          <p>Favorite Indoor Activity: {list.indoorActivity}</p>
          <p>Favorite Outdoor Activity: {list.outdoorActivity}</p>
        </div>
      ))}
    </>
  )
}

export default ProfileDetails