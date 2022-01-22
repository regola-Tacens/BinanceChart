import { useRecoilState } from 'recoil';
import { darkMode, menuItemsVisible } from '../../state/atoms';
import { DarkMode, menuItems } from '../../types';
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
    <div className='dark-mode-btn' onClick={handleDarkMode}>{mode === true ? 'Light' : 'dark'}</div>
    <div onClick={handleShowPie}>pie</div>
    </div>
    
  )
}

export default HeaderNav