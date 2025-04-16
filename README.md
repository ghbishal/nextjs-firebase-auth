# 🔐 Next.js + NextAuth.js v5 + Firebase + Google Login

A simple and secure authentication setup using:

- ✅ Next.js App Router
- ✅ [NextAuth.js v5 (Auth.js)](https://authjs.dev/)
- ✅ Google login via Firebase
- ✅ Firestore as adapter for user storage

---

## 📦 Environment Variables

Create a `.env.local` file in the root of your project and copy the following:

```bash
cp .env.example .evn.local
```

```env
# 🔐 Auth.js secret
AUTH_SECRET=your-auth-secret-here

# 🔑 Firebase Client-Side Config (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# 🔐 Firebase Admin SDK (Private)
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="your-private-key-here"

# 🔐 Google OAuth (for NextAuth)
AUTH_GOOGLE_ID=your-google-oauth-client-id
AUTH_GOOGLE_SECRET=your-google-oauth-client-secret
```

## 🛠 Setup Instructions

### 1. Create a Firebase Project

- Go to [Firebase Console](https://console.firebase.google.com/)
- Click **"Add Project"**
- Follow the steps to create a new Firebase project

---

### 2. Get Firebase Public Config

- Go to **Project Settings** → **General**
- Under **Your apps**, click **</> Add app** (Web App)
- Firebase will show a config like:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

Copy these values and paste them into your .env.local inside **_Firebase Client-Side Config (Public)_**

---

### 3. Enable Google Sign-In in Firebase

- Go to your [Firebase Console](https://console.firebase.google.com/)
- Navigate to **Authentication** → **Sign-in method**
- Click **Google** under providers
- Enable it and click **Save**
- You will see a **Web client ID** under the enabled provider

```env
AUTH_GOOGLE_ID=your-web-client-id-here
```

---

### 4. Get Google OAuth Client Secret

- Go to the [Google Cloud Console – Credentials](https://console.cloud.google.com/apis/credentials)
- Make sure the correct Firebase project is selected (same as your Firebase project)
- Under the section titled **OAuth 2.0 Client IDs**, click on the existing **Web client** (the one created automatically by Firebase when you enabled Google login)
- You will see both the:
  - **Client ID**
  - **Client Secret**

Copy both values and add them to your `.env.local`:

```env
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

---

> ## ⚠️ **Important Note: Authorized Redirect URIs Required**

When setting up your Google OAuth credentials in the [Google Cloud Console – Credentials](https://console.cloud.google.com/apis/credentials):

Make sure to add the following to the **Authorized redirect URIs** section of your OAuth 2.0 Web Client:

- Example : [your-base-url]/api/auth/callback/google
- For local development: http://localhost:3000/api/auth/callback/google

---

### 5. Generate Firebase Admin SDK Credentials

- Go to your Firebase Admin SDK settings:  
  [https://console.firebase.google.com/project/{your-project-id}/settings/serviceaccounts/adminsdk](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk)  
  _(Replace `{your-project-id}` with your actual Firebase project ID)_

- Scroll down and click **"Generate new private key"**

- A `.json` file will be downloaded — this is your **Firebase Admin SDK service account**

- Open the file and extract the following two fields:
  - `"client_email"` → This becomes `FIREBASE_CLIENT_EMAIL`
  - `"private_key"` → This becomes `FIREBASE_PRIVATE_KEY`

Add them to your `.env.local` file:

```env
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="your-multiline-private-key"
```

## ✅ You're Ready!

Run the project:

```
pnpm install
pnpm run dev
```

## 💡 Need Help or contribute?

Please create a issue and a pr.
