import { IStylesControllerProps } from '../types/Header.types'
import styles from '../styles/Header.module.scss'
import cn from 'classnames'

const stylesController = ({ flyModalCountry }: IStylesControllerProps) => {
  const stylesLocationSVGContainer = cn(styles.locationSVGContainer, {
    [styles.locationSVGContainerActive]: flyModalCountry,
  })
  return { stylesLocationSVGContainer }
}
export default stylesController
