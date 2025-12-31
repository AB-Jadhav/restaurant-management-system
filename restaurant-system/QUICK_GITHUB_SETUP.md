# 🚀 Quick Start: Create GitHub Repository

Follow these simple steps to create your GitHub repository for the Restaurant Management System.

---

## Step 1: Open PowerShell in Project Directory

You're already here! ✅

Current location: `D:\Personal Projects\restaurant-system`

---

## Step 2: Initialize Git Repository

```powershell
# Initialize git (if not already done)
git init

# Check status
git status
```

---

## Step 3: Create GitHub Repository

1. Open your browser and go to: **https://github.com/new**

2. Fill in the details:
   - **Repository name:** `restaurant-management-system`
   - **Description:** `Full-stack MERN restaurant management system with real-time table tracking, order management, billing, and role-based access control`
   - **Visibility:** Public (recommended for portfolio)
   - **DO NOT** check any boxes (README, .gitignore, license)

3. Click **"Create repository"**

---

## Step 4: Add Files and Push to GitHub

Copy and paste these commands one by one:

```powershell
# Add all files to git
git add .

# Commit with message
git commit -m "Initial commit: Restaurant Management System

Features:
- User authentication with role-based access (Manager, Cashier, Waiter)
- Table management with real-time status tracking
- Menu management with categories
- Order management with item tracking
- Billing system with multiple payment methods
- Dashboard with statistics
- Background jobs for notifications
- Responsive UI with Tailwind CSS"

# Add your GitHub repository as remote (REPLACE YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/restaurant-management-system.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 5: GitHub Authentication

When prompted for credentials:

- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (NOT your GitHub password)

### Create Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name: `Restaurant System Upload`
4. Select scopes: Check **`repo`** (full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## Step 6: Verify Upload

1. Go to your GitHub repository URL
2. Refresh the page
3. You should see all your files! ✅

---

## Your Repository Link Will Be:

```
https://github.com/YOUR-USERNAME/restaurant-management-system
```

**Replace YOUR-USERNAME with your actual GitHub username**

---

## Alternative: Using GitHub Desktop (Easier)

1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. File → Add Local Repository → Choose your project folder
4. Click "Publish repository"
5. Done! ✅

---

## Need Help?

See the complete guide: [GITHUB_SETUP.md](./GITHUB_SETUP.md)

