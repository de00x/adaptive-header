import { IAllCountries, ICities, IModalCountryProps } from './types/MCountry.types'
import { ReactComponent as Close } from './img/close.svg'
import { CSSTransition } from 'react-transition-group'
import { FC, useRef, useState } from 'react'
import './styles/index.css'
import Spinner from 'react-bootstrap/Spinner'
import styles from './styles/ModalCountry.module.scss'
import MCountryService from './services/MCountry.service'
import MCountryControllers from './services/MCountryControllers'

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

  /// functions ///
  const { successRespCountries, currentLocation, newCurrentLocation } = MCountryControllers({
    setAllCountries,
    currentCheckCity,
    setSkeletonSpinner,
    setFlyModalCountry,
    setCurrentCheckCity,
  })
  /// functions ///

  /// useEffects ///
  MCountryService.GetAllCountries(successRespCountries)
  MCountryService.GetClickOutsideModal(modalCurrCountryRef, textCurrLocationRef, setFlyModalCountry)
  /// useEffects ///

  return (
    <div className={styles.mCountryContainer} ref={modalCurrCountryRef}>
      <div className={styles.countryInput}>
        <input
          value={dataICountry.countryData}
          onChange={(e) => setDataICountry({ ...dataICountry, countryData: e.target.value })}
          placeholder="Регион, населенный пункт, край"
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
      <div className={styles.horizontalWhiteLine} />
      <button className={styles.countryBtnSave} onClick={newCurrentLocation}>
        Сохранить
      </button>
    </div>
  )
}
