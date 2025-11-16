import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebase";

export default function CreateListing({ user, loading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const categoryOptions = [
    { id: "sports", label: "Sports" },
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "furniture", label: "Furniture" },
    { id: "books", label: "Books" },
    { id: "toys", label: "Toys & Games" },
    { id: "home", label: "Home & Garden" },
    { id: "other", label: "Other" },
  ];

  function handleCategoryChange(categoryId) {
    setCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validation
    if (!user) {
      setError("You must be logged in to create a listing");
      return;
    }

    if (categories.length === 0) {
      setError("Please select at least one category");
      return;
    }

    setSubmitting(true);

    try {
      // Create the listing document
      const listingData = {
        name,
        description,
        categories,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        createdAt: new Date().toISOString(),
        imageUrl: imagePreview || "", // Will be updated if image is uploaded
      };

      const docRef = await addDoc(collection(db, "products"), listingData);

      // Add product reference to user's products array
      await updateDoc(doc(db, "Users", user.uid), {
        products: arrayUnion(docRef.id),
      });

      // Redirect to listings page
      router.push("/listings");
    } catch (err) {
      console.error("Error creating listing:", err);
      setError(err.message || "Failed to create listing");
      setSubmitting(false);
    }
  }

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
            You need to be logged in to create a listing
          </p>
          <a href="/login" className="btn-primary inline-block">
            Log In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Listing
            </h1>
            <p className="text-gray-600 mb-8">
              Share an item you'd like to swap or trade
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Item Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Vintage Camera, Soccer Ball, Textbook"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field"
                  rows="4"
                  placeholder="Describe your item, its condition, and what you're looking to swap for..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo (Optional)
                </label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <span className="btn-secondary inline-block">
                      Choose Image
                    </span>
                  </label>
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categories * (Select at least one)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categoryOptions.map((category) => (
                    <label
                      key={category.id}
                      className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition ${
                        categories.includes(category.id)
                          ? "border-primary-600 bg-primary-50"
                          : "border-gray-300 hover:border-primary-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={categories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {category.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary flex-1"
                >
                  {submitting ? "Creating Listing..." : "Create Listing"}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/listings")}
                  className="btn-secondary"
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
