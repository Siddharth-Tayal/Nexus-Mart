# Nexus-Mart Ecommerce Application

Nexus-Mart is a full-stack ecommerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It features user authentication, product management, shopping cart, order processing, payment integration with Stripe, image uploads via Cloudinary, and email notifications.

## Features

- **User Authentication**: Registration, login, password reset, profile management
- **Product Management**: View products, search, filter, reviews, ratings
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Place orders, view order history, order details
- **Payment Integration**: Secure payments using Stripe
- **Admin Panel**: Manage products, orders, users, reviews
- **Image Uploads**: Cloudinary integration for product images
- **Email Notifications**: Password reset and order confirmations via Nodemailer
- **Responsive Design**: Material-UI components for mobile-friendly UI

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Cloudinary** - Image hosting and management
- **Nodemailer** - Email sending
- **Validator** - Input validation
- **Cookie-parser** - HTTP cookie handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Redux** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Material-UI** - UI component library
- **Chart.js** - Data visualization (for admin dashboard)
- **React Alert** - Notification system
- **Web Font Loader** - Font loading
- **Country-State-City** - Location data

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

You'll also need accounts and API keys for the following services:
- **Stripe** - For payment processing
- **Cloudinary** - For image uploads
- **SMTP Service** (e.g., Gmail, SendGrid) - For email notifications

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Siddharth-Tayal/Nexus-Mart.git
   cd nexus-mart
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Set up environment variables:**

   Create a file `backend/config/config.env` and add the following environment variables:

   ```env
   # Database
   DB_URI=mongodb://localhost:27017/nexus-mart

   # JWT
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=5d
   COOKIE_EXPIRE=5

   # Port
   PORT=4000

   # Frontend URL
   FRONTEND_URL=http://localhost:3000

   # Stripe
   STRIPE_API_KEY=pk_test_your_stripe_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

   # Cloudinary
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret

   # SMTP (Email)
   SMPT_SERVICE=gmail
   SMPT_HOST=smtp.gmail.com
   SMPT_PORT=465
   SMPT_MAIL=your_email@gmail.com
   SMPT_PASSWORD=your_app_password
   ```

   **Note:** Replace the placeholder values with your actual API keys and credentials.

5. **Start MongoDB:**
   Make sure MongoDB is running on your system. You can start it with:
   ```bash
   mongod
   ```

## Running the Application

### Development Mode

1. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:4000`

2. **Start the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Production Build

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## API Endpoints

The API is available at `http://localhost:4000/api/v1`

### Authentication
- `POST /api/v1/register` - User registration
- `POST /api/v1/login` - User login
- `POST /api/v1/logout` - User logout
- `POST /api/v1/password/forgot` - Forgot password
- `PUT /api/v1/password/reset/:token` - Reset password
- `GET /api/v1/me` - Get user profile
- `PUT /api/v1/me/update` - Update profile
- `PUT /api/v1/password/update` - Update password

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/product/:id` - Get single product
- `POST /api/v1/admin/product/new` - Create product (Admin)
- `PUT /api/v1/admin/product/:id` - Update product (Admin)
- `DELETE /api/v1/admin/product/:id` - Delete product (Admin)
- `PUT /api/v1/review` - Create/update review

### Orders
- `POST /api/v1/order/new` - Create order
- `GET /api/v1/order/:id` - Get single order
- `GET /api/v1/orders/me` - Get user's orders
- `GET /api/v1/admin/orders` - Get all orders (Admin)
- `PUT /api/v1/admin/order/:id` - Update order status (Admin)

### Payments
- `POST /api/v1/payment/process` - Process payment
- `GET /api/v1/stripeapikey` - Get Stripe API key

## Project Structure

```
nexus-mart/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── config.env (create this file)
│   ├── controllers/
│   │   ├── orderController.js
│   │   ├── paymentControllers.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── catchAsyncError.js
│   │   └── error.js
│   ├── models/
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── orderRoute.js
│   │   ├── paymentRoute.js
│   │   ├── productRoute.js
│   │   └── userRoute.js
│   ├── utils/
│   │   ├── apifeatures.js
│   │   ├── errorHandler.js
│   │   ├── sendEmail.js
│   │   └── sendToken.js
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── actions/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── images/
│   │   ├── reducers/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── store.js
│   ├── package.json
│   └── README.md
├── package.json
└── README.md (this file)
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Thank You