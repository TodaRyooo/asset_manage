import { useState } from 'react'
import styles from './Flip.module.scss'

export const Flip = ({ text }: { text: string[] }) => {
  const [flip, setFlip] = useState(false)
  return (
    <div style={{ display: 'flex', width: 'fit-content', alignItems: 'center' }}>
      <div className={flip ? styles.trueBlock : styles.falseBlock} onClick={() => setFlip(!flip)}>
        <div className={flip ? styles.trueCircle : styles.falseCircle} />
      </div>
      <div style={{ marginLeft: '2px', fontSize: '16px' }}>{flip ? text[1] : text[0]}</div>
    </div>
  )
}
