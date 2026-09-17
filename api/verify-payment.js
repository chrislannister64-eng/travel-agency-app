export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  const { reference } = req.body

  if (!reference) {
    return res.status(400).json({
      error: 'Payment reference is required',
    })
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || 'Paystack verification failed',
      })
    }

    return res.status(200).json({
      verified: data.status === true && data.data?.status === 'success',
      data: data.data,
    })
  } catch (error) {
    console.error('Paystack verification error:', error)

    return res.status(500).json({
      error: 'Unable to verify payment',
    })
  }
}