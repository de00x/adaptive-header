import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react'
import { PopupClick } from '../types/Countries.types'
import axios, { AxiosResponse } from 'axios'

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
  GetClickOutsideBurger(
    countriesWrapperRef: MutableRefObject<null>,
    bmCountriesContainerRef: MutableRefObject<null>,
    setOpenCountries: Dispatch<SetStateAction<boolean>>
  ) {
    useEffect(() => {
      const onClick = (event: MouseEvent): void => {
        const _event = event as PopupClick
        if (
          countriesWrapperRef.current != null &&
          !_event.path.includes(countriesWrapperRef.current) &&
          bmCountriesContainerRef.current != null &&
          !_event.path.includes(bmCountriesContainerRef.current)
        ) {
          setOpenCountries(false)
        }
      }
      document.addEventListener('click', onClick)
      return () => document.removeEventListener('click', onClick)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
}

export default MCountryService
