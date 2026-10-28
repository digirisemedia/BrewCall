# 🧪 Complete Testing Guide

## Quick Start Testing

### 1. Test Background Video
**Location:** Landing Page (`/`)

**Steps:**
1. Open the landing page
2. You should see a subtle coffee shop video playing in the hero section
3. Video should be at 20% opacity with gradient overlays
4. Content should be clearly readable over the video

**Expected Result:** ✅ Video plays automatically, muted, looped

---

### 2. Test Image Upload in Menu
**Location:** Shop Admin Dashboard → Menu Tab

**Steps:**
1. Login as shop owner: `owner@aroma.coffee` / `owner123`
2. Click "Menu" tab
3. Select any category
4. Click "Add Item" button
5. You should see TWO options for adding images:

#### Option A: File Upload
1. Click the "Upload Image (max 2MB)" area
2. Select an image file from your computer
3. Image preview should appear immediately
4. Fill in other fields (name, price, description)
5. Click "Add"
6. Item should appear in list with uploaded image

#### Option B: URL Input
1. Paste an image URL in the "Paste image URL..." field
2. Image preview should appear
3. Fill in other fields
4. Click "Add"
5. Item should appear with image from URL

**Test Validation:**
- Try uploading a file larger than 2MB → Should show error
- Try uploading a non-image file → Should show error
- Upload valid image → Should show preview
- Click X on preview → Should clear image

**Expected Result:** ✅ Both upload methods work, validation works

---

### 3. Test Categories Fix
**Location:** Shop Admin Dashboard → Menu Tab

**Steps:**
1. Login as shop owner
2. Click "Menu" tab
3. You should see categories in left sidebar
4. First category should be auto-selected
5. Items for that category should display on right
6. Click different categories → Items should change
7. Add a new category:
   - Click + button
   - Enter name and icon
   - Click "Add"
   - New category should appear and be selectable
8. Delete a category:
   - Hover over category
   - Click trash icon
   - Category should be removed
   - Selection should move to another category

**Expected Result:** ✅ Categories load, select, add, delete correctly

---

### 4. Test QR Code Generation & Testing
**Location:** Shop Admin Dashboard → Tables Tab

**Steps:**

#### Generate QR Code
1. Click "Tables" tab
2. Click "Add Table" button
3. Fill in table details:
   - Table Number: 10
   - Label: "Test Table"
   - Seats: 4
   - Location: Indoor
4. Click "Add"
5. New table should appear in grid

#### View QR Code
1. Click "View QR" button on the table
2. Modal should open showing:
   - QR code image
   - Table info
   - URL
   - Download button
   - Close button

#### Test QR Code (NEW!)
1. Click green "Test" button on the table
2. New browser tab should open
3. Customer view should load showing:
   - Shop name and logo
   - Table number and label
   - Menu categories
   - Menu items
   - Service buttons (Waiter, Water, Bill)

#### Download QR Code (NEW!)
1. Click "View QR" button
2. Click "Download" button
3. PNG file should download: `qr-table-10.png`
4. Open the PNG file
5. Should show clear, scannable QR code

#### Scan QR Code
1. Use phone camera to scan the QR code
2. Or scan the downloaded PNG
3. Should open customer view on phone
4. Verify all data is correct

**Expected Result:** ✅ QR codes generate, test, download, and scan correctly

---

### 5. Test QR Code Error Handling
**Location:** Customer View (direct URL access)

**Steps:**

#### Test Invalid Shop ID
1. Open browser
2. Go to: `http://localhost:5173/#/customer/invalid_shop_id/table_123`
3. Should show error page with message:
   - "This coffee shop may have been removed or is no longer active."
   - Help text asking to contact staff

#### Test Invalid Table ID
1. Login as shop owner
2. Note a valid shop ID from URL or console
3. Go to: `http://localhost:5173/#/customer/{valid_shop_id}/invalid_table_id`
4. Should show error page with message:
   - "This table does not exist or has been removed."
   - Help text

#### Test Valid QR Code
1. Use the "Test" button from Tables tab
2. Or scan an actual QR code
3. Should load customer view successfully
4. All data should display correctly

**Expected Result:** ✅ Specific error messages for different error types

---

### 6. Test Complete User Flow
**Scenario:** New coffee shop owner signs up and sets up their shop

**Steps:**

#### Registration
1. Go to landing page
2. Click "Get Started Free"
3. Choose registration method:
   - **Option A:** Click "Continue with Google" (simulated)
   - **Option B:** Fill email form
     - Name: "Test Owner"
     - Email: "test@example.com"
     - Click "Continue"
     - Password: "test123"
     - Shop Name: "Test Coffee Shop"
     - Click "Create Account"
4. Should redirect to dashboard

#### Setup Shop
1. Click "Profile" tab
2. Edit shop details:
   - Add description
   - Update tagline
   - Change logo emoji
   - Click "Save"
3. Changes should save

#### Add Menu
1. Click "Menu" tab
2. See default categories
3. Add new category:
   - Icon: 🍰
   - Name: "Desserts"
   - Click "Add"
