# React Native HGS Auth package

## Example: Full Login Flow
```ts
import {
  authorizeMicrosoft,
  exchangeCodeForToken,
  storeTokens,
} from './HgsAuthService'

export async function loginWithMicrosoft({
    clientId,
    redirectUri,
}: {
    clientId: string
    redirectUri: string
}) {
    // Step 1: Get authorization code
    const { code, codeVerifier } = await authorizeMicrosoft({
        clientId,
        redirectUri,
    })

    // Step 2: Exchange for tokens
    const tokens = await exchangeCodeForToken({
        clientId,
        redirectUri,
        code,
        codeVerifier,
    })

    // Step 3: Store securely
    await storeTokens(tokens)

    return tokens
}

```

## Example: Token Usage Example

```ts
import { getStoredAccessToken, refreshAccessToken } from './HgsAuthService'

async function fetchUserProfile() {
    let token = await getStoredAccessToken()
    if (!token) {
        const refreshed = await refreshAccessToken({
        clientId: '...',
        redirectUri: '...',
        })
        token = refreshed.access_token
    }

    const res = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) throw new Error(await res.text())
    return res.json()
}
```