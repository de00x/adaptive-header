import { ReactComponent as Heart } from './img/heart.svg'
import { CSSTransition } from 'react-transition-group'
import { PersonalBadge } from '../../PersonalBadge'
import { BurgerMenu } from '../BurgerMenu'
import { FC, useState } from 'react'
import styles from './styles/HeaderMobile.module.scss'

export const HeaderMobile: FC = (): JSX.Element => {
  const [flyModalBadge, setFlyModalBadge] = useState(false)

  return (
    <div className={styles.headerMobileWrapper}>
      <div className={styles.headerMobileContainer}>
        <div className={styles.burgerMenuContainer}>
          <BurgerMenu />
        </div>
        <div className={styles.headerLogoWrapper} onMouseLeave={() => setFlyModalBadge(false)}>
          <div className={styles.headerLogo} onMouseOver={() => setFlyModalBadge(true)}>
            by de00x
          </div>
          <CSSTransition
            in={flyModalBadge}
            classNames="openModalCountry"
            timeout={500}
            unmountOnExit
          >
            <PersonalBadge />
          </CSSTransition>
        </div>
        <div className={styles.mobilePersonalAContainer}>
          <Heart /> 0
        </div>
      </div>
    </div>
  )
}
