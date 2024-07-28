import styles from './SelectButton.module.scss'

export const SelectButton = ({
  isSelect,
  handleSelect,
  title: name,
}: {
  isSelect: boolean
  handleSelect: () => void
  title: string
}) => {
  return (
    <div className={styles.block} onClick={handleSelect}>
      <div className={`${styles.button} ${isSelect ? styles.true : styles.false}`} />
      <div style={{ fontSize: '24px' }}>{name}</div>
    </div>
  )
}
