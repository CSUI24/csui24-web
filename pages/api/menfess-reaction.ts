import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@/lib/generated/prisma'
import { globalRateLimit } from '@/lib/rateLimiter'

const rateLimit = globalRateLimit()

const enabledReactions = (process.env.NEXT_PUBLIC_ENABLED_REACTIONS ?? '')
  .split(',')
  .map(r => r.trim())
  .filter(Boolean)

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (!rateLimit(req, res)) return
    const { menfessId, type, action } : {menfessId: string, type: string, action: 'add'|'remove'} = req.body

    if (!menfessId || !type) {
      return res.status(400).json({ error: 'Missing menfessId or type' })
    }

    if (!enabledReactions.includes(type)) {
      return res.status(400).json({ error: 'Reaction type not allowed' })
    }

    try {
      const initAmt = action === 'remove' ? 0 : 1;
      const incrAmt = action === 'remove' ? -1 : 1;
      const updated = await prisma.reaction.upsert({
        // if action is remove, then we need to check the existence of atleast 1 like.
        where: { menfessId_type: { menfessId, type }, count: {gte: action==='remove' ? 1 : 0} }, 
        create: { menfessId, type, count: initAmt },
        update: { count: { increment: incrAmt } },
      })

      return res.status(200).json({ success: true, newCount: updated.count })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Database error' })
    }
  }

  if (req.method === 'GET') {
    const menfessId = req.query.menfessId as string | undefined

    if (!menfessId) {
      return res.status(400).json({ error: 'Missing menfessId' })
    }

    try {
      const reactions = await prisma.reaction.findMany({
        where: { menfessId },
      })

      return res.status(200).json(reactions)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Database error' })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}