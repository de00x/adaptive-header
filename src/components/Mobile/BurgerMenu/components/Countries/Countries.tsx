import { IAllCountries, ICities, ICountriesProps } from './types/Countries.types'
import { ReactComponent as Close } from './img/close.svg'
import { CSSTransition } from 'react-transition-group'
import { FC, useRef, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import styles from './styles/Countries.module.scss'
import MCountryService from './services/MCountry.service'
import MCountryControllers from './services/MCountryControllers'

export const Countries: FC<ICountriesProps> = ({
  setOpenCountries,
  bmCountriesContainerRef,
}): JSX.Element => {
  const [allCountries, setAllCountries] = useState<IAllCountries[]>([])
  const [skeletonSpinner, setSkeletonSpinner] = useState(true)
  const [currentCheckCity, setCurrentCheckCity] = useState('')
  const [dataICountry, setDataICountry] = useState({
    countryData: '',
  })
  const countriesWrapperRef = useRef(null)

  /// functions ///
  const { successRespCountries, currentLocation, newCurrentLocation } = MCountryControllers({
    setCurrentCheckCity,
    setSkeletonSpinner,
    setOpenCountries,
    currentCheckCity,
    setAllCountries,
  })
  /// functions ///

  /// useEffects ///
  MCountryService.GetAllCountries(successRespCountries)
  MCountryService.GetClickOutsideBurger(
    bmCountriesContainerRef,
    countriesWrapperRef,
    setOpenCountries
  )
  /// useEffects ///

  return (
    <div className={styles.countriesWrapper} ref={countriesWrapperRef}>
      <Close className={styles.countriesCloseBtn} onClick={() => setOpenCountries(false)} />
      <div className={styles.inputContainer}>
        <input
          value={dataICountry.countryData}
          onChange={(e) => setDataICountry({ ...dataICountry, countryData: e.target.value })}
          placeholder="Регион, населенный пункт, край"
        />
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
          {allCountries
            ?.filter((city) =>
              city.name.trim().toLowerCase().includes(dataICountry.countryData.trim().toLowerCase())
            )
            .map((country: IAllCountries) => (
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
      <div className={styles.horizontalWhiteLine}></div>
      <button className={styles.countryBtnSave} onClick={newCurrentLocation}>
        Сохранить
      </button>
    </div>
  )
}
