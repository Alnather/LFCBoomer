// Script to populate Firebase with sample products from Fake Store API
// Run this once: node scripts/populate-products.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, deleteDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBNvIb_HXdPc2hQ9_ZC-Q8RoQTJwCJ9IHE",
  authDomain: "lfcboomer.firebaseapp.com",
  projectId: "lfcboomer",
  storageBucket: "lfcboomer.firebasestorage.app",
  messagingSenderId: "579328875040",
  appId: "1:579328875040:web:de58e2a358891dba5bfa45",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Map Fake Store API categories to our categories
const categoryMapping = {
  "electronics": ["electronics"],
  "jewelery": ["clothing", "other"],
  "men's clothing": ["clothing"],
  "women's clothing": ["clothing"],
};

// Map price to price type
const getPriceType = (price) => {
  if (price === 0) return 'free';
  if (Math.random() > 0.7) return 'negotiable';
  return 'fixed';
};

// Get random condition (0-100)
const getRandomCondition = () => {
  // Bias towards better conditions
  const conditions = [50, 60, 70, 75, 80, 85, 90, 95, 100];
  return conditions[Math.floor(Math.random() * conditions.length)];
};

// Student names for variety
const studentNames = [
  'Alex Johnson', 'Sam Williams', 'Jordan Brown', 'Taylor Davis',
  'Morgan Wilson', 'Casey Miller', 'Riley Anderson', 'Jamie Thomas',
  'Quinn Martinez', 'Avery Garcia', 'Parker Robinson', 'Drew Lee'
];

const getRandomStudentName = () => {
  return studentNames[Math.floor(Math.random() * studentNames.length)];
};

async function populateProducts() {
  console.log('🚀 Starting to populate products...\n');

  try {
    // Fetch products from Fake Store API
    console.log('📦 Fetching products from Fake Store API...');
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    console.log(`✅ Fetched ${products.length} products\n`);

    // Add each product to Firebase
    let addedCount = 0;
    for (const product of products) {
      const categories = categoryMapping[product.category] || ['other'];
      const priceType = getPriceType(product.price);
      
      const productData = {
        name: product.title,
        description: product.description,
        price: Math.round(product.price * 0.7), // Adjust prices to be more student-friendly
        priceType: priceType,
        categories: categories,
        condition: getRandomCondition(),
        photo: product.image,
        userId: 'demo_user_' + Math.floor(Math.random() * 10),
        userName: getRandomStudentName(),
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random time in last 7 days
      };

      try {
        const docRef = await addDoc(collection(db, 'products'), productData);
        addedCount++;
        console.log(`✅ Added: ${product.title.substring(0, 50)}... (ID: ${docRef.id})`);
      } catch (error) {
        console.error(`❌ Failed to add: ${product.title}`, error.message);
      }
    }

    console.log(`\n🎉 Successfully added ${addedCount} products to Firebase!`);
    console.log('You can now view them in the marketplace.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }

  process.exit(0);
}

async function clearProducts() {
  console.log('🗑️ Clearing existing products...\n');
  
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    let deletedCount = 0;
    
    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
      deletedCount++;
    }
    
    console.log(`✅ Deleted ${deletedCount} products\n`);
  } catch (error) {
    console.error('❌ Error clearing products:', error);
  }
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--clear')) {
  clearProducts().then(() => {
    if (!args.includes('--only-clear')) {
      populateProducts();
    }
  });
} else {
  populateProducts();
}
