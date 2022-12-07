import { ReactComponent as Location } from './img/location.svg'
import { ReactComponent as Search } from './img/search.svg'
import { ReactComponent as Close } from './img/close.svg'
import { FC, useState } from 'react'
import styles from './Header.module.scss'
import { ModalCountry } from '../../components/ModalCountry'

export const Header: FC = (): JSX.Element => {
  const [searchData, setSearchData] = useState({
    search: '',
  })
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>by de00x</div>
        <div className={styles.headerCurrLocation}>
          <div className={styles.locationSVGContainer}>
            <Location />
          </div>
          Любой регион
          <ModalCountry />
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
