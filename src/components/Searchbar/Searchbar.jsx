'use client'

import { useDebouncedCallback } from 'use-debounce';
import styles from './Searchbar.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
function Searchbar() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('course', term);
        } else {
            params.delete('course');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);
  return (
      <div className={styles.searchBar}>
          <input onChange={(e)=>handleSearch(e.target.value)} type="text" placeholder="Search for courses" />
          <button>Search</button>
      </div>  )
}

export default Searchbar