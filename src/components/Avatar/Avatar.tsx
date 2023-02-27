// styles
import styles from './Avatar.module.css'

// props
import { AvatarProps } from '../../types/props'

const Avatar = (props: AvatarProps) => {
  const { profile } = props

  const nameArr = profile!.name.split('')
  
  return (
    <>
      {profile?.photo
      ?
        <img src={profile?.photo} alt="Profile Photo" />
      :
        <div className={styles["avatar-border"]}>
          <div className={styles["nested-border"]}>
            <h1>{nameArr[0]}</h1>
          </div>
        </div>
      }
    </>
  )
}

export default Avatar