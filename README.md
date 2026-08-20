# 🌿 Go Green - Smart Waste Management System

> **🏆 Smart India Hackathon (SIH) 2025 - Internal Hackathon Submission**  
> **Problem Statement ID:** 60

A comprehensive web-based waste management platform that streamlines the garbage collection process, from residential pickup to recycling hub verification.

## 🚀 Features
- **Admin Dashboard**: Live tracking of collector performance, active batches, and overall waste management progress across different zones.
- **Collector App**: Interactive interface for waste collectors to verify house cleaning, segregate waste, and generate secure 'End of Shift' batches.
- **Recycling Hub Verification**: Secure 4-digit handshake protocol for recycling centers to receive and verify incoming waste batches.
- **Resident Portal**: Allow residents to track their daily waste collection and manage their profiles.

## 🛠️ Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** EJS (Embedded JavaScript), Vanilla CSS, HTML5

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/waste-management.git
   cd waste-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   Ensure you have MongoDB running locally on `mongodb://127.0.0.1:27017/waste_management`.
   Run the seed file to generate initial data (Houses and Wards):
   ```bash
   node seed.js
   ```

4. **Start the Server:**
   ```bash
   node server.js
   ```
   The application will run on `http://localhost:3000`.

## 🔑 Demo Login Credentials
- **Admin:** `nishant123` / `admin`
- **Collector (1st Floor):** `collector_1` / `nishant123`
- **Recycling Hub:** `recycler_1` / `nishant123`
