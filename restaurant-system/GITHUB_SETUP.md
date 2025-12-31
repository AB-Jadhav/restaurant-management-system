# 📦 GitHub Repository Setup Guide

## Step-by-Step Guide to Push Your Project to GitHub

---

## Prerequisites

- Git installed on your computer
- GitHub account created (free at https://github.com)

---

## Step 1: Install Git (if not already installed)

### Windows
1. Download from https://git-scm.com/download/win
2. Run installer with default settings
3. Verify: Open PowerShell and run `git --version`

### macOS
```bash
brew install git
# or it may already be installed
git --version
```

### Linux
```bash
sudo apt-get install git
git --version
```

---

## Step 2: Configure Git

```bash
# Set your name and email (used in commits)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

---

## Step 3: Create .gitignore Files

### Backend .gitignore

Create `restaurant-system/backend/.gitignore`:

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Build
dist/
build/

# Testing
coverage/
.nyc_output/

# Misc
.cache/
tmp/
temp/
```

### Frontend .gitignore

Create `restaurant-system/frontend/.gitignore`:

```gitignore
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production build
/build

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Misc
.cache/
.eslintcache
```

### Root .gitignore

Create `restaurant-system/.gitignore`:

```gitignore
# Environment files
.env
.env.local
.env.production

# Dependencies
node_modules/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Database files (if using local SQLite)
*.db
*.sqlite

# Temporary files
tmp/
temp/
```

---

## Step 4: Initialize Git Repository

```bash
# Navigate to your project root
cd restaurant-system

# Initialize git repository
git init

# Check status
git status
```

---

## Step 5: Create Repository on GitHub

1. **Go to GitHub** - https://github.com
2. **Click the "+" icon** in top-right corner
3. **Select "New repository"**

4. **Repository Settings:**
   - **Repository name:** `restaurant-management-system`
     
     *Alternative names:*
     - `mern-restaurant-pos`
     - `live-restaurant-ordering-system`
     - `table-order-billing-system`
   
   - **Description:** 
     ```
     Full-stack MERN restaurant management system with table management, 
     live ordering, billing, and role-based access control
     ```
   
   - **Visibility:** 
     - Public (recommended for portfolio)
     - Private (if you want to keep it private)
   
   - **DO NOT** initialize with README, .gitignore, or license
     (we already have these files)

5. **Click "Create repository"**

---

## Step 6: Add Files to Git

```bash
# Navigate to project root
cd restaurant-system

# Add all files
git add .

# Check what will be committed
git status

# Commit with meaningful message
git commit -m "Initial commit: Restaurant Management System

Features:
- User authentication with role-based access (Manager, Cashier, Waiter)
- Table management with real-time status tracking
- Menu management with categories
- Order management with item tracking
- Billing system with multiple payment methods
- Responsive UI with Tailwind CSS
- Background jobs for notifications and cleanup"
```

---

## Step 7: Connect to GitHub Repository

```bash
# Add remote repository (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/restaurant-management-system.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**If you see authentication prompt:**
- Use your GitHub username
- For password, use a Personal Access Token (not your GitHub password)
  - Create token at: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
  - Select scope: `repo` (full control of private repositories)
  - Copy the token and use it as password

---

## Step 8: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files
3. README.md should display automatically

---

## Step 9: Add Repository Description and Topics

1. **Go to your repository** on GitHub
2. **Click the gear icon** next to "About"
3. **Add description:**
   ```
   Full-stack MERN restaurant management system with real-time table tracking, 
   order management, billing, and role-based access control
   ```

4. **Add topics/tags:**
   ```
   mern-stack
   restaurant-management
   nodejs
   react
   mongodb
   express
   tailwindcss
   pos-system
   billing-system
   full-stack
   javascript
   restaurant-pos
   order-management
   ```

5. **Add website** (if deployed)
6. **Click "Save changes"**

---

## Step 10: Create a Good Repository Structure

Your GitHub repo should have these files in root:

```
restaurant-management-system/
├── .gitignore
├── README.md                    ✅ Main documentation
├── SETUP_GUIDE.md              ✅ Detailed setup instructions
├── DEPLOYMENT.md               ✅ Production deployment guide
├── GITHUB_SETUP.md             ✅ This file
├── PROJECT_ASSUMPTIONS.md      ✅ Project notes and assumptions
├── LICENSE                     📝 (Optional)
├── CONTRIBUTING.md             📝 (Optional)
├── backend/
│   ├── .gitignore
│   ├── .env.example            ✅ Template for environment variables
│   ├── package.json
│   └── ... (other backend files)
└── frontend/
    ├── .gitignore
    ├── .env.example            ✅ Template for environment variables
    ├── package.json
    └── ... (other frontend files)
```

---

## Step 11: Add a LICENSE (Optional)

### For Open Source (Recommended: MIT License)

Create `LICENSE` file:

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Or use GitHub's license generator:
1. Click "Add file" → "Create new file"
2. Type `LICENSE` as filename
3. Click "Choose a license template"
4. Select "MIT License" or your preferred license
5. Click "Review and submit"

---

## Step 12: Future Updates

### Making Changes and Pushing

```bash
# Check status
git status

# Add changed files
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

### Creating Branches (for features)

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Make changes, add, and commit
git add .
git commit -m "Add new feature"

# Push branch to GitHub
git push origin feature/new-feature

# Then create Pull Request on GitHub
```

### Syncing with GitHub

```bash
# Pull latest changes
git pull origin main

# Or fetch and merge
git fetch origin
git merge origin/main
```

---

## Step 13: Add Repository Badges (Optional)

Add these badges to the top of your README.md:

```markdown
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.4-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
```

---

## Step 14: Create Repository README Preview

Your repository should showcase:

1. **Clear project title and description**
2. **Tech stack badges** ✅ (Already in README)
3. **Demo credentials** ✅ (Already in README)
4. **Features list** ✅ (Already in README)
5. **Setup instructions** ✅ (README + SETUP_GUIDE.md)
6. **Screenshots** 📝 (Add if available)
7. **API documentation** ✅ (In README)
8. **Contributing guidelines** 📝 (Optional)
9. **License** 📝 (Optional)
10. **Contact information** ✅ (In README)

---

## Common Git Commands Reference

```bash
# Check status
git status

# View commit history
git log
git log --oneline

# View differences
git diff

# Undo changes (before commit)
git checkout -- filename.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create branch
git checkout -b branch-name

# Switch branch
git checkout main

# Merge branch
git merge branch-name

# Delete branch
git branch -d branch-name

# View remote repositories
git remote -v

# Update remote URL
git remote set-url origin new-url
```

---

## Troubleshooting

### Issue: "fatal: not a git repository"
```bash
# Make sure you're in the project root
cd restaurant-system
git init
```

### Issue: "remote origin already exists"
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin your-repo-url
```

### Issue: Authentication failed
```bash
# Use Personal Access Token instead of password
# Or configure SSH keys (recommended)

# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
# Copy your public key:
cat ~/.ssh/id_ed25519.pub
```

### Issue: Large files causing push to fail
```bash
# Check file sizes
find . -type f -size +50M

# If you have large files, use Git LFS
git lfs install
git lfs track "*.zip"
git add .gitattributes
```

### Issue: Merge conflicts
```bash
# Pull latest changes
git pull origin main

# Resolve conflicts in files (remove conflict markers)
# Then:
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

---

## Best Practices

1. **Commit Often** - Make small, focused commits
2. **Write Clear Messages** - Describe what and why
3. **Use Branches** - For new features or experiments
4. **Pull Before Push** - Stay synced with remote
5. **Never Commit Secrets** - Use .env and .gitignore
6. **Review Before Commit** - Use `git status` and `git diff`
7. **Tag Releases** - Use semantic versioning (v1.0.0)

```bash
# Create a release tag
git tag -a v1.0.0 -m "First stable release"
git push origin v1.0.0
```

---

## Repository Link Format

After completing these steps, your repository link will be:

```
https://github.com/YOUR-USERNAME/restaurant-management-system
```

**Share this link in your submissions or portfolio!**

---

## Next Steps

1. ✅ Repository created and pushed to GitHub
2. 📸 Add screenshots to README (optional)
3. 🚀 Deploy to production (see DEPLOYMENT.md)
4. 🌟 Add GitHub repository to your portfolio
5. 🔗 Share the link with potential employers
6. 📝 Keep README updated with new features

---

**Congratulations! Your project is now on GitHub! 🎉**

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

