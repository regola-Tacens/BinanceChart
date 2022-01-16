import { useRecoilState } from 'recoil';
import { darkMode } from '../../state/atoms';
import { DarkMode } from '../../types';
import './styles.css';

const HeaderNav = () => {
  const [mode, setMode] = useRecoilState<DarkMode>(darkMode)

  const handleDarkMode = () => {
    setMode(!mode)
  }

  return (
    <div className='headerNav'>
    <div className='dark-mode-btn' onClick={handleDarkMode}>{mode === true ? 'Light' : 'dark'}</div>
    </div>
    
  )
}

export default HeaderNav