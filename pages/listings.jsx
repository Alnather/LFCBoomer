import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { collection, getDocs, query, orderBy, addDoc, where, doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Listings({ user, loading }) {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("smart"); // smart, newest, oldest
  const [loadingListings, setLoadingListings] = useState(true);
  const [userPreferences, setUserPreferences] = useState({});
  const router = useRouter();

  const categoryOptions = [
    { id: "all", label: "All Items" },
    { id: "sports", label: "Sports" },
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "furniture", label: "Furniture" },
    { id: "books", label: "Books" },
    { id: "toys", label: "Toys & Games" },
    { id: "home", label: "Home & Garden" },
    { id: "other", label: "Other" },
  ];

  useEffect(() => {
    async function fetchListings() {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const listingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(listingsData);
        setFilteredListings(listingsData);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoadingListings(false);
      }
    }

    fetchListings();
  }, []);

  // Load user preferences
  useEffect(() => {
    if (!user) return;
    
    async function loadUserPreferences() {
      try {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          setUserPreferences(userDoc.data().preferences || {});
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    }
    
    loadUserPreferences();
  }, [user]);

  useEffect(() => {
    let filtered = listings;
    
    // Filter by category first
    if (selectedCategory !== "all") {
      filtered = listings.filter((listing) =>
        listing.categories?.includes(selectedCategory)
      );
    }
    
    // Then apply sorting
    let sorted = [...filtered];
    
    if (sortOrder === "newest") {
      sorted.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    } else if (sortOrder === "oldest") {
      sorted.sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
    } else if (sortOrder === "smart" && user) {
      // AI-like smart sorting based on user preferences
      sorted = smartSortByPreferences(sorted);
    } else {
      // Default to newest if not logged in
      sorted.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    }
    
    setFilteredListings(sorted);
  }, [sortOrder, selectedCategory, listings, userPreferences]);

  // Smart sorting algorithm based on user preferences
  function smartSortByPreferences(items) {
    if (!user || Object.keys(userPreferences).length === 0) {
      // If no preferences, just return newest first
      return items.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    }

    return items.sort((a, b) => {
      // Calculate preference score for each item
      let scoreA = 0;
      let scoreB = 0;

      // Score based on category preferences
      a.categories?.forEach(cat => {
        scoreA += userPreferences[cat] || 0;
      });
      b.categories?.forEach(cat => {
        scoreB += userPreferences[cat] || 0;
      });

      // If scores are equal, sort by newest
      if (scoreB === scoreA) {
        return (b.createdAt || "").localeCompare(a.createdAt || "");
      }

      return scoreB - scoreA;
    });
  }

  // Track user clicking on a listing (preference tracking)
  async function trackListingClick(listing) {
    if (!user || !listing.categories) return;

    try {
      const userRef = doc(db, "Users", user.uid);
      const updates = {};

      // Increment preference count for each category
      listing.categories.forEach(category => {
        updates[`preferences.${category}`] = increment(1);
      });

      await updateDoc(userRef, updates);
      
      // Update local state
      const newPrefs = { ...userPreferences };
      listing.categories.forEach(category => {
        newPrefs[category] = (newPrefs[category] || 0) + 1;
      });
      setUserPreferences(newPrefs);
    } catch (error) {
      console.error("Error tracking preference:", error);
    }
  }

  async function handleContactSeller(e, listing) {
    e.stopPropagation();
    
    // Track the click for preference learning
    await trackListingClick(listing);
    
    if (!user) {
      router.push("/login");
      return;
    }

    if (listing.userId === user.uid) {
      alert("This is your own listing!");
      return;
    }

    try {
      // Check if conversation already exists
      const q = query(
        collection(db, "conversations"),
        where("productId", "==", listing.id),
        where("user1Id", "==", user.uid)
      );
      const q2 = query(
        collection(db, "conversations"),
        where("productId", "==", listing.id),
        where("user2Id", "==", user.uid)
      );

      const [snapshot1, snapshot2] = await Promise.all([
        getDocs(q),
        getDocs(q2)
      ]);

      if (!snapshot1.empty) {
        router.push(`/chat/${snapshot1.docs[0].id}`);
        return;
      }
      if (!snapshot2.empty) {
        router.push(`/chat/${snapshot2.docs[0].id}`);
        return;
      }

      // Create new conversation
      const convoData = {
        productId: listing.id,
        productName: listing.name,
        user1Id: user.uid,
        user1Name: user.displayName || "Anonymous",
        user2Id: listing.userId,
        user2Name: listing.userName,
        createdAt: new Date().toISOString(),
        lastMessage: "",
        lastMessageTime: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "conversations"), convoData);
      router.push(`/chat/${docRef.id}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
      alert("Failed to start conversation. Please try again.");
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar user={user} />

      <div className="container-custom py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-100 mb-2">
              Browse Listings
            </h1>
            <p className="text-gray-400">
              Find items to swap and trade with the community
            </p>
          </div>
          {user && (
            <Link
              href="/create-listing"
              className="btn-primary mt-4 md:mt-0 inline-block"
            >
              + Create Listing
            </Link>
          )}
        </div>

        {/* Category Filter and Sorting */}
        <div className="mb-8 bg-[#2a2a2a] rounded-xl shadow-md p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h3 className="font-semibold text-gray-300">Filter by Category:</h3>
            <div className="flex items-center gap-2">
              <label htmlFor="sortOrder" className="text-sm font-medium text-gray-300">
                Sort by:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 bg-[#1a1a1a] text-gray-300 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="smart">🤖 AI Recommended</option>
                <option value="newest">📅 Newest First</option>
                <option value="oldest">📅 Oldest First</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category.id
                    ? "bg-primary-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        {loadingListings ? (
          <div className="text-center py-20">
            <p className="text-gray-400">Loading listings...</p>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-[#2a2a2a] rounded-xl shadow-md border border-gray-700">
            <p className="text-gray-400 text-lg mb-4">No listings found</p>
            {user && (
              <Link href="/create-listing" className="btn-primary inline-block">
                Create the first listing
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="card"
              >
                {/* Image */}
                {listing.photo ? (
                  <img
                    src={listing.photo}
                    alt={listing.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl">📦</span>
                  </div>
                )}

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-100 mb-2">
                  {listing.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {listing.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {listing.categories?.map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded"
                    >
                      {categoryOptions.find((c) => c.id === cat)?.label || cat}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    By {listing.userName}
                  </span>
                  {user && listing.userId !== user.uid ? (
                    <button
                      onClick={(e) => handleContactSeller(e, listing)}
                      className="text-sm bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
                    >
                      Contact Seller
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400 font-medium">
                      {listing.userId === user?.uid ? "Your listing" : ""}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

