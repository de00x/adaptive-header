import { ReactComponent as Location } from './img/location.svg'
import { ReactComponent as Search } from './img/search.svg'
import { ReactComponent as Close } from './img/close.svg'
import { FC, useState } from 'react'
import { ModalCountry } from '../../components/ModalCountry'
import { CSSTransition } from 'react-transition-group'
import './index.css'
import cn from 'classnames'
import styles from './Header.module.scss'

export const Header: FC = (): JSX.Element => {
  const [flyModalCountry, setFlyModalCountry] = useState(false)
  const [searchData, setSearchData] = useState({
    search: '',
  })

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>by de00x</div>
        <div className={styles.headerCurrLocationWrapper}>
          <div
            onClick={() => setFlyModalCountry(!flyModalCountry)}
            className={styles.headerCurrLocation}
          >
            <div
              className={cn(styles.locationSVGContainer, {
                [styles.locationSVGContainerActive]: flyModalCountry,
              })}
            >
              <Location />
            </div>
            Любой регион
          </div>
          <CSSTransition
            in={flyModalCountry}
            classNames="openModalCountry"
            timeout={300}
            unmountOnExit
          >
            <ModalCountry />
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
        <div className={styles.headerHeart}>Heart</div>
        <div className={styles.headerPArea}>Parea</div>
      </div>
    </div>
  )
}
