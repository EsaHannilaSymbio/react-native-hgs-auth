package com.hgs.auth

import android.app.Activity
import android.content.Intent
import android.net.Uri
import androidx.browser.customtabs.CustomTabsIntent
import com.facebook.react.bridge.*

class HgsAuthModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {
    private var promise: Promise? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName() = "HgsAuth"

    @ReactMethod
    fun startAuth(clientId: String, redirectUri: String, scopes: String, tenant: String, codeChallenge: String, promise: Promise) {
        this.promise = promise
        val authUri = Uri.parse("https://login.microsoftonline.com/$tenant/oauth2/v2.0/authorize")
            .buildUpon()
            .appendQueryParameter("client_id", clientId)
            .appendQueryParameter("response_type", "code")
            .appendQueryParameter("redirect_uri", redirectUri)
            .appendQueryParameter("response_mode", "query")
            .appendQueryParameter("scope", scopes)
            .appendQueryParameter("code_challenge", codeChallenge)
            .appendQueryParameter("code_challenge_method", "S256")
            .build()

        val builder = CustomTabsIntent.Builder()
        builder.build().launchUrl(currentActivity!!, authUri)
    }

    override fun onNewIntent(intent: Intent?) {
        val data = intent?.dataString
        if (data?.contains("code=") == true) {
            promise?.resolve(data)
            promise = null
        } else {
            promise?.reject("auth_failed", "No code in intent")
            promise = null
        }
    }

    override fun onActivityResult(p0: Activity?, p1: Int, p2: Int, p3: Intent?) {}
}
