import { Flip } from '@/components/Flip'
import styles from './ChartBlock.module.scss'

const ChartCategoryBox = ({
  text,
  flipText,
  defaultValue,
  handleClick,
}: {
  text: string
  flipText: string[]
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
      <Flip text={flipText} />
    </div>
  )
}

export default ChartCategoryBox
