# 🌍 Wanderlust Explorer - Travel & Tourism Destination Explorer

Frontend Candidate Screening Assessment built for **Aaroh Core Digital LLP • Aaroh Industry Immersion Programme (AIIP)**.

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: [Your GitHub Repository URL]
- **Live Deployed URL**: [Your Vercel / Netlify URL]

---

## 📌 Project Overview
**Wanderlust Explorer** is a modern, responsive Travel & Tourism Destination & Package Explorer web application engineered with **React** and **Tailwind CSS**. It enables travelers to browse curated holiday packages across Kerala and South India, filter destinations by category and title/location, inspect day-wise itineraries, bookmark favorite packages persistently, and perform frontend trip reservation flows with automated real-time GST pricing math.

### 🎯 Scope Constraint Compliance
- **100% Frontend**: Pure client-side implementation. Zero backend server, database, or external payment/booking API required.
- **Data Driven**: Powered by local JSON dataset at `src/data/packages.json`.
- **Client-Side Navigation**: Multi-page client-side redirection powered by `react-router-dom`.
- **Persistence**: Wishlist bookmarks synchronized in browser `localStorage`.

---

## 🛠️ Tech Stack & Dependencies
- **Core Framework**: React 19 / Vite 5
- **Routing**: `react-router-dom` v7
- **Styling**: Tailwind CSS v3 & `@tailwindcss/postcss`
- **Icons**: `lucide-react`
- **Utility**: `clsx`, `tailwind-merge`

---

## 🧭 Client-Side Navigation & Redirection Flow

| Route / View | Page Name | Required User Flow & Redirection Behavior |
| :--- | :--- | :--- |
| `/` | **Home & Explore** | Hero section with quick search, category filter pills (`All`, `Hill Station`, `Beach`, `Heritage`, `Adventure`), sorting dropdown, and responsive destination cards. Clicking **"View Details"** redirects to `/package/:id`. |
| `/package/:id` | **Package Detail Page** | Displays full trip overview, key highlights, day-wise itinerary timeline, inclusions/exclusions, price per person, and a **"Book This Trip"** CTA button that redirects to `/book/:id`. |
| `/book/:id` | **Trip Booking & Confirmation** | Interactive traveler counter (`+` / `-`) and start-date selector that computes subtotal, GST (5%), and grand total in real-time. Submitting redirects to a confirmed booking reference summary screen. |
| `/saved` | **Saved Trips Wishlist** | Lists all bookmarked destinations stored in `localStorage`, with quick navigation back to `/package/:id` or `/`. |

---

## ✨ Detailed Features & Implementation Highlights

### 1. Curated Local Dataset (`src/data/packages.json`)
Contains 8 curated South India and Kerala travel packages adhering strictly to the required schema:
- `id`, `title`, `location`, `category`, `duration`, `pricePerPerson`, `rating`, `image`, `summary`, and `highlights`.
- Plus rich additions: `inclusions`, `exclusions`, and `itinerary` (day-by-day).

### 2. Real-Time Search, Filtering & Sorting
- **Real-Time Text Search**: Instant search filtering by package title and location.
- **Category Filter Tabs**: Interactive pills for *All*, *Hill Station*, *Beach*, *Heritage*, and *Adventure* with distinct active Tailwind styling.
- **Sort Selector**: Sort destinations dynamically by:
  - *Price: Low to High*
  - *Price: High to Low*
  - *Top Rated*

### 3. Persistent Saved Trips (`localStorage`)
- Bookmark toggle button on every package card and detail page.
- Real-time **Saved Count badge** in the navigation bar.
- Automatic synchronization with browser `localStorage` across refreshes.

### 4. Dynamic Cost Calculation & Confirmation Screen
- Custom traveler counter and departure calendar selector.
- **Live Math Computation**:
  $$\text{Subtotal} = \text{pricePerPerson} \times \text{travelers}$$
  $$\text{GST (5\%)} = \text{round}(\text{Subtotal} \times 0.05)$$
  $$\text{Grand Total} = \text{Subtotal} + \text{GST}$$
- Submitting displays a booking voucher with a unique reference ID (e.g. `AAROH-XXXXX-XXXX`).

### 5. Mobile-First Responsive Layout
Seamless layout adaptation across:
- **Mobile**: `375px` (`grid-cols-1`)
- **Tablet**: `768px` (`md:grid-cols-2`)
- **Desktop**: `1280px` (`lg:grid-cols-3`)

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd DEMO
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📁 Project Directory Structure
```
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header with active links & live Saved Count badge
│   │   ├── Footer.jsx          # Travel-themed footer
│   │   └── PackageCard.jsx     # Responsive card with bookmark toggle & CTA
│   ├── context/
│   │   └── SavedContext.jsx    # React Context with localStorage persistence
│   ├── data/
│   │   └── packages.json       # 8 curated South India travel packages
│   ├── pages/
│   │   ├── Home.jsx            # / (Hero, search, category pills, sort & grid)
│   │   ├── PackageDetail.jsx   # /package/:id (Itinerary, inclusions, book button)
│   │   ├── Booking.jsx         # /book/:id (Cost math + confirmed reference)
│   │   └── SavedTrips.jsx      # /saved (Wishlist view synced with localStorage)
│   ├── App.jsx                 # Client-side router & layout wrap
│   ├── index.css               # Tailwind CSS directives & custom animations
│   └── main.jsx                # Application root entry
├── index.html                  # HTML entry with Plus Jakarta Sans typography
├── tailwind.config.js          # Tailwind theme configuration
├── postcss.config.js           # PostCSS configuration
└── package.json
```
