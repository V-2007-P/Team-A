
Markdown
# VAANI: AI-Powered Biometric Assistant for the Visually Impaired 👁️🛡️

VAANI is a secure, biometric-based entry and assistance system. It utilizes facial recognition for secure authentication and leverages the Google Gemini AI engine to simplify digital interactions for visually impaired users.

---

## 📂 Project Architecture (File Breakdown)

This project follows a modular structure to ensure security, scalability, and ease of deployment.

- **`server.js`**: The heart of the application. It manages the Express server, handles API routing for AI features (Gemini), and acts as a secure proxy for Telegram messaging.
- **`db.js`**: Manages the persistent connection to the MySQL database (hosted on Railway/Koyeb). It includes specific configurations like `maxAllowedPacket` to handle large biometric image strings.
- **`schema.js`**: Defines the database structure using Drizzle ORM. This ensures that the code and the database stay in sync, specifically defining the `faceData` column as `LONGTEXT`.
- **`auth.controller.js`**: Contains the business logic for `register` and `login` functions, including the processing of incoming biometric data.
- **`index.html`**: The user interface. It features a responsive design (Tailwind CSS) and the JavaScript logic for camera initialization and optimized image capture (JPEG 0.5 compression).
- **`.env`**: Stores sensitive API keys and database credentials. (Note: This file should never be uploaded to GitHub).
- **`vercel.json`**: Configuration file for Vercel deployment, defining routes and serverless function behavior.

---

## 🛠️ Technology Stack

| Category         | Technology Used                                     |
|------------------|-----------------------------------------------------|
| **Frontend** | HTML5, Tailwind CSS, JavaScript (ES6+)             |
| **Backend** | Node.js, Express.js                                |
| **Database** | MySQL (Railway.app / Northflank)                   |
| **ORM** | Drizzle ORM                                        |
| **AI Engine** | Google Generative AI (Gemini 1.5 Flash)            |
| **Messaging** | Telegram Bot API (Proxy via Backend)               |

---

## ⚙️ Installation & Local Setup

1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/yourusername/vaani-system.git](https://github.com/yourusername/vaani-system.git)
   cd vaani-system
Install Dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and fill in your details:

Code snippet
DB_HOST=your_public_mysql_host
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=railway
DB_PORT=your_port
GEMINI_API_KEY=your_google_ai_key
TELEGRAM_TOKEN=your_bot_token
Start the Development Server:

Bash
npm start

🗄️ Database Configuration:

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    faceData LONGTEXT, -- Stores the base64 biometric image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Gemini said
Here is the complete, professional README.md file in a single, continuous format. I have included detailed descriptions for every file in your project and a clear guide on how to set it up.

You can copy the entire block below and paste it into a file named README.md in your project's root folder.

Markdown
# VAANI: AI-Powered Biometric Assistant for the Visually Impaired 👁️🛡️

VAANI is a secure, biometric-based entry and assistance system. It utilizes facial recognition for secure authentication and leverages the Google Gemini AI engine to simplify digital interactions for visually impaired users.

---

## 📂 Project Architecture (File Breakdown)

This project follows a modular structure to ensure security, scalability, and ease of deployment.

- **`server.js`**: The heart of the application. It manages the Express server, handles API routing for AI features (Gemini), and acts as a secure proxy for Telegram messaging.
- **`db.js`**: Manages the persistent connection to the MySQL database (hosted on Railway/Koyeb). It includes specific configurations like `maxAllowedPacket` to handle large biometric image strings.
- **`schema.js`**: Defines the database structure using Drizzle ORM. This ensures that the code and the database stay in sync, specifically defining the `faceData` column as `LONGTEXT`.
- **`auth.controller.js`**: Contains the business logic for `register` and `login` functions, including the processing of incoming biometric data.
- **`index.html`**: The user interface. It features a responsive design (Tailwind CSS) and the JavaScript logic for camera initialization and optimized image capture (JPEG 0.5 compression).
- **`.env`**: Stores sensitive API keys and database credentials. (Note: This file should never be uploaded to GitHub).
- **`vercel.json`**: Configuration file for Vercel deployment, defining routes and serverless function behavior.

---

## 🛠️ Technology Stack

| Category         | Technology Used                                     |
|------------------|-----------------------------------------------------|
| **Frontend** | HTML5, Tailwind CSS, JavaScript (ES6+)             |
| **Backend** | Node.js, Express.js                                |
| **Database** | MySQL (Railway.app / Northflank)                   |
| **ORM** | Drizzle ORM                                        |
| **AI Engine** | Google Generative AI (Gemini 1.5 Flash)            |
| **Messaging** | Telegram Bot API (Proxy via Backend)               |

---

## ⚙️ Installation & Local Setup

1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/yourusername/vaani-system.git](https://github.com/yourusername/vaani-system.git)
   cd vaani-system
Install Dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and fill in your details:

Code snippet
    DB_HOST=your_public_mysql_host
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=railway
    DB_PORT=your_port
    GEMINI_API_KEY=your_google_ai_key
    TELEGRAM_TOKEN=your_bot_token
    Start the Development Server:

Bash
npm start
🗄️ Database Configuration

    To prevent the "Data too long" error when saving biometric images, you must manually initialize your MySQL table with the LONGTEXT data type. Run this command in MySQL Workbench:

SQL
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    faceData LONGTEXT, -- Stores the base64 biometric image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🌐 Deployment Guide

    Vercel Deployment (Recommended for Speed)
    Ensure your server.js exports the app: export default app;.

    Connect your GitHub repo to Vercel.

    Add all Environment Variables (from your .env file) into the Vercel Dashboard.

    The vercel.json will automatically handle the routing.

    Security Note
    HTTPS is Mandatory: Browsers like Chrome will block camera access on http://. All deployments (Vercel/Render/Koyeb) provide https:// by default, which enables the biometric scanner.

🤝 Contribution

    This project was developed for accessibility and security. Feel free to fork the repository and submit pull requests for new features like voice-guided navigation.

📄 License

  This project is licensed under the MIT License.


---

### **How to use this:**
1.  Open **VS Code**.
2.  Create a new file in your main folder called **`README.md`**.
3.  **Paste** the content above into that file and save it.
4.  When you push to GitHub, this will automatically appear on your main repository page with professional formatting.



