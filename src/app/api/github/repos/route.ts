import { getGitHubUser } from '@/src/lib/utils/getGitHubUser';
import { NextResponse } from 'next/server';

const GITHUB_API_URL = process.env.NEXT_PUBLIC_GITHUB_API_URL as string;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN as string;

export async function POST(req: Request) {
  const { urlGithub } = await req.json();

  if (!urlGithub) {
    return NextResponse.json({ error: 'No GitHub URL provided' }, { status: 400 });
  }

  const { isSuccess, user } = getGitHubUser(urlGithub);

  if (!isSuccess || !user) {
    return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 });
  }

  try {
    const response = await fetch(`${GITHUB_API_URL}/${user}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(null, { status: 204 });
    }

    const repos = await response.json();
    return NextResponse.json(repos, { status: 200 });
  } catch (error) {
    console.error('Error in GitHub Repos API:', error);
    return NextResponse.json(null, { status: 204 });
  }
}