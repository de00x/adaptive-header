import { FC } from 'react'
import styles from './styles/PersBadge.module.scss'

export const PersonalBadge: FC = (): JSX.Element => {
  return (
    <div className={styles.personalBadgeContainer}>
      <a href="https://github.com/de00x" target="_blank" rel="noopener noreferrer">
        github/de00x
      </a>
    </div>
  )
}
