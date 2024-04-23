import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const score = req.query['score']
    if (!score) {
      return res.status(400).send('Missing Score')
    }

    const imageUrl = `${process.env['HOST']}api/image-v2?score=${score}`

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>RYO Game</title>
          <meta property="og:title" content="RYO Game">
          <meta property="og:image" content="${imageUrl}">
          <meta property="og:description" content="Check out my progress!" />
          <meta property="og:url" content="https://ryo.game/" />
          <meta name="twitter:card" content="summary_large_image" />
        </head>
        <body>
        </body>
      </html>
    `)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error generating image')
  }
}
