import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL}/api/google/callback`
)

export function getGoogleAuthUrl() {
  const scopes = [
    'https://www.googleapis.com/auth/business.manage',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  })
}

export async function getGoogleTokens(code: string) {
  const { tokens } = await oauth2Client.getToken(code)
  return tokens
}

export async function validateGoogleToken(accessToken: string) {
  oauth2Client.setCredentials({ access_token: accessToken })

  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
  const userInfo = await oauth2.userinfo.get()

  return userInfo.data
}

export async function refreshGoogleToken(refreshToken: string) {
  oauth2Client.setCredentials({ refresh_token: refreshToken })

  const { credentials } = await oauth2Client.refreshAccessToken()
  return credentials
}

export function createGoogleMyBusinessClient(accessToken: string) {
  oauth2Client.setCredentials({ access_token: accessToken })

  return google.mybusinessbusinessinformation({ version: 'v1', auth: oauth2Client })
}