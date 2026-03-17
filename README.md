# Freedom - Czyste Wentylacje 🌬️

Premium website for specialized ventilation and recuperation cleaning services. Built with a modern tech stack focusing on performance, aesthetics, and user conversion.

## 🚀 Technology Stack

### Frontend
- **React 19**: Modern UI library with functional components and hooks.
- **Vite 6**: Next-generation frontend tooling for blistering fast builds and HMR.
- **Tailwind CSS 4**: Utility-first CSS framework for custom, premium styling.
- **Motion (Framer Motion)**: For high-end animations and smooth page transitions.
- **Lucide React**: Clean and consistent iconography.
- **React Router 7**: Robust client-side navigation.

### Backend
- **Express**: Lightweight Node.js web server.
- **Nodemailer**: For sending contact form submissions via SMTP (Gmail).
- **Dotenv**: Secure environment variable management.
- **TSX**: TypeScript execution engine for running the server directly.

---

## 🛠️ Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) (for the contact form)

### Installation
1.  **Clone the project** to your local machine.
2.  **Install dependencies**:
    ```powershell
    npm install
    ```
3.  **Configure Environment**:
    Create a `.env` file in the root directory and add your credentials:
    ```env
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    ADMIN_EMAIL=recipient-email@gmail.com
    ```

### Running Locally
To run the full project (Frontend + Backend) in development mode:
```powershell
npm run server
```
- **Site URL**: `http://localhost:5177`
- **API Port**: `3001`

---

## 🌐 Server Deployment Guide

### Recommended Strategy: Production Build
For client installations and production servers, **always use the `dist/` folder** approach.

#### Why use `dist/`?
1.  **Speed**: Files are minified and optimized for fast loading.
2.  **Security**: Your source code (`.tsx`, `.ts`) is converted to browser-standard JavaScript, hiding your logic from the public.
3.  **Compatibility**: Browsers cannot read `.tsx` files directly; they must be compiled.

### Deployment Steps
1.  **Build the project**:
    ```powershell
    npm run build
    ```
    This creates a `dist/` folder in your root directory.

2.  **Upload to Server**:
    Transfer these files/folders to your production server:
    - `/dist` (The built frontend)
    - `server.ts` (The backend logic)
    - `package.json`
    - `.env` (Your production credentials)

3.  **Install Production Dependencies**:
    On the server, run:
    ```powershell
    npm install --omit=dev
    ```

4.  **Start the Production Server**:
    ```powershell
    npm run start
    ```
    Your server will now serve the optimized `dist/` files and handle emails.

---

## 📝 Contact Form Configuration
The system is set to port **3001** to avoid conflicts with other applications. If you want to change the port, update the `PORT` variable in `server.ts` and the proxy settings in `vite.config.ts`.

---
*Created by Antigravity AI for Freedom Czyste Wentylacje.*
