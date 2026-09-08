import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const adminUserHeader = request.headers.get('x-admin-user');
  const adminPassHeader = request.headers.get('x-admin-pass');

  if (
    adminUserHeader !== process.env.ADMIN_USERNAME ||
    adminPassHeader !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug, data } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      return NextResponse.json(
        { error: 'GitHub config missing in environment variables' },
        { status: 500 }
      );
    }

    const filePath = `data/clients/${slug}.json`;
    const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    // Tignan kung umiiral na ang file sa GitHub
    let sha = '';
    const getRes = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (getRes.ok) {
      const existingData = await getRes.json();
      sha = existingData.sha;
    }

    const contentBase64 = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

    const putRes = await fetch(getUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Update client data for ${slug}`,
        content: contentBase64,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!putRes.ok) {
      const errorData = await putRes.json();
      return NextResponse.json({ error: errorData.message }, { status: putRes.status });
    }

    return NextResponse.json({ success: true, message: 'Card data saved successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}