// npm packages
import { Link } from 'react-router-dom'

// styles
import styles from './Footer.module.css'

const Footer = (): JSX.Element => {
  return (
    <div className={styles["footer-container"]}>
      <Link
        to='https://github.com/csalguera/log-go-front-end'
        target='_blank'
        className={styles["link-tags"]}
      >
        GitHub
      </Link>
      <p>|</p>
      <Link
        to='https://github.com/csalguera/log-go-front-end/blob/main/attributions.md'
        target='_blank'
        className={styles["link-tags"]}
      >
        Attributions
      </Link>
    </div>
  )
}

export default Footer