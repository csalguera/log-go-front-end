// styles
import styles from './Avatar.module.css'

// props
import { AvatarProps } from '../../types/props'

const Avatar = (props: AvatarProps) => {
  const { profile } = props

  const size1 = "200px"
  const size2 = "175px"
  const size3 = "80px"

  const nameArr = profile!.name.split('')
  
  return (
    <>
      {profile?.photo
      ?
        <img src={profile?.photo} alt="Profile Photo" />
      :
        <div className={styles["avatar-border"]} style={{width: size1, height: size1}}>
          <div className={styles["nested-border"]} style={{width: size2, height: size2}}>
            <h1 style={{fontSize: size3}}>{nameArr[0]}</h1>
          </div>
        </div>
      }
    </>
  )
}

export default Avatar