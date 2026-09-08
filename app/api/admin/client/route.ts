import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientId, clientData } = body;

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const path = 'data/clients.json';

    // 1. Kunin ang kasalukuyang clients.json mula sa GitHub para makuha ang SHA at laman
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    );

    let clients: Record<string, any> = {};
    let currentSha = '';

    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json();
      currentSha = fileData.sha;
      const contentString = Buffer.from(fileData.content, 'base64').toString('utf-8');
      clients = JSON.parse(contentString);
    }

    // 2. Idagdag o i-update ang client gamit ang eksaktong format
    clients[clientId] = clientData;

    // 3. I-encode pabalik sa Base64
    const updatedContentBase64 = Buffer.from(
      JSON.stringify(clients, null, 2)
    ).toString('base64');

    // 4. I-commit ang pagbabago pabalik sa GitHub
    const updateResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Update client: ${clientId} via Admin Dashboard`,
          content: updatedContentBase64,
          ...(currentSha ? { sha: currentSha } : {}),
        }),
      }
    );

    if (!updateResponse.ok) {
      const errRes = await updateResponse.json();
      return NextResponse.json(
        { error: errRes.message || 'Failed to commit changes to GitHub' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Client updated successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}