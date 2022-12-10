interface ICities {
  name: string
  id: string | number
}
interface IAllCountries {
  name: string
  type: string
  cities: ICities[]
  id: string | number
}
type PopupClick = MouseEvent & {
  path: Node[]
}
interface ICountriesProps {
  bmCountriesContainerRef: React.MutableRefObject<null>
  setOpenCountries: React.Dispatch<React.SetStateAction<boolean>>
}
interface IMCControllersProps {
  currentCheckCity: string
  setOpenCountries: React.Dispatch<React.SetStateAction<boolean>>
  setSkeletonSpinner: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentCheckCity: React.Dispatch<React.SetStateAction<string>>
  setAllCountries: React.Dispatch<React.SetStateAction<IAllCountries[]>>
}

export type { ICities, IAllCountries, PopupClick, ICountriesProps, IMCControllersProps }
