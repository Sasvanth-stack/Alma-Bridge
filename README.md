# AlmaConnect: AI-Powered Alumni Portal

Welcome to AlmaConnect, a comprehensive, AI-powered alumni portal designed to connect students, alumni, and faculty in a dynamic, engaging community. This application is built as a modern, mobile-first web app.

## ✨ Features

*   **Dynamic Home Feed:** A social media-style feed to see the latest updates from fellow alumni.
*   **Interactive Event Calendar:** View, create, and manage alumni events.
*   **Alumni Directory:** Search for and connect with other alumni.
*   **Donation Campaigns:** Support causes and initiatives for your alma mater.
*   **Personal Profile Page:** Manage your information and view your activity.
*   **Notifications Center:** Stay updated on connections, likes, comments, and events.
*   **Alma AI Assistant:** An integrated AI chatbot, powered by the Google Gemini API, to help you navigate the portal and answer questions.

## 🚀 Tech Stack

*   **Frontend:** [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **AI:** [Google Gemini API](https://ai.google.dev/)
*   **Runtime:** Runs directly in the browser using ES Modules and Import Maps (no build step required).

## 🛠️ Running the Project Locally

This project is designed to run directly in a modern web browser without any complex build steps.

### Prerequisites

*   A modern web browser (like Chrome, Firefox, or Edge).
*   A Google Gemini API Key. You can get one for free from [Google AI Studio](https://aistudio.google.com/app/apikey).
*   A simple local web server. If you have Node.js or Python installed, you're all set.

### 1. Get the Code

Clone this repository or download and unzip the source code into a local folder.

### 2. Configure Your API Key (Important!)

The AI features of this application will not work without a valid Gemini API key.

1.  Open the file `services/geminiService.ts`.
2.  Find this line at the top of the file:
    ```typescript
    const API_KEY = process.env.API_KEY;
    ```
3.  **Replace `process.env.API_KEY` with your actual Gemini API key string.** For example:
    ```typescript
    const API_KEY = "YOUR_API_KEY_HERE";
    ```

> **⚠️ Security Warning:** Do not commit your API key to a public repository like GitHub. This method of adding the key is for local development purposes only. For a production application, you should use a backend proxy to protect your key.

### 3. Start a Local Web Server

Open your terminal or command prompt, navigate to the project's root folder (where `index.html` is located), and run one of the following commands:

**If you have Node.js:**
```bash
npx serve
```
This will start a server, usually at `http://localhost:3000`.

**If you have Python 3:**
```bash
python3 -m http.server
```
This will start a server, usually at `http://localhost:8000`.


### 4. Open the App

Open your web browser and navigate to the local address provided by your server (e.g., `http://localhost:3000`). The AlmaConnect app should now be running!

## 📂 Project Structure
```
.
├── components/         # Reusable React components (Navbar, Buttons, etc.)
├── constants.ts        # Mock data for the application (profiles, events, etc.)
├── contexts/           # React Context for global state (e.g., Authentication)
├── pages/              # Top-level page components (HomePage, EventsPage, etc.)
├── services/           # Services for interacting with external APIs (e.g., Gemini)
├── types.ts            # TypeScript type definitions and interfaces
├── App.tsx             # Main application component and router
├── index.html          # The main HTML file, entry point of the app
├── index.tsx           # Renders the main React app into the DOM
└── README.md           # You are here!
```
