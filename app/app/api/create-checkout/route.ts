import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { clientData } = await request.json();

    // PayMongo API Key (Dapat ilagay mo ito sa iyong .env.local bilang PAYMONGO_SECRET_KEY)
    const encodedKey = Buffer.from(process.env.PAYMONGO_SECRET_KEY || '').toString('base64');

    const response = await fetch('https://api.paymongo.com/v1/links', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedKey}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: 49900, // 499 PHP (Nakapangalan sa centavos ang PayMongo)
            description: `Mitsu Smart Card - ${clientData.name}`,
            remarks: clientData.clientId,
          },
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result.errors || 'Failed to create payment link' }, { status: 400 });
    }

    return NextResponse.json({
      checkoutUrl: result.data.attributes.checkout_url,
      referenceNumber: result.data.attributes.reference_number,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}