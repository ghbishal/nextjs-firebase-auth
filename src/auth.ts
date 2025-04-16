import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { FirestoreAdapter, initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: FirestoreAdapter(
    initFirestore({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    })
  ),
  session: {
    strategy: "jwt", // this is require to use middleware jwt
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub!;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      try {
        const userRef = doc(db, "users", user.id!);

        await setDoc(
          userRef,
          {
            isAdmin: true,
            // add more fields as you want
          },
          { merge: true }
        );
      } catch (err) {
        console.error("[Firestore Merge Error]", err);
      }
    },
  },
  pages: {
    signIn: "/auth",
  },
  secret: process.env.AUTH_SECRET,
});
