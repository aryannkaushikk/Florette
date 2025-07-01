
# 🌸 Florette

Florette is a **period tracking and wellness web app** built using **React**, **Tailwind CSS**, **Supabase**, and **React Query**.  
It helps users track their menstrual cycles, log moods, share tips, and explore community-driven content — all in a calming, rose-themed interface.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, React Router
- **Auth & Database**: Supabase (Auth + PostgreSQL)
- **State Management**: React Query
- **Charts**: Recharts
- **Icons**: Lucide, Heroicons
- **Deployment**: Vercel

---

## ✨ Features

### 📆 Period Tracker
- Log periods with start and end dates
- View cycle history and predictions
- Visual calendar display

### 📓 Journal
- Add daily mood logs with emoji-based input
- Custom tags and notes per entry
- Mood pie chart, mood bar chart, and tag distribution pie chart

### 🌱 Tips & Tricks
- Submit wellness tips tagged by category (e.g., Diet, Cramps, Skincare)
- Tag-based color themes
- Explore all user-submitted tips

### 🔐 Auth
- Sign up / Sign in with Supabase Auth
- Route protection for private pages
- Logout confirmation dialog

---

## 📁 Folder Structure

```
florette/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # AuthContext provider and hook
│   ├── data/            # Static JSON-like data (tagMeta, FAQs)
│   ├── hooks/           # React Query hooks (fetch, insert, delete)
│   ├── pages/           # Route-based screens
│   ├── themes/          # Tailwind-compatible color themes
│   ├── App.jsx          # Main App with routes
│   └── main.jsx         # Entry point
├── supabaseClient.js    # Supabase config
├── tailwind.config.js
└── README.md
```

---

## 🔧 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/florette.git
cd florette
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run development server

```bash
npm run dev
```

App runs at: `http://localhost:5173`

---

## 🧪 Planned Enhancements

- 🔔 Mood log reminders / notifications
- 📲 Responsive mobile drawer
- 🌙 Dark mode support
- 🧬 Smart cycle prediction (AI-backed)
- 🛠️ Admin panel for moderation

---

## 🙌 Acknowledgements

- [Supabase](https://supabase.com/) for backend and authentication
- [Vercel](https://vercel.com/) for deployment
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide Icons](https://lucide.dev/) for icon support

---

## 📄 License

[MIT](LICENSE)
