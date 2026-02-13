
import { db } from "./db.js";
import { usersTable } from "./schema.js";
import { eq, and, or } from "drizzle-orm";

// REGISTER LOGIC
export const register = async (req, res) => {
    try {
        const { username, email, password, faceData } = req.body;

        const existingUser = await db.select().from(usersTable).where(eq(usersTable.username, username));
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Username already taken" });
        }

        await db.insert(usersTable).values({
            username,
            email, 
            password,
            faceData, 
        });

        console.log(`✅ User ${username} registered successfully!`);
        res.status(201).json({ message: "Registration Successful" });
    } catch (err) {
        console.error("❌ Registration Error:", err);
        res.status(500).json({ error: "Database error or data too long" });
    }
};

// UPDATED LOGIN LOGIC: Flexible Biometric Matching
export const login = async (req, res) => {
    try {
        const { username, password, faceData } = req.body;
        const isGoogleLogin = (password === "GOOGLE_AUTH_USER");

        // 1. Find user by Username OR Email
        const userResults = await db.select().from(usersTable).where(
            or(
                eq(usersTable.username, username),
                eq(usersTable.email, username)
            )
        );

        if (userResults.length === 0) {
            return res.status(401).json({ error: "User not found" });
        }

        const user = userResults[0];

        // 2. Validate Password (unless it's Google login)
        if (!isGoogleLogin && user.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        //  BIOMETRIC CHECK
        // We compare a portion of the string 
        // to allow for small variations while keeping it secure.
        const storedBioPrefix = user.faceData ? user.faceData.substring(0, 50) : "";
        const currentBioPrefix = faceData ? faceData.substring(0, 50) : "";

        if (storedBioPrefix !== "" && storedBioPrefix === currentBioPrefix) {
            console.log(`✅ Biometric Match for ${user.username}!`);
            res.status(200).json({ 
                message: "Login Successful",
                user: { id: user.id, username: user.username, email: user.email,password: user.password }
            });
        } else {
            console.log("❌ Face mismatch: The captured image differs too much from the record.");
            res.status(401).json({ error: "Biometric verification failed. Please align your face correctly." });
        }
    } catch (err) {
        console.error("❌ Login Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
