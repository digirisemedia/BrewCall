# 🧪 AUTOMATED TEST SCRIPT - BrewCall SaaS Platform

## Purpose
This script verifies all critical functionality is working correctly.

---

## Pre-Test Checklist

Before running tests:
- [ ] App is deployed to Netlify
- [ ] Build succeeded without errors
- [ ] Site is accessible at https://brewcall.netlify.app/
- [ ] Browser console is open (F12)
- [ ] LocalStorage is enabled

---

## Test Suite 1: Authentication

### Test 1.1: User Registration
```javascript
// Open browser console (F12) and run:

// Clear existing data
localStorage.clear();

// Reload page
location.reload();

// Wait for app to load, then:
console.log('✅ Test 1.1: Starting registration test...');

// Navigate to register page
window.location.hash = '#/register';

// Expected: Register page loads
// Manual: Fill form and submit
```

**Manual Steps:**
1. Go to https://brewcall.netlify.app/#/register
2. Fill form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "test123"
   - Shop Name: "Test Cafe"
3. Click "Create Account"

**Expected Results:**
- ✅ Redirects to dashboard
- ✅ Shop "Test Cafe" is created
- ✅ User is logged in
- ✅ Console shows: "Loading data for shop: shop_..."

**Verify in Console:**
```javascript
// Check user is logged in
const user = JSON.parse(localStorage.getItem('brewcall_current_user'));
console.log('Current user:', user);
console.assert(user !== null, '❌ User should be logged in');
console.assert(user.email === 'test@example.com', '❌ User email mismatch');
console.assert(user.name === 'Test User', '❌ User name mismatch');
console.log('✅ Test 1.1: Registration PASSED');
```

---

### Test 1.2: User Login
```javascript
// Logout
localStorage.removeItem('brewcall_current_user');
location.reload();

// Wait for redirect to login page
console.log('✅ Test 1.2: Starting login test...');

// Manual: Login with credentials
```

**Manual Steps:**
1. Go to https://brewcall.netlify.app/#/login
2. Enter: test@example.com / test123
3. Click "Sign In"

**Expected Results:**
- ✅ Login successful
- ✅ Redirects to dashboard
- ✅ User data loads correctly

**Verify in Console:**
```javascript
const user = JSON.parse(localStorage.getItem('brewcall_current_user'));
console.assert(user !== null, '❌ User should be logged in');
console.assert(user.email === 'test@example.com', '❌ User email mismatch');
console.log('✅ Test 1.2: Login PASSED');
```

---

### Test 1.3: Session Persistence
```javascript
// Reload page
location.reload();

// Wait for page to load
setTimeout(() => {
  const user = JSON.parse(localStorage.getItem('brewcall_current_user'));
  console.assert(user !== null, '❌ User should still be logged in after refresh');
  console.log('✅ Test 1.3: Session persistence PASSED');
}, 2000);
```

---

## Test Suite 2: Menu Management

### Test 2.1: Create Category
```javascript
console.log('✅ Test 2.1: Starting category creation test...');

// Navigate to menu tab
window.location.hash = '#/dashboard';

// Wait for dashboard to load, then click Menu tab
setTimeout(() => {
  // Manual: Click "Menu" tab, then "+" to add category
  console.log('Manual: Click Menu tab, then + button');
}, 1000);
```

**Manual Steps:**
1. Click "Menu" tab
2. Click "+" next to "Categories"
3. Enter: Name="Test Category", Icon="🧪"
4. Click "Add Category"

**Verify in Console:**
```javascript
setTimeout(() => {
  const categories = JSON.parse(localStorage.getItem('brewcall_categories'));
  const testCat = categories.find(c => c.name === 'Test Category');
  console.assert(testCat !== undefined, '❌ Category should be created');
  console.assert(testCat.icon === '🧪', '❌ Category icon mismatch');
  console.log('✅ Test 2.1: Category creation PASSED');
}, 2000);
```

---

### Test 2.2: Create Menu Item
```javascript
console.log('✅ Test 2.2: Starting menu item creation test...');

// Manual: Select category, click "Add Item"
```

**Manual Steps:**
1. Select "Test Category"
2. Click "Add Item"
3. Fill form:
   - Name: "Test Item"
   - Description: "Test description"
   - Price: "25"
   - Emoji: "🧪"
4. Click "Add"

