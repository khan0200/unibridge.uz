# Universities Management System

## 🎓 Pages Created

### 1. **Universities Page** (Public)
- **URL:** `/universities`
- **Features:**
  - Display all universities from Firestore
  - Search by university name
  - Filter by category
  - Responsive grid layout
  - Real-time data from Firestore

### 2. **Add University Page** (Admin)
- **URL:** `/add-university`
- **Features:**
  - Add new universities to Firestore
  - Form validation
  - Logo preview
  - Success notifications
  - Back button to universities page

## 📊 Firestore Structure

### Collection: `universities`

Each document contains:
```javascript
{
  name: "Seoul National University",      // String (required)
  logo: "https://example.com/logo.png",   // String URL (required)
  ranking: 30,                             // Number (optional)
  category: "Top universitetlar",          // String (required)
  ielts: "IELTS 6.5",                     // String (required)
  topik: "TOPIK 4",                       // String (required)
  createdAt: Timestamp,                    // Auto-generated
  updatedAt: Timestamp                     // Auto-generated
}
```

## 🚀 How to Use

### Access the Pages:

1. **View Universities:**
   - Navigate to: `http://localhost:5173/universities`
   - Search and filter universities

2. **Add New University:**
   - Navigate to: `http://localhost:5173/add-university`
   - Fill in the form
   - Click "Universitet qo'shish"

## 📝 Categories Available

- Barcha universitetlar
- Top universitetlar
- Davlat universitetlari
- Xususiy universitetlar

## 🔧 Next Steps (Optional)

1. **Add Edit/Delete functionality**
2. **Add authentication for admin pages**
3. **Add image upload to Firebase Storage**
4. **Add more university details (location, fees, etc.)**

## 🎨 Design

The design matches your example image with:
- Clean card layout
- University logos
- TOP ranking badges
- IELTS/TOPIK requirements
- "Batafsil" (Details) button
- Search and filter functionality
