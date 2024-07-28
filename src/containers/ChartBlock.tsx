import styles from './ChartBlock.module.scss'

const ChartBox = ({
  text,
  defaultValue,
  handleClick,
}: {
  text: string
  defaultValue: number | number[]
  handleClick: (e: any) => void
}) => {
  return (
    <div className={styles.chartBlk}>
      <div style={{ fontSize: '24px' }}>{text}</div>
      <input
        className={styles.inputStyle}
        type='number'
        onChange={handleClick}
        defaultValue={
          typeof defaultValue === 'number'
            ? defaultValue !== 0
              ? defaultValue
              : undefined
            : defaultValue[0] !== 0
              ? defaultValue[0]
              : defaultValue[1]
        }
      />
    </div>
  )
}

export default ChartBox
