import { ReactComponent as Close } from './img/close.svg'
import { IAllCountries, ICities } from './MCountry.types'
import { FC, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.css'
import axios, { AxiosResponse } from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import styles from './ModalCountry.module.scss'

export const ModalCountry: FC = (): JSX.Element => {
  const [allCountries, setAllCountries] = useState<IAllCountries[]>([])
  const [currentCheckCity, setCurrentCheckCity] = useState('')
  const [skeletonSpinner, setSkeletonSpinner] = useState(true)
  useEffect(() => {
    axios
      .post('https://studika.ru/api/areas')
      .then((res) => successRespCountries(res))
      .catch((err) => console.log('err', err))
  }, [])

  /// functions ///
  const successRespCountries = (res: AxiosResponse): void => {
    setAllCountries(res.data)
    setSkeletonSpinner(false)
  }
  const currentLocation = (locationName: string): void => {
    setCurrentCheckCity(locationName)
  }
  /// functions ///
  const [dataICountry, setDataICountry] = useState({
    countryData: '',
  })
  return (
    <div className={styles.mCountryContainer}>
      <div className={styles.countryInput}>
        <input
          value={dataICountry.countryData}
          onChange={(e) => setDataICountry({ ...dataICountry, countryData: e.target.value })}
          placeholder="Регион, город, населенный пункт"
        />
        {dataICountry.countryData.length !== 0 && (
          <div className={styles.countryICloseSVG}>
            <Close />
          </div>
        )}
      </div>
      <CSSTransition
        in={currentCheckCity.length !== 0}
        classNames="addCurrLocation"
        timeout={300}
        unmountOnExit
      >
        <div className={styles.currentLocationContainer}>
          <div className={styles.currentLocation}>
            <div>{currentCheckCity}</div>
            <Close onClick={() => setCurrentCheckCity('')} />
          </div>
        </div>
      </CSSTransition>
      <div className={styles.horizontalWhiteLine} />
      {skeletonSpinner ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : (
        <div className={styles.countriesContainer}>
          {allCountries?.map((country: IAllCountries) => (
            <div key={country.id}>
              <div onClick={() => currentLocation(country.name)} className={styles.cities}>
                {country.name}
              </div>
              {country.cities?.map((city: ICities) => (
                <div
                  onClick={() => currentLocation(city.name)}
                  key={city.id}
                  className={styles.cities}
                >
                  {city.name}
                  <div className={styles.countries}>{country.name}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className={styles.horizontalWhiteLine} />
      <button className={styles.countryBtnSave}>Сохранить</button>
    </div>
  )
}
