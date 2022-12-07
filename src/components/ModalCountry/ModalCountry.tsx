import { ReactComponent as Close } from './img/close.svg'
import { FC, useState } from 'react'
import styles from './ModalCountry.module.scss'

export const ModalCountry: FC = (): JSX.Element => {
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
      <button className={styles.countryBtnSave}>Сохранить</button>
    </div>
  )
}