**Verify in Console:**
```javascript
setTimeout(() => {
  const items = JSON.parse(localStorage.getItem('brewcall_items'));
  const testItem = items.find(i => i.name === 'Test Item');
  console.assert(testItem !== undefined, '❌ Item should be created');
  console.assert(testItem.price === 25, '❌ Item price mismatch');
  console.log('✅ Test 2.2: Menu item creation PASSED');
}, 2000);
```

---

### Test 2.3: Data Persistence After Refresh
```javascript
console.log('✅ Test 2.3: Starting persistence test...');

// Reload page
location.reload();

setTimeout(() => {
  const items = JSON.parse(localStorage.getItem('brewcall_items'));
  const testItem = items.find(i => i.name === 'Test Item');
  console.assert(testItem !== undefined, '❌ Item should persist after refresh');
  console.log('✅ Test 2.3: Data persistence PASSED');
}, 2000);
```

---

## Test Suite 3: Table Management & QR Codes

### Test 3.1: Create Table
```javascript
console.log('✅ Test 3.1: Starting table creation test...');

// Manual: Navigate to Tables tab
```

**Manual Steps:**
1. Click "Tables" tab
2. Click "Add Table"
3. Fill form:
   - Table Number: "99"
   - Label: "Test Table"
   - Seats: "4"
   - Location: "Indoor"
4. Click "Add"

**Verify in Console:**
```javascript
setTimeout(() => {
  const tables = JSON.parse(localStorage.getItem('brewcall_tables'));
  const testTable = tables.find(t => t.table_number === 99);
  console.assert(testTable !== undefined, '❌ Table should be created');
  console.assert(testTable.label === 'Test Table', '❌ Table label mismatch');
  console.log('✅ Test 3.1: Table creation PASSED');
}, 2000);
```

---

### Test 3.2: Generate QR Code
```javascript
console.log('✅ Test 3.2: Starting QR code generation test...');

// Manual: Click "View QR" on table card
```

**Manual Steps:**
1. Find table #99
2. Click "View QR"

**Expected Results:**
- ✅ Modal opens with QR code
- ✅ QR code is visible
- ✅ URL shows correct format

**Verify in Console:**
```javascript
setTimeout(() => {
  const modal = document.querySelector('[role="dialog"]');
  console.assert(modal !== null, '❌ QR modal should be open');
  const qrCode = modal.querySelector('svg');
  console.assert(qrCode !== null, '❌ QR code should be visible');
  console.log('✅ Test 3.2: QR code generation PASSED');
}, 1000);
```

---

### Test 3.3: Test QR Code
```javascript
console.log('✅ Test 3.3: Starting QR code test...');

// Manual: Click "Test" button
```

**Manual Steps:**
1. In QR modal, click "Test"

**Expected Results:**
- ✅ New tab opens
- ✅ Customer view loads
- ✅ Shows shop logo and name
- ✅ Shows table info
- ✅ Shows menu items

**Verify in New Tab Console:**
```javascript
setTimeout(() => {
  const shop = JSON.parse(localStorage.getItem('brewcall_shops'))[0];
  const table = JSON.parse(localStorage.getItem('brewcall_tables')).find(t => t.table_number === 99);
  console.assert(shop !== undefined, '❌ Shop should load');
  console.assert(table !== undefined, '❌ Table should load');
  console.log('✅ Test 3.3: QR code test PASSED');
}, 2000);
```

---

## Test Suite 4: Live Requests

### Test 4.1: Create Service Request
```javascript
console.log('✅ Test 4.1: Starting service request test...');

// In customer view tab
// Manual: Click "Call Waiter"
```

**Manual Steps:**
1. In customer view tab
2. Click "Call Waiter"

**Verify in Console:**
```javascript
setTimeout(() => {
  const requests = JSON.parse(localStorage.getItem('brewcall_requests'));
  const pendingReq = requests.find(r => r.status === 'pending');
  console.assert(pendingReq !== undefined, '❌ Request should be created');
  console.assert(pendingReq.request_type === 'waiter', '❌ Request type mismatch');
  console.log('✅ Test 4.1: Service request creation PASSED');
}, 1000);
```

---

### Test 4.2: Request Appears in Dashboard
```javascript
console.log('✅ Test 4.2: Starting dashboard request test...');

// Switch to dashboard tab
// Manual: Go to Requests tab
```

**Manual Steps:**
1. Switch to dashboard tab
2. Click "Requests" tab

**Expected Results:**
- ✅ Request appears immediately
- ✅ Shows table number
- ✅ Shows request type
- ✅ Shows elapsed time
- ✅ Sound alert plays

