'use client'

import { CategoryStore, categoryValueType } from '@/libs/CategoryStore'
import { PickStore } from '@/libs/PickStore'
import { PageStore } from '@/libs/pageStore'
import AllocationPage from '@/prisma/allocation'
import ExpensesPage from '@/prisma/expenses'
import SettingsPage from '@/prisma/settings'

export default function Home() {
  const { income, categoryValue, remain } = CategoryStore()
  const { pickValue } = PickStore()
  const { pageValue } = PageStore()

  const categoryTmpItems = [
    { key: 'deposit', text: '貯金' },
    { key: 'food', text: '食費' },
    { key: 'housing', text: '家賃' },
    { key: 'utilities', text: '光熱費' },
    { key: 'water', text: '水道費' },
    { key: 'daily', text: '日用品' },
    { key: 'entertainment', text: '娯楽費' },
    { key: 'other', text: 'その他' },
  ]

  const fuga: { x: string; y: number }[] = []

  categoryTmpItems.map((item) => {
    if (pickValue[item.key as keyof categoryValueType]) {
      const piyo = { x: item.text, y: categoryValue[item.key as keyof categoryValueType] }
      fuga.push(piyo)
    }
  })

  return (
    <>
      {pageValue.allocation && <AllocationPage />}
      {pageValue.expenses && <ExpensesPage />}
      {pageValue.settings && <SettingsPage />}
    </>
  )
}

{
  /* <div style={{ display: 'flex', width: '100%', gap: '4vw' }}>
        <div className={styles.block}>
          <div className={`${styles.chartBlk} ${styles.fadeFirst}`}>
            <div className={`${styles.title}`} style={{ maxWidth: '484px' }}>
              総貯金額
            </div>
            <div className={`${styles.amount}`}>{income}</div>
          </div>

          <div className={`${styles.chartBlk} ${styles.fadeSecond}`}>
            <div className={styles.title}>{SETTINGS.TITLE}</div>
            {remain === 0 ? (
              <VictoryPie
                data={fuga}
                innerRadius={45}
                labels={(pie) => `${pie.datum.x} ${pie.datum.y} %`}
                labelRadius={100}
                colorScale={colors}
                cornerRadius={8}
                padAngle={({ datum }) => datum.y * 0.1}
                style={{
                  labels: { fontFamily: 'Noto Sans Mono', fontSize: 12, fill: '#e0e0e0' },
                  parent: { maxWidth: '484px', width: '100%', height: '100%' },
                }}
                labelIndicator={<LineSegment style={{ stroke: '#e0e0e0', strokeDasharray: 5 }} />}
              />
            ) : (
              <div
                style={{
                  maxWidth: '484px',
                  width: '100%',
                  height: '100%',
                  fontSize: '24px',
                  overflowWrap: 'break-word',
                }}
              >
                Cannot be displayed because the sum of all factors exceeds 100%.
              </div>
            )}
          </div>
        </div>

        <div className={styles.block}>
          <div className={`${styles.chartBlk} ${styles.fadeFirst}`}>
            <div className={`${styles.title}`} style={{ width: 'auto' }}>
              今月の貯金額
            </div>
            <div className={`${styles.amount}`}>
              {categoryValue.deposit !== 0 && (income * categoryValue.deposit) / 100}
            </div>
          </div>
        </div>
      </div> */
}
