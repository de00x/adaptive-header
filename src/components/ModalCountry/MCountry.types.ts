export interface ICities {
  name: string
  id: string | number
}
export interface IAllCountries {
  name: string
  type: string
  id: string | number
  cities: ICities[]
}
