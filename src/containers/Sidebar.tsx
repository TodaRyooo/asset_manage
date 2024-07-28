'use client'

import { PageStore, pageValueType } from '@/libs/pageStore'
import { useEffect, useState } from 'react'
import { Allocation, Close, Expenses, Hamburger, History, MainLogo, Settings } from '../../public/icons'
import global from '../global.module.scss'
import styles from './Sidebar.module.scss'

const listItems = [
  { key: 'allocation', label: 'Allocation', value: 1, component: <Allocation width={40} height={40} /> },
  { key: 'expenses', label: 'Expenses', value: 2, component: <Expenses width={40} height={40} /> },
  { key: 'history', label: 'History', value: 3, component: <History width={40} height={40} /> },
  { key: 'settings', label: 'Settings', value: 4, component: <Settings width={40} height={40} /> },
]

export const Sidebar = () => {
  const { pageValue, modifyPageValue } = PageStore()
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState<pageValueType>(pageValue)

  const initializePageState = () => {
    setPage({ allocation: false, expenses: false, history: false, settings: false })
  }

  const handleLabelClick = (key: string) => {
    initializePageState()
    setPage((state) => ({ ...state, [key]: true }))
  }

  useEffect(() => {
    modifyPageValue(page)
  }, [modifyPageValue, page])

  return (
    <div className={styles.block}>
      <div className={`${styles.innerBlk} ${isOpen ? styles.open : styles.closed}`}>
        <div className={`${styles.svgBox} ${isOpen ? styles.open : styles.closed}`}>
          <MainLogo fill={global.PrimaryDark100} width={40} height={40} />
        </div>
        <div style={{ width: '100%' }}>
          {listItems.map((item) => (
            <div className={styles.listBox} key={item.label} onClick={() => handleLabelClick(item.key)}>
              <div className={`${styles.component} ${isOpen && styles.open}`}>{item.component}</div>
              <div className={`${isOpen ? styles.labelOpen : styles.labelClosed}`}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.border}>
        <div
          className={`${styles.hamburger} ${isOpen ? styles.open : styles.closed}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <Close width={20} height={20} /> : <Hamburger width={20} height={20} />}
        </div>
      </div>
    </div>
  )
}
