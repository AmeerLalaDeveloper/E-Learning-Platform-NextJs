import Navbar from '../Navbar/Navbar'
import Searchbar from '../Searchbar/Searchbar'
import styles from './Header.module.css'
function Header() {
  return (
      <header className={styles.header}>
       <Navbar/>
       <Searchbar/>
      </header>  
      )
}

export default Header