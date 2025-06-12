import { NativeModules } from 'react-native'
import { sha256 } from '@noble/hashes/sha256'

const { HgsAuth } = NativeModules

function base64urlencode(buf: Uint8Array): string {
  return Buffer.from(buf)
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '')
}

function generateCodeVerifier(): string {
	const array = new Uint8Array(32)
	crypto.getRandomValues(array)
	return base64urlencode(array)
}

async function generateCodeChallenge(verifier: string): Promise<string> {
	const encoder = new TextEncoder()
	const data = encoder.encode(verifier)
	const hash = sha256(data)
	return base64urlencode(hash)
}


export async function authorizeMicrosoft({
  clientId,
  redirectUri,
  tenant = 'common',
  scopes = ['openid', 'profile', 'email'],
}: {
  clientId: string
  redirectUri: string
  tenant?: string
  scopes?: string[]
}) {
	console.log('Authorizing Microsoft with clientId:', clientId)
	const codeVerifier = generateCodeVerifier()
	console.log('Generated code verifier:', codeVerifier)
	const codeChallenge = await generateCodeChallenge(codeVerifier)

	console.log('Starting Microsoft authentication...', codeChallenge)

	const resultUrl: string = await HgsAuth.startAuth(
		clientId,
		redirectUri,
		scopes.join(' '),
		tenant,
		codeChallenge
	)

	const url = new URL(resultUrl)
	const code = url.searchParams.get('code')

	if (!code) throw new Error('No code in redirect')

	return { code, codeVerifier }
}
