'use server'

import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body
      const { fileTitle } = req.query
      const dataDir = path.join(process.cwd(), 'data')

      // データディレクトリが存在するか確認し、存在しない場合は作成
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir)
      }

      const filePath = path.join(dataDir, `${fileTitle}.json`)

      await fs.promises.writeFile(filePath, JSON.stringify(data), 'utf8')
      res.status(200).json(data)
    } catch (error) {
      console.error('JSONファイルの書き込みエラー:', error)
      res.status(500).json({ error: 'JSONファイルの書き込みエラー' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
