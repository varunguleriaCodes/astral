import { NextRequest, NextResponse } from 'next/server'
import { sendSlackMessage } from 'utils/slack'

export const POST = async (req: NextRequest) => {
  try {
    const logData = await req.json()
    const slackMessage = await sendSlackMessage('Astral Error', [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Astral Error',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Path: ${req.nextUrl.pathname.replace('/api/log/', '')}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `\`\`\`${JSON.stringify(logData, null, 2).slice(0, 5000)}\`\`\``,
        },
      },
    ])

    if (slackMessage) {
      return NextResponse.json({ message: 'Log sent successfully' })
    } else {
      return NextResponse.json({ error: 'Failed to send log' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error sending log:')
    return NextResponse.json({ error: 'Failed to send log' }, { status: 500 })
  }
}
