export interface AuthTokens {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    id_token: string;
    token_type: string;
}
export declare function exchangeCodeForToken({ clientId, redirectUri, code, codeVerifier, }: {
    clientId: string;
    redirectUri: string;
    code: string;
    codeVerifier: string;
}): Promise<AuthTokens>;
export declare function refreshAccessToken({ clientId, redirectUri, }: {
    clientId: string;
    redirectUri: string;
}): Promise<AuthTokens>;
export declare function storeTokens(tokens: AuthTokens): Promise<void>;
export declare function logout(): Promise<void>;
export declare function getStoredAccessToken(): Promise<string | null>;
