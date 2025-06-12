import { NativeModules } from 'react-native';
import { sha256 } from '@noble/hashes/sha256';
const { HgsAuth } = NativeModules;
function base64urlencode(buf) {
    return Buffer.from(buf)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
function generateCodeVerifier() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return base64urlencode(array);
}
async function generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = sha256(data);
    return base64urlencode(hash);
}
export async function authorizeMicrosoft({ clientId, redirectUri, tenant = 'common', scopes = ['openid', 'profile', 'email'], }) {
    console.log('Authorizing Microsoft with clientId:', clientId, 'redirectUri:', redirectUri, 'tenant:', tenant, 'scopes:', scopes);
    if (!clientId || !redirectUri) {
        throw new Error('clientId and redirectUri are required');
    }
    if (!HgsAuth) {
        throw new Error('HgsAuth module is not available. Ensure it is linked correctly.');
    }
    if (typeof HgsAuth.startAuth !== 'function') {
        throw new Error('HgsAuth.startAuth is not a function. Ensure the native module is implemented correctly.');
    }
    const codeVerifier = generateCodeVerifier();
    console.log('Generated code verifier:', codeVerifier);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    console.log('Starting Microsoft authentication...', codeChallenge);
    const resultUrl = await HgsAuth.startAuth(clientId, redirectUri, scopes.join(' '), tenant, codeChallenge);
    const url = new URL(resultUrl);
    const code = url.searchParams.get('code');
    if (!code)
        throw new Error('No code in redirect');
    return { code, codeVerifier };
}