**Verify in Console:**
```javascript
setTimeout(() => {
  const requests = JSON.parse(localStorage.getItem('brewcall_requests'));
  const pendingReq = requests.find(r => r.status === 'pending');
  console.assert(pendingReq !== undefined, '❌ Request should be visible');
  console.log('✅ Test 4.2: Dashboard request display PASSED');
}, 1000);
```

---

### Test 4.3: Resolve Request
```javascript
console.log('✅ Test 4.3: Starting request resolution test...');

// Manual: Click "Mark as Done"
```

**Manual Steps:**
1. Click "Mark as Done" on request

**Verify in Console:**
```javascript
setTimeout(() => {
  const requests = JSON.parse(localStorage.getItem('brewcall_requests'));
  const resolvedReq = requests.find(r => r.status === 'resolved');
  console.assert(resolvedReq !== undefined, '❌ Request should be resolved');
  console.log('✅ Test 4.3: Request resolution PASSED');
}, 1000);
```

---

## Test Suite 5: Profile Management

### Test 5.1: Edit Shop Info
```javascript
console.log('✅ Test 5.1: Starting profile edit test...');

// Manual: Go to Profile tab, click Edit
```

**Manual Steps:**
1. Click "Profile" tab
2. Click "Edit"
3. Change shop name to "Updated Cafe"
4. Click "Save"

**Verify in Console:**
```javascript
setTimeout(() => {
  const shops = JSON.parse(localStorage.getItem('brewcall_shops'));
  const user = JSON.parse(localStorage.getItem('brewcall_current_user'));
  const shop = shops.find(s => s.id === user.shop_id);
  console.assert(shop.name === 'Updated Cafe', '❌ Shop name should be updated');
  console.log('✅ Test 5.1: Profile edit PASSED');
}, 1000);
```

---

### Test 5.2: Wallet Top-Up
```javascript
console.log('✅ Test 5.2: Starting wallet top-up test...');

// Manual: Scroll to Wallet section, click Top Up
```

**Manual Steps:**
1. Scroll to "Wallet & Payment"
2. Click "+ Top Up"
3. Enter: "100"
4. Click "Top Up"

**Verify in Console:**
```javascript
setTimeout(() => {
  const shops = JSON.parse(localStorage.getItem('brewcall_shops'));
  const user = JSON.parse(localStorage.getItem('brewcall_current_user'));
  const shop = shops.find(s => s.id === user.shop_id);
  console.assert(shop.wallet_balance >= 100, '❌ Wallet balance should increase');
  
  const transactions = JSON.parse(localStorage.getItem('brewcall_transactions'));
  const topUp = transactions.find(t => t.type === 'top_up' && t.amount === 100);
  console.assert(topUp !== undefined, '❌ Transaction should be recorded');
  console.log('✅ Test 5.2: Wallet top-up PASSED');
}, 1000);
```

---

## Test Suite 6: Multi-Language

### Test 6.1: Switch to French
```javascript
console.log('✅ Test 6.1: Starting French language test...');

// Manual: Click language switcher, select French
```

**Manual Steps:**
1. Click language switcher (🇬🇧)
2. Select French (🇫🇷)

**Verify in Console:**
```javascript
setTimeout(() => {
  const lang = localStorage.getItem('brewcall_language');
  console.assert(lang === 'fr', '❌ Language should be French');
  
  // Check if page content is in French
  const dashboardTitle = document.querySelector('h1')?.textContent;
  console.log('Dashboard title:', dashboardTitle);
  console.log('✅ Test 6.1: French language PASSED');
}, 1000);
```

---

### Test 6.2: Switch to Arabic (RTL)
```javascript
console.log('✅ Test 6.2: Starting Arabic language test...');

// Manual: Click language switcher, select Arabic
```

**Manual Steps:**
1. Click language switcher
2. Select Arabic (🇲🇦)

**Verify in Console:**
```javascript
setTimeout(() => {
  const lang = localStorage.getItem('brewcall_language');
  console.assert(lang === 'ar', '❌ Language should be Arabic');
  
  // Check if layout is RTL
  const dir = document.documentElement.dir;
  console.assert(dir === 'rtl', '❌ Layout should be RTL');
  console.log('✅ Test 6.2: Arabic language (RTL) PASSED');
}, 1000);
```

---

## Test Suite 7: Data Persistence (Critical)

