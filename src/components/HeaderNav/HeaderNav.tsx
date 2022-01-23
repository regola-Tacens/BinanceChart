import { useRecoilState } from 'recoil';
import { darkMode, menuItemsVisible } from '../../state/atoms';
import { DarkMode, menuItems } from '../../types';
import sun from '../../assets/pictos/sun.png'
import moon from '../../assets/pictos/moon.png'
import './styles.css';

const HeaderNav = () => {
  const [mode, setMode] = useRecoilState<DarkMode>(darkMode)
  const [menuItems, setMenuItems] = useRecoilState<menuItems>(menuItemsVisible)

  const handleDarkMode = () => {
    setMode(!mode)
  }

  const handleShowPie = () => {
    setMenuItems({...menuItems, pie: !menuItems.pie})
  }

  return (
    <div className='headerNav'>
    <switch>

    </switch>
    <img className='dark-mode-btn' onClick={handleDarkMode} src={mode === true ? moon : sun } />
    {/* <div onClick={handleShowPie}>pie</div> */}
    </div>
    
  )
}

export default HeaderNav