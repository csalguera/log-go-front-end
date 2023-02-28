// styles
import styles from './Avatar.module.css'

// props
import { AvatarProps } from '../../types/props'

const Avatar = (props: AvatarProps) => {
  const {
    profile,
    size1,
    size2,
    size3,
  } = props

  const nameArr = profile!.name.split('')
  
  return (
    <>
      {profile?.photo
      ?
        <div className={styles["avatar-border"]} style={{width: size1, height: size1}}>
          <img
            src={profile?.photo}
            alt="Profile Photo"
            width={size2}
            height={size2}
            className={styles["profile-photo"]}
          />
        </div>
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