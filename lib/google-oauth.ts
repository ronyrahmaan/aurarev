import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/google/callback`
)

export function getGoogleAuthUrl(userId?: string) {
  const scopes = [
    'https://www.googleapis.com/auth/business.manage',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
    state: userId || 'anonymous'
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

  const businessInfo = google.mybusinessbusinessinformation({ version: 'v1', auth: oauth2Client })
  const accountManagement = google.mybusinessaccountmanagement({ version: 'v1', auth: oauth2Client })

  return {
    businessInfo,
    accountManagement,
    auth: oauth2Client
  }
}

// Function to get business accounts using Account Management API
export async function getGoogleBusinessAccounts(accessToken: string) {
  oauth2Client.setCredentials({ access_token: accessToken })

  try {
    // Use Account Management API v1 (the migration path from deprecated v4)
    const response = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.accounts || []
  } catch (error) {
    console.error('Error fetching Google Business accounts:', error)
    throw error
  }
}

// Function to get business locations for an account using Business Information API
export async function getGoogleBusinessLocations(accessToken: string, accountName: string) {
  oauth2Client.setCredentials({ access_token: accessToken })

  try {
    // Use Business Information API v1 (the migration path from deprecated locations)
    const response = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.locations || []
  } catch (error) {
    console.error('Error fetching Google Business locations:', error)
    throw error
  }
}

// Function to get reviews for a business location using Business Profile API
export async function getGoogleBusinessReviews(accessToken: string, locationName: string) {
  oauth2Client.setCredentials({ access_token: accessToken })

  try {
    // Using Business Profile API for reviews
    const response = await fetch(`https://mybusiness.googleapis.com/v4/${locationName}/reviews`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.reviews || []
  } catch (error) {
    console.error('Error fetching Google Business reviews:', error)
    throw error
  }
}