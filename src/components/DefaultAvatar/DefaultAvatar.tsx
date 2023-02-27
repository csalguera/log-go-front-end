// styles
import styles from './DefaultAvatar.module.css'

const DefaultAvatar = (props) => {
  const { profile } = props

  return (
    <div className={styles["avatar-border"]}>
      {profile.name}
    </div>
  )
}

export default DefaultAvatar