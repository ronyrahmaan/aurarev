import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

/**
 * Generate a marketing blurb from a review using AI
 * @param reviewText - The original review text
 * @param rating - The star rating (1-5)
 * @param businessType - Optional business type for context (e.g., "restaurant", "salon")
 * @returns Promise<string> - The generated marketing blurb
 */
export async function generateReviewBlurb(
  reviewText: string,
  rating: number,
  businessType?: string
): Promise<string> {
  try {
    const businessContext = businessType ? ` for a ${businessType}` : ''

    const prompt = `You are a professional marketing copywriter. Transform the following customer review${businessContext} into a compelling, short marketing testimonial (1-2 sentences max).

Make it:
- Natural and genuine (don't oversell)
- Professional yet conversational
- Focus on the key benefits mentioned
- Remove any negative aspects
- Make it quotable and shareable

Original Review (${rating}/5 stars): "${reviewText}"

Generate a marketing blurb:`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert marketing copywriter who creates authentic, compelling testimonials from customer reviews. Keep responses concise and genuine.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    })

    const blurb = response.choices[0]?.message?.content?.trim() || ''

    // Remove quotes if AI added them
    return blurb.replace(/^["']|["']$/g, '')
  } catch (error) {
    console.error('Error generating review blurb:', error)
    throw new Error(`Failed to generate review blurb: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Analyze sentiment of a review
 * @param reviewText - The review text to analyze
 * @param rating - The star rating for additional context
 * @returns Promise<{sentiment: 'positive' | 'neutral' | 'negative', confidence: number}>
 */
export async function analyzeReviewSentiment(
  reviewText: string,
  rating: number
): Promise<{sentiment: 'positive' | 'neutral' | 'negative', confidence: number}> {
  try {
    // Quick rule-based analysis for efficiency
    if (rating >= 4) return { sentiment: 'positive', confidence: 0.9 }
    if (rating <= 2) return { sentiment: 'negative', confidence: 0.9 }
    if (rating === 3) {
      // Use AI for neutral ratings to get more nuanced analysis
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Analyze the sentiment of this review. Respond with only one word: "positive", "negative", or "neutral".'
          },
          {
            role: 'user',
            content: `Review (${rating}/5 stars): "${reviewText}"`
          }
        ],
        max_tokens: 10,
        temperature: 0.1,
      })

      const sentiment = response.choices[0]?.message?.content?.trim().toLowerCase() as 'positive' | 'neutral' | 'negative'
      return { sentiment: sentiment || 'neutral', confidence: 0.7 }
    }

    return { sentiment: 'neutral', confidence: 0.5 }
  } catch (error) {
    console.error('Error analyzing sentiment:', error)
    // Fallback to rating-based sentiment
    if (rating >= 4) return { sentiment: 'positive', confidence: 0.5 }
    if (rating <= 2) return { sentiment: 'negative', confidence: 0.5 }
    return { sentiment: 'neutral', confidence: 0.5 }
  }
}

/**
 * Generate weekly business insights from multiple reviews
 * @param reviews - Array of review objects with text, rating, and date
 * @param businessName - Name of the business
 * @returns Promise<string> - Generated insights summary
 */
export async function generateWeeklyInsights(
  reviews: Array<{
    text: string
    rating: number
    date: Date
    reviewerName?: string
  }>,
  businessName: string
): Promise<string> {
  try {
    if (reviews.length === 0) {
      return "No new reviews this week. Consider encouraging satisfied customers to leave reviews."
    }

    const reviewSummary = reviews.map((r, i) =>
      `Review ${i + 1} (${r.rating}★): "${r.text}"`
    ).join('\n\n')

    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

    const prompt = `Generate a professional weekly review summary for ${businessName}.

This week's reviews (${reviews.length} total, ${averageRating.toFixed(1)}★ average):

${reviewSummary}

Provide:
1. Overall sentiment and key themes
2. Top strengths mentioned by customers
3. Any areas for improvement (if mentioned)
4. Actionable business recommendations

Keep it concise (3-4 short paragraphs), professional, and actionable for the business owner.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a business analytics expert who provides actionable insights from customer reviews. Be constructive, specific, and helpful.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 400,
      temperature: 0.6,
    })

    return response.choices[0]?.message?.content?.trim() || 'Unable to generate insights at this time.'
  } catch (error) {
    console.error('Error generating weekly insights:', error)
    return 'Unable to generate insights at this time. Please try again later.'
  }
}

/**
 * Extract key themes from multiple reviews
 * @param reviews - Array of review texts
 * @returns Promise<string[]> - Array of key themes/topics
 */
export async function extractReviewThemes(reviews: string[]): Promise<string[]> {
  try {
    if (reviews.length === 0) return []

    const reviewsText = reviews.join('\n\n')

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Extract 3-5 key themes or topics that customers frequently mention in these reviews. Return only a comma-separated list of themes (e.g., "service quality, food taste, atmosphere").'
        },
        {
          role: 'user',
          content: reviewsText
        }
      ],
      max_tokens: 60,
      temperature: 0.3,
    })

    const themesText = response.choices[0]?.message?.content?.trim() || ''
    return themesText.split(',').map(theme => theme.trim()).filter(theme => theme.length > 0)
  } catch (error) {
    console.error('Error extracting themes:', error)
    return []
  }
}