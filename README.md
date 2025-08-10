# **Next.js Authentication System with Email Verification**

A production-ready authentication system built with **Next.js**, **MongoDB**, **Nodemailer**, and **Mailtrap**.
It handles **user signup**, **login**, **email verification**, and **secure storage** of user credentials.

---

## **Features**

* **User Signup**

  * Registers users with **name**, **email**, and **password**
  * Passwords securely hashed with **bcryptjs**
* **User Login**

  * Authenticates users with stored credentials
  * Secure token handling
* **Email Verification**

  * Sends verification email upon signup using **Nodemailer** & **Mailtrap**
  * Includes a secure token-based verification link
* **Verification Page**

  * Clicking the email link redirects to a verification page
  * Verifies and updates user’s status in the database
* **Database Integration**

  * Stores users in **MongoDB** with Mongoose
* **Environment Variables**

  * Sensitive configuration stored securely in `.env`

---

## **Tech Stack**

* **Next.js 14** – Frontend and API routes
* **MongoDB & Mongoose** – Database and data modeling
* **Nodemailer** – Sending verification emails
* **Mailtrap** – Email testing and sandbox environment
* **bcryptjs** – Password hashing
* **React Hot Toast** – Notifications

---

## **Installation & Setup**

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/nextjs-auth-email-verification.git
   cd nextjs-auth-email-verification
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root and add:

   ```env
   MONGO_URI=your_mongodb_connection_string
   MAILTRAP_HOST=smtp.mailtrap.io
   MAILTRAP_PORT=2525
   MAILTRAP_USER=your_mailtrap_username
   MAILTRAP_PASS=your_mailtrap_password
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Project Structure**

```
/pages
  /api
    users/
      signup.js      # Handles user registration
      login.js       # Handles user login
      verifyemail.js # Handles email verification
  verify/            # Email verification page
/models
  userModel.js       # Mongoose user schema
/helpers
  mailerConfig.js    # Nodemailer configuration
/dbConfig
  connectToDb.js     # MongoDB connection setup
```

---

## **How Email Verification Works**

1. User signs up.
2. Server generates a **unique token** and sends a verification email.
3. User clicks the verification link in their email.
4. Server verifies the token and updates the user’s `isVerified` status.
5. User can now log in with full access.

---

## **Demo Email (Mailtrap Preview)**

When a user signs up, they’ll receive an email like this in **Mailtrap**:

```
Subject: Verify Your Email
Body: Click the link below to verify your account:
http://localhost:3000/verify?token=unique-token-here
```

---

## **Security Measures**

* **Hashed passwords** with bcrypt
* **Token-based verification**
* Environment variables for sensitive credentials
* Mailtrap sandbox to prevent accidental real email sending

---

## **Future Improvements**

* Add password reset functionality
* Integrate JWT authentication
* Deploy on Vercel
* Add rate limiting to prevent abuse

---

## **License**

This project is licensed under the **MIT License** – feel free to use and modify it.

---

If you want, I can **also add code snippets** inside this README showing signup, login, and verification API routes so it looks even more professional for GitHub. That way it’s not just a description but also serves as documentation. Would you like me to add that?


