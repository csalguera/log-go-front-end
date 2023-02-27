// styles
import styles from './DefaultAvatar.module.css'

const DefaultAvatar = (props) => {
  const { profile } = props

  const nameArr = profile.name.split('')
  
  return (
    <div className={styles["avatar-border"]}>
      <h1>{nameArr[0]}</h1>
    </div>
  )
}

export default DefaultAvatar