import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { collection, query, where, onSnapshot, or } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Messages({ user, loading }) {
  const [conversations, setConversations] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    // Real-time listener for conversations
    const q = query(
      collection(db, "conversations"),
      or(
        where("user1Id", "==", user.uid),
        where("user2Id", "==", user.uid)
      )
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const convos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort by most recent message
      convos.sort((a, b) => {
        const aTime = a.lastMessageTime || a.createdAt || "";
        const bTime = b.lastMessageTime || b.createdAt || "";
        return bTime.localeCompare(aTime);
      });

      setConversations(convos);
      setLoadingMessages(false);
    }, (error) => {
      console.error("Error fetching conversations:", error);
      setLoadingMessages(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        <div className="container-custom py-20 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Please Log In
          </h1>
          <p className="text-gray-600 mb-8">
            You need to be logged in to view messages
          </p>
          <Link href="/login" className="btn-primary inline-block">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Messages</h1>

        {loadingMessages ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Loading conversations...</p>
          </div>
        ) : conversations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Messages Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start a conversation by contacting someone from the listings page
            </p>
            <Link href="/listings" className="btn-primary inline-block">
              Browse Listings
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {conversations.map((convo) => {
              // Determine the other user in the conversation
              const otherUserId = convo.user1Id === user.uid ? convo.user2Id : convo.user1Id;
              const otherUserName = convo.user1Id === user.uid ? convo.user2Name : convo.user1Name;

              return (
                <div
                  key={convo.id}
                  onClick={() => router.push(`/chat/${convo.id}`)}
                  className="border-b border-gray-200 last:border-b-0 p-6 hover:bg-gray-50 cursor-pointer transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          {otherUserName?.charAt(0) || "?"}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {otherUserName || "Unknown User"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Re: {convo.productName}
                          </p>
                        </div>
                      </div>
                      {convo.lastMessage && (
                        <p className="text-gray-600 text-sm ml-13">
                          {convo.lastMessage}
                        </p>
                      )}
                    </div>
                    <span className="text-primary-600 font-medium text-sm">
                      View →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
