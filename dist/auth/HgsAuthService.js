import * as Keychain from 'react-native-keychain';
const MICROSOFT_TOKEN_URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
export async function exchangeCodeForToken({ clientId, redirectUri, code, codeVerifier, }) {
    const params = new URLSearchParams({
        client_id: clientId,
        scope: 'openid profile email offline_access',
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        code_verifier: codeVerifier,
    });
    const res = await fetch(MICROSOFT_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
    });
    if (!res.ok)
        throw new Error(await res.text());
    return res.json();
}
export async function refreshAccessToken({ clientId, redirectUri, }) {
    const credentials = await Keychain.getGenericPassword();
    if (!credentials)
        throw new Error('No stored tokens');
    const tokens = JSON.parse(credentials.password);
    const params = new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: tokens.refresh_token,
        redirect_uri: redirectUri,
        scope: 'openid profile email offline_access',
    });
    const res = await fetch(MICROSOFT_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
    });
    if (!res.ok)
        throw new Error(await res.text());
    const newTokens = await res.json();
    await storeTokens(newTokens);
    return newTokens;
}
export async function storeTokens(tokens) {
    await Keychain.setGenericPassword('microsoft', JSON.stringify(tokens), {
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
}
export async function logout() {
    await Keychain.resetGenericPassword();
}
export async function getStoredAccessToken() {
    const credentials = await Keychain.getGenericPassword();
    if (!credentials)
        return null;
    const tokens = JSON.parse(credentials.password);
    return tokens.access_token;
}
