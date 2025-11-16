import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Listings({ user, loading }) {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loadingListings, setLoadingListings] = useState(true);
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

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredListings(listings);
    } else {
      setFilteredListings(
        listings.filter((listing) =>
          listing.categories?.includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory, listings]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="container-custom py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Browse Listings
            </h1>
            <p className="text-gray-600">
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

        {/* Category Filter */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-4">
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category.id
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
            <p className="text-gray-600">Loading listings...</p>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <p className="text-gray-600 text-lg mb-4">No listings found</p>
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
                className="card cursor-pointer"
                onClick={() => router.push(`/listing/${listing.id}`)}
              >
                {/* Image */}
                {listing.imageUrl ? (
                  <img
                    src={listing.imageUrl}
                    alt={listing.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl">📦</span>
                  </div>
                )}

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
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
                  <span className="text-sm text-primary-600 font-medium">
                    View Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