4. Add items to category:
   - Click "Add Item"
   - Upload image (file or URL)
   - Name: "Chocolate Cake"
   - Price: 45
   - Description: "Rich chocolate cake"
   - Click "Add"
5. Item should appear with image

#### Add Tables
1. Click "Tables" tab
2. Add multiple tables:
   - Table 1: "Window Seat", 2 seats, Indoor
   - Table 2: "Corner Booth", 4 seats, Indoor
   - Table 3: "Patio Table", 4 seats, Outdoor
3. Click "View QR" on each table
4. Download QR codes
5. Print or save for later use

#### Test Customer Experience
1. Click "Test" button on Table 1
2. Customer view should open
3. Verify:
   - Shop name displays
   - Table info shows
   - Menu loads with images
   - Categories work
   - Service buttons work
4. Click "Call Waiter"
5. Toast notification should appear
6. Go back to dashboard
7. Click "Live Requests" tab
8. Request should appear
9. Click "Mark as Done"
10. Request should disappear

**Expected Result:** ✅ Complete flow works end-to-end

---

## 📱 Mobile Testing

### Test on Mobile Device
1. Start development server on your computer
2. Find your computer's local IP (e.g., 192.168.1.100)
3. On mobile, go to: `http://192.168.1.100:5173`
4. Test all features on mobile

### Test QR Code Scanning
1. Generate QR code in dashboard
2. Download PNG
3. Transfer to phone or display on second screen
4. Scan with phone camera
5. Customer view should open on phone
6. Test all mobile features:
   - Menu scrolling
   - Category tabs
   - Service buttons
   - Toast notifications
   - Language switching

---

## 🌍 Multi-Language Testing

### Test All Three Languages
1. Go to landing page
2. Click language flag (top right)
3. Switch between:
   - 🇬🇧 English
   - 🇫🇷 French
   - 🇲🇦 Arabic
4. Verify:
   - All text translates
   - Arabic switches to RTL layout
   - Prices show correct currency (MAD/DH/د.م)
   - Layout adjusts properly

### Test in Customer View
1. Scan QR code
2. Click language flag
3. Switch languages
4. Verify menu and buttons translate

---

## 🔍 Edge Cases to Test

### 1. Empty States
- Shop with no menu items
- Shop with no tables
- Category with no items
- No pending requests

### 2. Large Data
- 50+ menu items
- 20+ tables
- 10+ categories
- Many service requests

### 3. Error States
- Invalid QR code URL
- Deleted shop
- Deleted table
- Inactive shop
- Network errors (simulate offline)

### 4. Browser Compatibility
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## ✅ Final Checklist

### Landing Page
- [ ] Background video plays
- [ ] All buttons work
- [ ] Language switcher works
- [ ] FAQ section expands/collapses
- [ ] Footer links work

### Registration
- [ ] Google login works
- [ ] Apple login works
- [ ] Email registration works
- [ ] Form validation works
- [ ] Redirects to dashboard

### Login
- [ ] Email/password login works
- [ ] Quick demo buttons work
- [ ] Invalid credentials show error
- [ ] Redirects to correct dashboard

### Super Admin Dashboard
- [ ] Can view all shops
- [ ] Can create new shop
- [ ] Can delete shop
- [ ] Stats display correctly
- [ ] Search works

### Shop Admin Dashboard
- [ ] Overview tab works
- [ ] Profile tab works
- [ ] Menu tab works
  - [ ] Categories load
  - [ ] Can add categories
  - [ ] Can delete categories
  - [ ] Items display correctly
  - [ ] **Image upload (file) works**
  - [ ] **Image upload (URL) works**
  - [ ] Image preview works
  - [ ] Can toggle availability
  - [ ] Can delete items
- [ ] Tables tab works
  - [ ] Can add tables
  - [ ] Can delete tables
  - [ ] QR codes generate
  - [ ] **Test button works**
  - [ ] **Download QR works**
  - [ ] QR codes scan correctly
- [ ] Live Requests tab works
  - [ ] Requests appear in real-time
  - [ ] Can mark as done
  - [ ] Sound alerts work
  - [ ] Urgency indicators work

### Customer View
- [ ] Loads from QR code
- [ ] Shop data displays
- [ ] Table data displays
- [ ] Menu displays with images
- [ ] Categories work
- [ ] Service buttons work
- [ ] Toast notifications work
- [ ] Language switcher works
- [ ] **Error handling works**
- [ ] **Specific error messages show**

### General
- [ ] All animations work
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] No console errors
- [ ] Fast loading
- [ ] No broken links

---

## 🐛 If You Find Bugs

Please report with:
1. **Steps to reproduce** (numbered list)
2. **Expected behavior**
3. **Actual behavior**
4. **Browser & device**
5. **Screenshots** (if applicable)
6. **Console errors** (if any)

---

## 🎉 Success Criteria

The app is ready when:
- ✅ All checklist items pass
- ✅ No console errors
- ✅ Works on mobile and desktop
- ✅ All three languages work
- ✅ QR codes scan correctly
- ✅ Image upload works
- ✅ Categories work
- ✅ Real-time updates work
- ✅ Error handling works

---

**Happy Testing!** 🚀
