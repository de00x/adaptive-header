import axios, { AxiosResponse } from 'axios'
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react'
import { PopupClick } from '../types/MCountry.types'

const MCountryService = {
  GetAllCountries(successRespCountries: (res: AxiosResponse) => void) {
    useEffect(() => {
      axios
        .post('https://studika.ru/api/areas')
        .then((res) => successRespCountries(res))
        .catch((err) => console.log('err', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
  GetClickOutsideModal(
    modalCurrCountryRef: MutableRefObject<null>,
    textCurrLocationRef: MutableRefObject<null>,
    setFlyModalCountry: Dispatch<SetStateAction<boolean>>
  ) {
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
  },
}

export default MCountryService
