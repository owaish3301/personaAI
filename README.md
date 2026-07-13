# Persona AI — Chat with AI Mentors 🚀

An advanced interactive AI mentor chat application built with Next.js, Tailwind CSS v4, Prisma, and Better-Auth. Choose from a roster of virtual coding mentors modeled after world-class engineering educators and get personalized step-by-step code guidance, system design feedback, and interactive debugging assistance.

**Live Project URL:** [https://persona-ai-hu46.vercel.app/](https://persona-ai-hu46.vercel.app/)

---

## ✨ Features & UI Overhauls

- **🎨 Modern Aesthetic Shell:** A responsive dashboard shell featuring a collapsable mobile sidebar drawer, layout flex constraints, profile overlays, and smooth transitions.
- **⚡ Optimistic Messaging:** Real-time updates where messages appear instantly on the UI alongside an active, animated "Typing..." dots loader while queries are processed by the NVIDIA Nemotron LLM.
- **🔄 Scroll Anchor:** Automatic smooth scrolling that instantly shifts conversation logs down as messages load.
- **🌓 Light & Dark Theme:** Implemented a theme system that supports light and dark styles throughout headers, lists, custom message bubbles, and inputs.
- **🔐 Glassmorphism Authentication:** A customized sign-in viewport featuring official SVG social credentials (Google & GitHub) and state loading indicators.
- **🗂️ Mentor Cards:** Landing layout showcasing directories of mentor cards styled in custom gradients.

---

## 🛠️ Tech Stack

- **Core:** Next.js (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, PostCSS
- **Database:** Prisma ORM, PostgreSQL
- **Authentication:** Better-Auth (Google & GitHub social integration)
- **AI Completion:** NVIDIA Nemotron-3 Ultra LLM (OpenAI SDK client wrapper)

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file based on `.env.sample` and configure database connection URLs, client secrets, and auth properties.

3. **Database Setup:**
   Run Prisma migrations and seed mentor personas:
   ```bash
   npx prisma migrate dev
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

5. **Build for Production:**
   ```bash
   npm run build
   ```
