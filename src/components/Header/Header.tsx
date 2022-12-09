import { ReactComponent as Location } from './img/location.svg'
import { PersonalBadge } from '../../components/PersonalBadge'
import { ModalCountry } from '../../components/ModalCountry'
import { ReactComponent as Search } from './img/search.svg'
import { ReactComponent as Heart } from './img/heart.svg'
import { ReactComponent as Close } from './img/close.svg'
import { CSSTransition } from 'react-transition-group'
import { FC, useRef, useState } from 'react'
import './styles/index.css'
import cn from 'classnames'
import styles from './styles/Header.module.scss'

export const Header: FC = (): JSX.Element => {
  const [flyModalCountry, setFlyModalCountry] = useState(false)
  const [flyModalBadge, setFlyModalBadge] = useState(false)
  const [searchData, setSearchData] = useState({
    search: '',
  })
  const textCurrLocationRef = useRef(null)
  /// functions ///
  const openModalBadge = (): void => {
    setFlyModalBadge(true)
  }
  const closeModalBadge = (): void => {
    if (flyModalBadge) setFlyModalBadge(false)
  }
  /// functions ///

  /// styles ///
  const stylesLocationSVGContainer = cn(styles.locationSVGContainer, {
    [styles.locationSVGContainerActive]: flyModalCountry,
  })
  /// styles ///
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogoWrapper} onMouseLeave={closeModalBadge}>
          <div className={styles.headerLogo} onMouseOver={openModalBadge}>
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
        <div className={styles.headerCurrLocationWrapper} ref={textCurrLocationRef}>
          <div
            onClick={() => setFlyModalCountry(!flyModalCountry)}
            className={styles.headerCurrLocation}
          >
            <div className={stylesLocationSVGContainer}>
              <Location />
            </div>
            {localStorage.getItem('location') === null || localStorage.getItem('location') === ''
              ? 'Любой регион'
              : localStorage.getItem('location')}
          </div>
          <CSSTransition
            in={flyModalCountry}
            classNames="openModalCountry"
            timeout={300}
            unmountOnExit
          >
            <ModalCountry
              setFlyModalCountry={setFlyModalCountry}
              textCurrLocationRef={textCurrLocationRef}
            />
          </CSSTransition>
        </div>
        <div className={styles.headerSearchContainer}>
          <div className={styles.inputSearchSVG}>
            <Search />
          </div>
          <input
            value={searchData.search}
            onChange={(e) => setSearchData({ ...searchData, search: e.target.value })}
            placeholder="Учебное заведение, специальность или профессия"
          />
          {searchData.search.length !== 0 && (
            <div className={styles.inputCloseSVG}>
              <Close onClick={() => setSearchData({ ...searchData, search: '' })} />
            </div>
          )}
        </div>
        <div className={styles.headerHeart}>
          <Heart /> 0
        </div>
        <div className={styles.headerPArea}>Войти</div>
      </div>
    </div>
  )
}
