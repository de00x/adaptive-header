import { IMCControllersProps } from '../types/Countries.types'
import { AxiosResponse } from 'axios'

const MCountryControllers = ({
  setAllCountries,
  setOpenCountries,
  currentCheckCity,
  setSkeletonSpinner,
  setCurrentCheckCity,
}: IMCControllersProps) => {
  const successRespCountries = (res: AxiosResponse): void => {
    setAllCountries(res.data)
    setSkeletonSpinner(false)
  }
  const currentLocation = (locationName: string): void => {
    setCurrentCheckCity(locationName)
  }
  const newCurrentLocation = (): void => {
    setOpenCountries(false)
    localStorage.setItem('location', currentCheckCity)
    setCurrentCheckCity('')
  }
  return { successRespCountries, currentLocation, newCurrentLocation }
}
export default MCountryControllers
