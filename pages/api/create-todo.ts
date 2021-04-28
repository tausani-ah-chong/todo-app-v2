import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../lib/db'

async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { text } = req.body
  try {
    const results = await query(`
      INSERT INTO todos (text) VALUES (?) 
  `, [text])
    // eslint-disable-next-line no-console
    console.log(results);
    return res.send('Values inserted')
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
