import { AxiosResponse } from 'axios'
import { IAllCountries } from '../types/MCountry.types'

interface IMCControllersProps {
  currentCheckCity: string
  setSkeletonSpinner: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentCheckCity: React.Dispatch<React.SetStateAction<string>>
  setFlyModalCountry: React.Dispatch<React.SetStateAction<boolean>>
  setAllCountries: React.Dispatch<React.SetStateAction<IAllCountries[]>>
}

const MCountryControllers = ({
  setAllCountries,
  currentCheckCity,
  setSkeletonSpinner,
  setFlyModalCountry,
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
    setFlyModalCountry(false)
    localStorage.setItem('location', currentCheckCity)
    setCurrentCheckCity('')
  }
  return { successRespCountries, currentLocation, newCurrentLocation }
}
export default MCountryControllers
