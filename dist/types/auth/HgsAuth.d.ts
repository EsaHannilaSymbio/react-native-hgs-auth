export declare function authorizeMicrosoft({ clientId, redirectUri, tenant, scopes, }: {
    clientId: string;
    redirectUri: string;
    tenant?: string;
    scopes?: string[];
}): Promise<{
    code: string;
    codeVerifier: string;
}>;
