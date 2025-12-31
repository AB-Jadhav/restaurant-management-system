# 🚀 Production Deployment Guide

## Complete Guide to Deploy Restaurant Management System to Production

This guide covers deploying your restaurant management system to various cloud platforms.

---

## 📑 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Configuration](#environment-configuration)
3. [Database Deployment](#database-deployment)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Complete Deployment Options](#complete-deployment-options)
7. [Post-Deployment Tasks](#post-deployment-tasks)
8. [Monitoring & Maintenance](#monitoring--maintenance)

---

## 1️⃣ Pre-Deployment Checklist

### Code Preparation

- [ ] All features tested locally
- [ ] Remove console.log statements
- [ ] Update error handling for production
- [ ] Remove demo/test data from seed file
- [ ] Verify all environment variables
- [ ] Update CORS origins to production URLs
- [ ] Set secure JWT secret (minimum 32 characters)
- [ ] Configure production database
- [ ] Update email service credentials
- [ ] Test all API endpoints

### Security Checklist

- [ ] Strong JWT secret configured
- [ ] Passwords hashed with bcrypt
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting implemented (optional)
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (mongoose handles this)
- [ ] XSS protection enabled

---

## 2️⃣ Environment Configuration

### Backend Production .env

Create a production `.env` file:

```env
# Server
NODE_ENV=production
PORT=5000

# Database - MongoDB Atlas
MONGODB_URI=mongodb+srv://prod_user:strong_password@cluster0.xxxxx.mongodb.net/restaurant_prod?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secure_production_jwt_secret_minimum_32_characters_random_string
JWT_EXPIRE=7d

# Email (Production SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-production-email@domain.com
EMAIL_PASSWORD=your-production-app-password
EMAIL_FROM=noreply@yourrestaurant.com

# Frontend URL (update after frontend deployment)
FRONTEND_URL=https://your-frontend-domain.com

# Optional: Error tracking
# SENTRY_DSN=your_sentry_dsn_here
```

### Frontend Production .env

```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

---

## 3️⃣ Database Deployment

### MongoDB Atlas Setup (Recommended)

1. **Create Production Cluster**
   ```
   - Go to https://cloud.mongodb.com
   - Create a new project: "Restaurant System Production"
   - Click "Build a Cluster"
   - Choose a cloud provider (AWS, Google Cloud, or Azure)
   - Select a region close to your users
   - Choose M0 (Free) or M10+ (Paid) tier
   ```

2. **Configure Security**
   ```
   - Database Access → Add Database User
   - Username: prod_user
   - Password: Generate secure password
   - Database User Privileges: Atlas admin
   
   - Network Access → Add IP Address
   - Allow access from anywhere: 0.0.0.0/0 (for cloud deployments)
   - Or add specific IP addresses of your servers
   ```

3. **Get Connection String**
   ```
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace <password> with your database user password
   - Add database name: /restaurant_prod
   ```

4. **Create Initial Data**
   ```bash
   # Update seed.js with production data
   # Run locally connected to production database
   MONGODB_URI=your_production_uri node seed.js
   ```

---

## 4️⃣ Backend Deployment

### Option 1: Heroku Deployment

#### Step 1: Prepare Backend

```bash
cd restaurant-system/backend

# Create Procfile
echo "web: node server.js" > Procfile

# Ensure package.json has correct scripts
# Add to package.json:
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### Step 2: Deploy to Heroku

```bash
# Install Heroku CLI from https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create app
heroku create your-restaurant-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
heroku config:set JWT_SECRET="your_secure_jwt_secret"
heroku config:set JWT_EXPIRE="7d"
heroku config:set FRONTEND_URL="https://your-frontend-url.com"
heroku config:set EMAIL_HOST="smtp.gmail.com"
heroku config:set EMAIL_PORT="587"
heroku config:set EMAIL_USER="your-email@gmail.com"
heroku config:set EMAIL_PASSWORD="your-app-password"
heroku config:set EMAIL_FROM="noreply@restaurant.com"

# Deploy
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main

# Open app
heroku open
```

#### Step 3: Verify Deployment

```bash
# Check logs
heroku logs --tail

# Test API
curl https://your-restaurant-backend.herokuapp.com/api/auth/login
```

### Option 2: Render Deployment

1. **Push to GitHub**
   ```bash
   # Create GitHub repository
   # Push your code
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/restaurant-backend.git
   git push -u origin main
   ```

2. **Deploy on Render**
   ```
   - Go to https://render.com
   - Sign up/Login
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configuration:
     * Name: restaurant-backend
     * Environment: Node
     * Build Command: npm install
     * Start Command: node server.js
     * Plan: Free or Starter
   ```

3. **Add Environment Variables**
   ```
   - In Render dashboard, go to Environment
   - Add all variables from your .env file
   - Click "Save Changes"
   ```

### Option 3: Railway Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Deploy
railway up

# Add environment variables in Railway dashboard
railway open
```

### Option 4: DigitalOcean App Platform

1. **Create App**
   ```
   - Go to https://cloud.digitalocean.com
   - Create → Apps → GitHub
   - Select your repository
   - Choose backend folder
   ```

2. **Configure**
   ```
   - Environment: Node.js
   - Build Command: npm install
   - Run Command: node server.js
   - HTTP Port: 5000
   ```

3. **Add Environment Variables**
   - Add all variables from .env file

---

## 5️⃣ Frontend Deployment

### Option 1: Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd restaurant-system/frontend

# Update API URL in .env
echo "REACT_APP_API_URL=https://your-backend-url.com/api" > .env

# Deploy
vercel

# Follow prompts:
# - Setup and deploy: Yes
# - Which scope: Your account
# - Link to existing project: No
# - Project name: restaurant-frontend
# - Directory: ./
# - Override settings: No

# Set environment variable
vercel env add REACT_APP_API_URL

# Deploy to production
vercel --prod
```

### Option 2: Netlify Deployment

#### Via Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

cd frontend

# Build the project
npm run build

# Deploy
netlify deploy

# Follow prompts, then deploy to production
netlify deploy --prod
```

#### Via Netlify Dashboard:

1. **Prepare Frontend**
   ```bash
   # Create netlify.toml
   cd frontend
   cat > netlify.toml << EOL
   [build]
     command = "npm run build"
     publish = "build"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   EOL
   ```

2. **Deploy**
   ```
   - Go to https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select repository
   - Build settings:
     * Build command: npm run build
     * Publish directory: build
   - Add environment variable: REACT_APP_API_URL
   - Click "Deploy site"
   ```

### Option 3: GitHub Pages (Free, but limited)

```bash
cd frontend

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
{
  "homepage": "https://yourusername.github.io/restaurant-system",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

# Deploy
npm run deploy
```

---

## 6️⃣ Complete Deployment Options

### All-in-One Solution 1: Heroku (Both Frontend & Backend)

**Backend:**
```bash
cd backend
heroku create restaurant-backend
# ... (see backend deployment above)
```

**Frontend:**
```bash
cd frontend

# Add static server
npm install -g serve

# Create Procfile
echo "web: serve -s build -l $PORT" > Procfile

# Add to package.json
{
  "scripts": {
    "start": "serve -s build",
    "heroku-postbuild": "npm run build"
  }
}

# Deploy
heroku create restaurant-frontend
heroku config:set REACT_APP_API_URL="https://restaurant-backend.herokuapp.com/api"
git push heroku main
```

### All-in-One Solution 2: AWS (Professional)

**Use AWS Elastic Beanstalk:**

1. Backend on Elastic Beanstalk
2. Frontend on S3 + CloudFront
3. Database on MongoDB Atlas or DocumentDB
4. Domain on Route 53

**Detailed AWS guide is beyond scope, but:**
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init

# Create environment
eb create production-env

# Deploy
eb deploy
```

---

## 7️⃣ Post-Deployment Tasks

### 1. Verify Deployment

**Backend:**
```bash
# Test health check
curl https://your-backend-url.com/

# Test login
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"manager","password":"manager123"}'
```

**Frontend:**
- Visit your frontend URL
- Test login with all three roles
- Verify all pages load correctly
- Check browser console for errors
- Test complete workflow (create order → pay bill)

### 2. Create Production Users

```bash
# Don't use default demo credentials in production!
# Create new users with strong passwords

curl -X POST https://your-backend-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@yourrestaurant.com",
    "password": "SecurePassword123!@#",
    "role": "manager"
  }'
```

### 3. Configure Custom Domain (Optional)

**For Backend (Heroku):**
```bash
heroku domains:add api.yourrestaurant.com
# Follow DNS configuration instructions
```

**For Frontend (Vercel):**
```bash
vercel domains add yourrestaurant.com
# Configure DNS records
```

### 4. Enable HTTPS

Most platforms (Heroku, Vercel, Netlify) provide automatic HTTPS.

For custom solutions:
- Use Let's Encrypt (free SSL certificates)
- Configure nginx as reverse proxy
- Force HTTPS redirects

### 5. Setup Monitoring

**Backend Monitoring:**
```javascript
// Add to server.js
if (process.env.NODE_ENV === 'production') {
  // Add error tracking (Sentry, LogRocket, etc.)
}
```

**Recommended Tools:**
- Sentry for error tracking
- LogRocket for session replay
- New Relic for performance monitoring
- UptimeRobot for uptime monitoring

---

## 8️⃣ Monitoring & Maintenance

### Health Checks

Create a health endpoint in backend:

```javascript
// Add to server.js or create routes/healthRoutes.js
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});
```

### Backup Strategy

**Database Backups:**
```
- MongoDB Atlas: Automatic backups enabled by default
- Schedule: Daily
- Retention: 7 days (free tier)
- Manual backups before major updates
```

**Application Backups:**
```
- Use Git for version control
- Tag releases: git tag v1.0.0
- Keep previous deployment available for rollback
```

### Update Strategy

```bash
# 1. Test locally
# 2. Push to staging (if available)
# 3. Create backup
# 4. Deploy to production
# 5. Monitor for errors
# 6. Rollback if needed

# Rollback on Heroku
heroku rollback

# Rollback on Vercel
vercel rollback
```

### Performance Optimization

1. **Enable Compression**
   ```javascript
   // In server.js
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add Caching Headers**
   ```javascript
   app.use(express.static('public', {
     maxAge: '1d'
   }));
   ```

3. **Database Indexing**
   ```javascript
   // In models
   schema.index({ field: 1 });
   ```

4. **CDN for Frontend**
   - Vercel and Netlify include CDN automatically
   - For custom: Use Cloudflare

---

## 🔒 Security Hardening

### Production Security Checklist

```javascript
// Install security packages
npm install helmet express-rate-limit cors

// In server.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// CORS with specific origin
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

---

## 📊 Cost Estimates

### Free Tier Deployment

- **Database:** MongoDB Atlas M0 (Free)
- **Backend:** Render/Heroku Free Tier
- **Frontend:** Vercel/Netlify Free Tier
- **Total:** $0/month

**Limitations:**
- Shared resources
- Sleep after inactivity
- Limited bandwidth

### Starter Production

- **Database:** MongoDB Atlas M10 ($57/month)
- **Backend:** Heroku Hobby ($7/month) or Render Starter ($7/month)
- **Frontend:** Vercel Pro ($20/month) or Netlify Starter ($19/month)
- **Total:** ~$85-100/month

### Professional Production

- **Database:** MongoDB Atlas M30 ($200+/month)
- **Backend:** Heroku Standard ($25-50/month per dyno)
- **Frontend:** Vercel Pro + CDN
- **Monitoring:** Sentry ($26+/month)
- **Total:** $300-500+/month

---

## 🆘 Troubleshooting Production Issues

### Issue: Build Fails

```bash
# Clear build cache
# Heroku
heroku repo:purge_cache -a your-app-name

# Vercel
vercel --force

# Check logs
heroku logs --tail
```

### Issue: Database Connection Timeout

- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check network security groups

### Issue: CORS Errors

- Update CORS origin in backend
- Verify FRONTEND_URL environment variable
- Check browser console for exact error

### Issue: Environment Variables Not Working

- Verify variables are set in platform
- Restart application after adding variables
- Check for typos in variable names

---

## ✅ Deployment Checklist

Before going live:

- [ ] All tests passing
- [ ] Production database created and secured
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)
- [ ] Initial users created
- [ ] Seed data added (tables, menu items)
- [ ] Monitoring enabled
- [ ] Backup strategy in place
- [ ] Error tracking configured
- [ ] Performance tested
- [ ] Security audit completed
- [ ] Documentation updated
- [ ] Team trained on production system

---

## 📞 Support & Resources

### Documentation
- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/deploying-nodejs)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [Netlify Deployment Guide](https://docs.netlify.com/)

### Monitoring Tools
- [Sentry](https://sentry.io) - Error tracking
- [UptimeRobot](https://uptimerobot.com) - Uptime monitoring
- [New Relic](https://newrelic.com) - Performance monitoring

---

**Congratulations on deploying your Restaurant Management System! 🎉**

