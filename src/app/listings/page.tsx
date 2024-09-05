"use client"
import { useAuth } from "@clerk/nextjs";

export default function Listing() {
    const { getToken, userId , isSignedIn } = useAuth()

      // Handle loadering state however you like
      return <div>Loading...Listings</div>
}
