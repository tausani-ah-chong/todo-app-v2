import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../lib/db'

async function handler (_: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const results = await query(`
      SELECT * FROM todos
  `)
    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
