import { HeaderMobile } from './components/Mobile/HeaderMobile'
import { Header } from './components/Desktop/Header'
import { FC } from 'react'

const App: FC = (): JSX.Element => (
  <>
    <Header />
    <HeaderMobile />
  </>
)

export default App
