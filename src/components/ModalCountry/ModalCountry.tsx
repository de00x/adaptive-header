import { ReactComponent as Close } from './img/close.svg'
import { IAllCountries, ICities, IModalCountryProps, PopupClick } from './MCountry.types'
import { FC, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import axios, { AxiosResponse } from 'axios'
import './styles/index.css'
import Spinner from 'react-bootstrap/Spinner'
import styles from './styles/ModalCountry.module.scss'

export const ModalCountry: FC<IModalCountryProps> = ({
  setFlyModalCountry,
  textCurrLocationRef,
}): JSX.Element => {
  const [allCountries, setAllCountries] = useState<IAllCountries[]>([])
  const [currentCheckCity, setCurrentCheckCity] = useState('')
  const [skeletonSpinner, setSkeletonSpinner] = useState(true)
  const [dataICountry, setDataICountry] = useState({
    countryData: '',
  })
  const modalCurrCountryRef = useRef(null)

  useEffect(() => {
    axios
      .post('https://studika.ru/api/areas')
      .then((res) => successRespCountries(res))
      .catch((err) => console.log('err', err))
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent): void => {
      const _event = event as PopupClick
      if (
        modalCurrCountryRef.current != null &&
        !_event.path.includes(modalCurrCountryRef.current) &&
        textCurrLocationRef.current != null &&
        !_event.path.includes(textCurrLocationRef.current)
      ) {
        setFlyModalCountry(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /// functions ///
  const successRespCountries = (res: AxiosResponse): void => {
    setAllCountries(res.data)
    setSkeletonSpinner(false)
  }
  const currentLocation = (locationName: string): void => {
    setCurrentCheckCity(locationName)
  }
  const newCurrentLocation = (): void => {
    setFlyModalCountry(false)
    localStorage.setItem('location', currentCheckCity)
    setCurrentCheckCity('')
  }
  /// functions ///

  return (
    <div className={styles.mCountryContainer} ref={modalCurrCountryRef}>
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
              {country.cities
                ?.filter((city) =>
                  city.name
                    .trim()
                    .toLowerCase()
                    .includes(dataICountry.countryData.trim().toLowerCase())
                )
                .map((city: ICities) => (
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
      <button className={styles.countryBtnSave} onClick={newCurrentLocation}>
        Сохранить
      </button>
    </div>
  )
}
