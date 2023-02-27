// styles
import styles from './DefaultAvatar.module.css'

// props
import { DefaultAvatarProps } from '../../types/props'

const DefaultAvatar = (props: DefaultAvatarProps) => {
  const { profile } = props

  const nameArr = profile!.name.split('')
  
  return (
    <div className={styles["avatar-border"]}>
      <div className={styles["nested-border"]}>
        <h1>{nameArr[0]}</h1>
      </div>
    </div>
  )
}

export default DefaultAvatar