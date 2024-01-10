
import Link from 'next/link'
import styles from './Navbar.module.css'
import { auth } from '@/auth'
async function Navbar() {
  const session=await auth();
  return (
      <nav className={styles.nav}>
          <Link className={styles.navLink} href="/">Home</Link>
          <Link className={styles.navLink} href="/courses">Courses</Link>
          <Link className={styles.navLink} href="/about">About</Link>
          <Link className={styles.navLink} href="/profile">Profile</Link>
          <Link className={styles.navLink} href="/login">Login</Link>
      </nav>
  )
}

export default Navbar