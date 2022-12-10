interface ICities {
  name: string
  id: string | number
}
interface IAllCountries {
  name: string
  type: string
  id: string | number
  cities: ICities[]
}
type PopupClick = MouseEvent & {
  path: Node[]
}
interface IModalCountryProps {
  setFlyModalCountry: React.Dispatch<React.SetStateAction<boolean>>
  textCurrLocationRef: React.MutableRefObject<null>
}

export type { ICities, IAllCountries, IModalCountryProps, PopupClick }
