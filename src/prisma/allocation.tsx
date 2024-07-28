import { Button } from '@/components/Button'
import { SelectButton } from '@/components/SelectButton'
import ChartBox from '@/containers/ChartBlock'
import ChartCategoryBox from '@/containers/ChartCategoryBlock'
import { SETTINGS } from '@/enums'
import { CategoryStore, categoryValueType } from '@/libs/CategoryStore'
import { PickStore, pickValueType } from '@/libs/PickStore'
import { saveDataToJson } from '@/pages/api/saveDataToJson'
import styles from '@/scss/allocation.module.scss'
import { useEffect, useState } from 'react'
import { LineSegment, VictoryPie } from 'victory'

const AllocationPage = () => {
  const {
    income,
    categoryValue,
    remain,
    categorySum,
    modifyIncomeValue,
    modifyCategoryValue,
    modifyRemainValue,
    modifyCategorySumValue,
  } = CategoryStore()
  const { deposit, food, housing, utilities, water, daily, entertainment, pass, other } = categoryValue
  const { pickValue, modifyPickValue } = PickStore()

  const [pick, setPick] = useState<pickValueType>(pickValue)
  const [percent, setPercent] = useState<categoryValueType>(categoryValue)

  const tmp = new Date()
  const tmptmp = tmp.toLocaleString().replace(/\//g, '').replace(/ /g, '_').replace(/:/g, '')

  const categoryTmpItems = [
    { key: 'deposit', text: '貯金' },
    { key: 'food', text: '食費' },
    { key: 'housing', text: '家賃' },
    { key: 'utilities', text: '光熱費' },
    { key: 'water', text: '水道費' },
    { key: 'daily', text: '日用品' },
    { key: 'entertainment', text: '娯楽費' },
    { key: 'pass', text: '定期代' },
    { key: 'other', text: 'その他' },
  ]

  const buzz: { x: string; y: number }[] = []
  const temu: { category: string; percent: number }[] = []

  categoryTmpItems.map((item) => {
    if (pickValue[item.key as keyof categoryValueType]) {
      const piyo = { x: item.text, y: categoryValue[item.key as keyof categoryValueType] }
      const hogehoge = { category: item.text, percent: categoryValue[item.key as keyof categoryValueType] }
      buzz.push(piyo)
      temu.push(hogehoge)
    }
  })

  const colors = [
    '#01c1ba',
    '#0b959f',
    '#285b77',
    '#d3167c',
    '#8d155e',
    '#292a50',
    '#241a44',
    '#201636' /*, '#ececed'*/,
  ]

  const handleSelectButtonClick = (stateKey: keyof pickValueType) => {
    setPick((prevState) => ({ ...prevState, [stateKey]: !pick[stateKey] }))
  }

  const handleCategoryValueChange = (stateKey: string, value: number) => {
    const tmp = stateKey as keyof categoryValueType
    setPercent((prevState) => ({ ...prevState, [tmp]: value }))
  }

  useEffect(() => {
    modifyPickValue(pick)
    modifyCategoryValue(percent)
    modifyCategorySumValue(deposit + food + housing + utilities + water + daily + entertainment + pass + other)
    modifyRemainValue(100 - categorySum)
  }, [
    income,
    pick,
    percent,
    deposit,
    food,
    housing,
    utilities,
    water,
    daily,
    entertainment,
    pass,
    other,
    categorySum,
    modifyRemainValue,
    modifyPickValue,
    modifyCategoryValue,
    modifyCategorySumValue,
    modifyIncomeValue,
  ])

  return (
    <>
      <div className={styles.block}>
        <div className={styles.incomeBox}>
          <ChartBox
            text='収入ダヨーン'
            defaultValue={income}
            handleClick={(e) => modifyIncomeValue(Number(e.target.value))}
          />
          <div className={`${styles.chartBlk} ${styles.fadeSecond}`} style={{ gap: '10px' }}>
            <div className={styles.remainBox}>
              <div>残り</div>
              <div>{Math.round(remain * 10) / 10}%</div>
            </div>
          </div>

          <div style={{ display: 'flex', padding: '0 20px', justifyContent: 'space-between' }}>
            <div className={`${styles.categoryPickBox} ${styles.fadeThird}`}>
              {categoryTmpItems.map((item) => (
                <SelectButton
                  key={`pick_${item.key}`}
                  isSelect={pickValue[item.key as keyof pickValueType]}
                  handleSelect={() => handleSelectButtonClick(item.key as keyof pickValueType)}
                  title={item.text}
                />
              ))}
            </div>
            <Button text='save' onClick={() => saveDataToJson(temu, tmptmp)} />
          </div>
        </div>

        <div className={styles.categoryItemsBox}>
          {categoryTmpItems.map(
            (item) =>
              pickValue[item.key as keyof pickValueType] && (
                <ChartCategoryBox
                  key={`blk_${item.key}`}
                  text={`${item.text} (%)  ${income !== 0 ? Math.round((income * categoryValue[item.key as keyof categoryValueType]) / 100) : ''}`}
                  flipText={['percent', 'price']}
                  defaultValue={categoryValue[item.key as keyof categoryValueType]}
                  handleClick={(e) => handleCategoryValueChange(item.key, Number(e.target.value))}
                />
              ),
          )}
        </div>

        <div className={`${styles.chartBlk} ${styles.fadeSecond} ${styles.pieChartBox}`}>
          <div className={styles.title}>{SETTINGS.TITLE}</div>
          {income !== 0 ? (
            <VictoryPie
              data={buzz}
              innerRadius={45}
              labels={(pie) => pie.datum.y}
              labelRadius={110}
              colorScale={colors}
              cornerRadius={8}
              padAngle={({ datum }) => datum.y * 0.1}
              style={{
                labels: { fontFamily: 'Noto Sans Mono', fontSize: 12, fill: '#e0e0e0' },
                parent: { maxWidth: '100%', height: '100%' },
              }}
              labelIndicator={<LineSegment style={{ stroke: '#e0e0e0', strokeDasharray: 5 }} />}
            />
          ) : (
            <div className={styles.pieMessageStyle}>
              Cannot be displayed because the sum of all factors exceeds 100%.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AllocationPage
