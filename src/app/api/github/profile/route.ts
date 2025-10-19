import { getGitHubUser } from '@/src/lib/utils/getGitHubUser';
import { NextResponse } from 'next/server';

const GITHUB_API_URL = process.env.NEXT_PUBLIC_GITHUB_API_URL as string;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN as string;

export async function POST(req: Request) {
  const { urlGithub } = await req.json();

  if (!urlGithub) {
    return NextResponse.json({ error: 'No GitHub URL provided' }, { status: 400 });
  }

  const GITHUB_USERNAME = getGitHubUser(urlGithub).user;

  if (!GITHUB_USERNAME) {
    return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 });
  }

  try {
    const response = await fetch(`${GITHUB_API_URL}/${GITHUB_USERNAME}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      // En vez de enviar un error, retornamos un 204 No Content
      return NextResponse.json(null, { status: 204 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in API:', error);
    // En vez de enviar un error, retornamos un 204 No Content
    return NextResponse.json(null, { status: 204 });
  }
}