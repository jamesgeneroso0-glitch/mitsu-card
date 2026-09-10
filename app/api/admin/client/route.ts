import { NextResponse } from 'next/server';

// Helper function para makuha at i-update ang GitHub file
async function getGitHubFile(token: string, owner: string, repo: string, path: string) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
    cache: 'no-store',
  });
  if (!res.ok) return { clients: {}, sha: '' };
  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  try {
    return { clients: JSON.parse(content), sha: data.sha };
  } catch {
    return { clients: {}, sha: data.sha };
  }
}

// POST: Para mag-add o mag-update ng client
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientId, clientData } = body;

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const path = 'data/clients.json';

    const { clients, sha } = await getGitHubFile(token!, owner!, repo!, path);

    clients[clientId] = clientData;

    const updatedContentBase64 = Buffer.from(JSON.stringify(clients, null, 2)).toString('base64');

    const updateResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add/Update client: ${clientId} via Admin Dashboard`,
        content: updatedContentBase64,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!updateResponse.ok) {
      const errRes = await updateResponse.json();
      return NextResponse.json({ error: errRes.message || 'Failed to commit changes to GitHub' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Client saved successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Para tuluyang mabura ang client sa JSON at GitHub
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');

    if (!clientId) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const path = 'data/clients.json';

    const { clients, sha } = await getGitHubFile(token!, owner!, repo!, path);

    if (!clients[clientId]) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    delete clients[clientId];

    const updatedContentBase64 = Buffer.from(JSON.stringify(clients, null, 2)).toString('base64');

    const updateResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Delete client: ${clientId} via Admin Dashboard`,
        content: updatedContentBase64,
        sha,
      }),
    });

    if (!updateResponse.ok) {
      const errRes = await updateResponse.json();
      return NextResponse.json({ error: errRes.message || 'Failed to delete client from GitHub' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Client deleted successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}