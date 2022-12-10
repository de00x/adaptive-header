import { ReactComponent as Location } from './img/location.svg'
import { ReactComponent as Search } from './img/search.svg'
import { ReactComponent as Heart } from './img/heart.svg'
import { ReactComponent as Close } from './img/close.svg'
import { CSSTransition } from 'react-transition-group'
import { PersonalBadge } from '../../PersonalBadge'
import { ModalCountry } from '../ModalCountry'
import { FC, useRef, useState } from 'react'
import './styles/Header.scss'

import styles from './styles/Header.module.scss'
import stylesController from './styles/stylesController'

export const Header: FC = (): JSX.Element => {
  const [flyModalCountry, setFlyModalCountry] = useState(false)
  const [flyModalBadge, setFlyModalBadge] = useState(false)
  const [searchData, setSearchData] = useState({
    search: '',
  })
  const textCurrLocationRef = useRef(null)

  /// styles ///
  const { stylesLocationSVGContainer } = stylesController({ flyModalCountry })
  /// styles ///
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
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
