# Shopping Cart API

A Node.js API for managing a shopping cart system. The API allows adding, removing, and checking out items, with stock management and Redis caching for efficiency.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Testing](#testing)
- [Technologies Used](#technologies-used)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/shopping-cart-api.git
   cd shopping-cart-api

2. **Install dependencies:**
   ```bash
   npm install

## Configuration

3. **Set up Redis (Recommended for caching):**
   Ensure Redis is installed and running on your local machine, or update the Redis URL in .env if using a remote instance.
   
4. **Configure MongoDB::**
   - Ensure MongoDB is installed and running. By default, this API connects to mongodb://127.0.0.1:27017/shopping-cart. Adjust the connection string in the .env file if necessary..

5. **Create .env in Root Folder::**
   - PORT=3000
   - MONGODB_URI=mongodb://127.0.0.1:27017/shopping-cart
   - REDIS_URL=redis://127.0.0.1:6379

6. **Start Redis Server::**
   - PORT=3000
   - MONGODB_URI=mongodb://127.0.0.1:27017/shopping-cart
   - REDIS_URL=redis://127.0.0.1:6379
  
7. **Run Seed Command::**
    ```bash
    npm run seed

8. **Run Server::**
    ```bash
    npm run dev

## Documentation
  - https://documenter.getpostman.com/view/17430225/2sAY4vghvG


## Testing

9. **Test:**
   ```bash
   npm run test