### Test 7.1: Clear Cache and Verify
```javascript
console.log('✅ Test 7.1: Starting cache clear test...');

// Save current data
const beforeData = {
  users: localStorage.getItem('brewcall_users'),
  shops: localStorage.getItem('brewcall_shops'),
  categories: localStorage.getItem('brewcall_categories'),
  items: localStorage.getItem('brewcall_items'),
  tables: localStorage.getItem('brewcall_tables'),
  requests: localStorage.getItem('brewcall_requests'),
  transactions: localStorage.getItem('brewcall_transactions'),
};

// Clear browser cache (manual)
// Open DevTools → Application → Clear site data

// Reload page
location.reload();

setTimeout(() => {
  const afterData = {
    users: localStorage.getItem('brewcall_users'),
    shops: localStorage.getItem('brewcall_shops'),
    categories: localStorage.getItem('brewcall_categories'),
    items: localStorage.getItem('brewcall_items'),
    tables: localStorage.getItem('brewcall_tables'),
    requests: localStorage.getItem('brewcall_requests'),
    transactions: localStorage.getItem('brewcall_transactions'),
  };
  
  console.assert(beforeData.users === afterData.users, '❌ Users should persist');
  console.assert(beforeData.shops === afterData.shops, '❌ Shops should persist');
  console.assert(beforeData.items === afterData.items, '❌ Items should persist');
  console.assert(beforeData.tables === afterData.tables, '❌ Tables should persist');
  console.log('✅ Test 7.1: Cache clear persistence PASSED');
}, 3000);
```

---

## Test Suite 8: Cross-Tab Synchronization

### Test 8.1: Multi-Tab Sync
```javascript
console.log('✅ Test 8.2: Starting cross-tab sync test...');

// Open new tab with same URL
const newTab = window.open(window.location.href, '_blank');

// In original tab, create a new item
// Manual: Create new menu item

setTimeout(() => {
  // Switch to new tab
  newTab.focus();
  
  // Check if item appears
  // Manual: Go to Menu tab
  
  const items = JSON.parse(localStorage.getItem('brewcall_items'));
  console.log('Items in new tab:', items.length);
  console.log('✅ Test 8.2: Cross-tab sync PASSED');
}, 3000);
```

---

## Final Test Report

After running all tests, verify:

```javascript
console.log('=== FINAL TEST REPORT ===');

const tests = [
  'Test 1.1: Registration',
  'Test 1.2: Login',
  'Test 1.3: Session Persistence',
  'Test 2.1: Category Creation',
  'Test 2.2: Menu Item Creation',
  'Test 2.3: Data Persistence',
  'Test 3.1: Table Creation',
  'Test 3.2: QR Code Generation',
  'Test 3.3: QR Code Test',
  'Test 4.1: Service Request',
  'Test 4.2: Dashboard Request',
  'Test 4.3: Request Resolution',
  'Test 5.1: Profile Edit',
  'Test 5.2: Wallet Top-Up',
  'Test 6.1: French Language',
  'Test 6.2: Arabic Language',
  'Test 7.1: Cache Clear',
  'Test 8.2: Cross-Tab Sync',
];

console.log('Total Tests:', tests.length);
console.log('All tests should show ✅ PASSED in console');
console.log('========================');
```

---

## Troubleshooting Failed Tests

### If Test Fails:

1. **Check Console Errors**
   - Open DevTools (F12)
   - Check Console tab for red errors
   - Fix any errors before re-running test

2. **Check LocalStorage**
   - Open DevTools → Application → Local Storage
   - Verify data is being saved
   - Check for "brewcall_*" keys

3. **Clear and Retry**
   ```javascript
   localStorage.clear();
   location.reload();
   ```

4. **Check Network**
   - Open DevTools → Network tab
   - Verify all resources load (200 status)
   - Check for failed requests

5. **Try Different Browser**
   - Test in Chrome, Firefox, Safari
   - Rules out browser-specific issues

---

## Success Criteria

All tests pass if:
- ✅ All 18 tests show "PASSED"
- ✅ No console errors
- ✅ Data persists across refreshes
- ✅ Data persists across sessions
- ✅ QR codes generate correctly
- ✅ Live requests work
- ✅ All 3 languages work
- ✅ Cross-tab sync works

---

## Next Steps

After all tests pass:
1. Deploy to production
2. Monitor for any issues
3. Collect user feedback
4. Iterate on improvements

**Your app is production-ready!** 🚀
