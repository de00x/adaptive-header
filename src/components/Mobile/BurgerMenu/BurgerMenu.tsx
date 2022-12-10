import { ReactComponent as MenuOpenBtn } from './img/burger-menu-btn.svg'
import { ReactComponent as Location } from './img/location.svg'
import { ReactComponent as CloseBtn } from './img/close.svg'
import { FC, useRef, useState } from 'react'
import './styles/BurgerMenu.scss'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Countries } from './components/Countries'
import { CSSTransition } from 'react-transition-group'

export const BurgerMenu: FC = () => {
  const [openCountries, setOpenCountries] = useState(false)
  const bmCountriesContainerRef = useRef(null)
  const handleClose = () => setShow(false)
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)

  return (
    <>
      {show ? <CloseBtn /> : <MenuOpenBtn className="openBurgerBtn" onClick={handleShow} />}
      <Offcanvas show={show} onHide={handleClose}>
        <div className="burgerMenuWrapper">
          <CloseBtn className="bMenuCloseBtn" onClick={handleClose} />
          <div className="burgerMenuContainer">
            <div className="bmBtnLogin">
              <button>Войти</button>
            </div>
            <div
              className="bmCurrentLocationContainer"
              onClick={() => setOpenCountries(!openCountries)}
              ref={bmCountriesContainerRef}
            >
              <div className="bmCurrentLocationTextContainer">
                <div className="bmCurrentLocationText">Город или регион</div>
                <div className="bmCurrentLocation">
                  {localStorage.getItem('location') === null ||
                  localStorage.getItem('location') === ''
                    ? 'Любой регион'
                    : localStorage.getItem('location')}
                </div>
              </div>
              <div className="bmCurrentLocationSVGContainer">
                <div className="bmCurrentLocationSVG">
                  <Location />
                </div>
              </div>
            </div>
            <CSSTransition
              in={openCountries}
              classNames="openModalCountry"
              timeout={500}
              unmountOnExit
            >
              <Countries
                setOpenCountries={setOpenCountries}
                bmCountriesContainerRef={bmCountriesContainerRef}
              />
            </CSSTransition>
          </div>
        </div>
      </Offcanvas>
    </>
  )
}
