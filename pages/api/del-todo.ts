import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../lib/db'

async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id } = req.body
  try {
    const results = await query(`
      DELETE FROM todos WHERE id = (?)
    `, [id])
  // eslint-disable-next-line no-console
  console.log(results);
  return res.send('Todo Deleted')
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
