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
      // Create an image element to compress
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Create canvas for compression
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate new dimensions (max 800px width/height)
          let width = img.width;
          let height = img.height;
          const maxSize = 800;
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress image
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with compression (0.7 quality)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          
          setImage(file);
          setImagePreview(compressedDataUrl);
        };
        img.src = reader.result;
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

    if (!imagePreview) {
      setError("Please upload a photo of your item");
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
        photo: imagePreview || "", // Store as string (base64 or URL)
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
      <div className="min-h-screen">
        <Navbar user={user} />
        <div className="container-custom py-20 text-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar user={user} />
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-100 mb-4">
            Please Log In
          </h1>
          <p className="text-gray-400 mb-8">
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
    <div className="min-h-screen">
      <Navbar user={user} />

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#2a2a2a] rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-100 mb-2">
              Create New Listing
            </h1>
            <p className="text-gray-400 mb-8">
              Share an item you'd like to swap or trade
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
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
                  className="block text-sm font-medium text-gray-300 mb-2"
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Photo *
                </label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
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
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Categories * (Select at least one)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categoryOptions.map((category) => (
                    <label
                      key={category.id}
                      className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition ${
                        categories.includes(category.id)
                          ? "border-primary-600 bg-primary-900/20"
                          : "border-gray-600 hover:border-primary-500"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={categories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className="w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 rounded focus:ring-primary-500 focus:ring-offset-0"
                      />
                      <span className="text-sm font-medium text-gray-300">
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

