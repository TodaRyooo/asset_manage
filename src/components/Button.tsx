// import React from 'react'

import styles from './Button.module.scss'

export const Button = ({ onClick, text }: { onClick: () => void; text: string }) => {
  return (
    <div className={styles.tmp} onClick={onClick}>
      {text}
    </div>
  )
}
