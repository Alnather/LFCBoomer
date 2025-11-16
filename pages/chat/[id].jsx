import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, addDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Chat({ user, loading }) {
  const router = useRouter();
  const { id } = router.query;
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!id || !user) return;

    // Fetch conversation details
    async function fetchConversation() {
      try {
        const convoDoc = await getDoc(doc(db, "conversations", id));
        if (convoDoc.exists()) {
          setConversation({ id: convoDoc.id, ...convoDoc.data() });
        }
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    }

    fetchConversation();

    // Listen to messages in real-time
    const q = query(
      collection(db, "messages"),
      where("conversationId", "==", id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Sort messages by timestamp
      msgs.sort((a, b) => {
        const aTime = a.timestamp || "";
        const bTime = b.timestamp || "";
        return aTime.localeCompare(bTime);
      });
      
      setMessages(msgs);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    return () => unsubscribe();
  }, [id, user]);

  async function handleSendMessage(e) {
    e.preventDefault();
    
    if (!newMessage.trim() || !user || !conversation) return;

    setSending(true);

    try {
      const messageData = {
        conversationId: id,
        senderId: user.uid,
        senderName: user.displayName || "Anonymous",
        text: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };

      await addDoc(collection(db, "messages"), messageData);

      // Update conversation's last message
      await updateDoc(doc(db, "conversations", id), {
        lastMessage: newMessage.trim(),
        lastMessageTime: new Date().toISOString(),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar user={user} />
        <div className="container-custom py-20 text-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  if (!conversation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} />
        <div className="container-custom py-20 text-center">
          <p className="text-gray-400">Loading conversation...</p>
        </div>
      </div>
    );
  }

  const otherUserName = conversation.user1Id === user.uid 
    ? conversation.user2Name 
    : conversation.user1Name;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />

      <div className="flex-1 container-custom py-6">
        <div className="bg-[#2a2a2a] rounded-xl shadow-lg h-[calc(100vh-180px)] flex flex-col border border-gray-700">
          {/* Chat Header */}
          <div className="border-b border-gray-700 p-6">
            <button
              onClick={() => router.push("/messages")}
              className="text-primary-500 hover:text-primary-400 mb-2 flex items-center"
            >
              ← Back to Messages
            </button>
            <h2 className="text-2xl font-bold text-gray-100">
              {otherUserName}
            </h2>
            <p className="text-sm text-gray-400">
              Re: {conversation.productName}
            </p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => {
                const isOwnMessage = message.senderId === user.uid;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        isOwnMessage
                          ? "bg-primary-600 text-white"
                          : "bg-gray-800 text-gray-100"
                      }`}
                    >
                      <p className="text-sm font-medium mb-1">
                        {message.senderName}
                      </p>
                      <p>{message.text}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 input-field"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !newMessage.trim()}
                className="btn-primary px-6"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
