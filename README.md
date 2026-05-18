# EcoShoppe: Eco-Friendly E-Commerce Platform

![HTML](https://img.shields.io/badge/HTML-71.2%25-orange?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-19.6%25-yellow?style=flat-square)
![CSS](https://img.shields.io/badge/CSS-9.2%25-blue?style=flat-square)

EcoShoppe is a modern, sustainable e-commerce platform dedicated to promoting eco-friendly products. The platform provides a seamless shopping experience for environmentally conscious consumers while offering secure authentication and comprehensive product management.

---

## 🌿 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Pages & Navigation](#pages--navigation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

---

## 🌍 Overview

EcoShoppe is an innovative platform that bridges the gap between eco-conscious consumers and sustainable products. From biodegradable household items to reusable personal care products, EcoShoppe curates a carefully selected collection of environmentally friendly alternatives to everyday products.

**Mission:** To promote sustainable living by providing high-quality, ethically sourced eco-friendly products that reduce carbon footprint and contribute to a healthier planet.

---

## ✨ Key Features

### 🎨 Responsive Frontend Design
- User-friendly, intuitive interface built with **HTML**, **CSS**, and **JavaScript**
- Mobile-responsive design using **Bootstrap 4.5.2**
- Smooth animations and hover effects for enhanced UX
- Splash screen welcome animation

### 🔐 Secure User Authentication
- User registration with encrypted password storage using **bcrypt**
- Secure login functionality
- Session management via **localStorage**
- Account creation and login modal interface

### 🛍️ Product Management
- Dynamic product catalog with 12+ eco-friendly products
- Product cards displaying:
  - Product images and descriptions
  - Original and discounted pricing
  - Discount percentage calculations
- Real-time product search functionality
- Quantity selection controls (increment/decrement)

### 🛒 Shopping Cart Functionality
- Add products to cart with selected quantity
- Persistent cart storage using **MongoDB**
- User-specific cart management
- Cart display and management page

### 🔍 Product Discovery
- Intuitive search bar for quick product lookup
- Case-insensitive search functionality
- Filter products by keywords
- Featured products section on homepage

### 📱 Multi-Page Navigation
- Seamless navigation between pages
- Consistent header and footer across all pages
- Easy access to Home, Products, Cart, About Us, and Contact

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup and page structure
- **CSS3** - Styling, animations, and responsive layouts
- **JavaScript (ES6)** - Interactive features and DOM manipulation
- **jQuery** - DOM operations and event handling
- **Bootstrap 4.5.2** - Responsive grid and components

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework and routing
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling

### Security & Utilities
- **bcrypt** - Password hashing and encryption
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing
- **body-parser** - Request body parsing
- **express-validator** - Input validation

---

## 📂 Project Structure

```
EcoShoppe-E-Commerce-Website/
│
├── Public/                          # Frontend files
│   ├── index.html                   # Homepage with splash screen
│   ├── home.html                    # Alternate home page
│   ├── Product.html                 # Products catalog page
│   ├── cart.html                    # Shopping cart page
│   ├── aboutus.html                 # About Us information
│   ├── contact.html                 # Contact page
│   ├── style.css                    # Global styles
│   └── script.js                    # JavaScript functionality
│
├── server.js                        # Express server and API routes
├── package.json                     # Project dependencies
├── package-lock.json                # Dependency lock file
├── .gitignore                       # Git ignore rules
└── README.md                        # Project documentation
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local or Atlas cloud database)

### Step 1: Clone the Repository
```bash
git clone https://github.com/ThrishaRajesh/EcoShoppe-E-Commerce-Website.git
cd EcoShoppe-E-Commerce-Website
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
PORT=3113
```

Replace the placeholders with your MongoDB connection details.

### Step 4: Start the Server
```bash
node server.js
```

The server will run on `http://localhost:3113`

---

## 💻 Usage

### Accessing the Application

1. **Open Browser:** Navigate to `http://localhost:3113`
2. **Splash Screen:** Welcome animation displays (2 seconds)
3. **Account Modal:** Create an account or log in
4. **Browse Products:** Explore the product catalog
5. **Add to Cart:** Select quantity and add items to cart
6. **Manage Cart:** View and manage cart items

### User Flow

```
Welcome Screen
    ↓
Sign Up / Login
    ↓
Browse Products
    ↓
Search / Filter
    ↓
Add to Cart
    ↓
View Cart
    ↓
Checkout (Future Enhancement)
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/signup` | Create a new user account | `{ name, email, password }` |
| POST | `/login` | Authenticate user credentials | `{ email, password }` |

### Cart Routes

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/add-to-cart` | Add product to user's cart | `{ title, imageUrl, price, quantity, userId }` |

### Static Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Serve index.html |
| GET | `/home` | Serve home.html |
| GET | `/products` | Serve Product.html |

---

## 📄 Pages & Navigation

### 1. **Homepage (index.html / home.html)**
- Splash screen animation
- Account creation/login modal
- Featured products showcase
- Search functionality
- Product cards with quantity controls

### 2. **Products Page (Product.html)**
- Complete product catalog (12+ items)
- Eco-friendly product details
- Price information with discounts
- Add to cart functionality
- Search bar for filtering

### 3. **Shopping Cart (cart.html)**
- Display user's cart items
- Product details (title, price, quantity)
- Cart management features
- Navigation to other pages

### 4. **About Us (aboutus.html)**
- Company mission and values
- Product sourcing information
- Sustainability commitment
- Styled with background imagery

### 5. **Contact Us (contact.html)**
- Contact information
- Business hours
- Social media links
- Email and phone support details

---

## 🗄️ Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  cart: [
    {
      title: String,
      imageUrl: String,
      price: String,
      quantity: Number
    }
  ],
  createdAt: Date (auto)
}
```

### Sample Products

Each product includes:
- **Title:** Product name
- **Subtitle:** Product specification
- **Image URL:** Product image
- **MRP:** Original price
- **Discount Price:** Sale price
- **Discount Percentage:** Off percentage
- **Description:** Product details

---

## 🎨 Styling Highlights

### Color Scheme
- **Primary:** Green (#28a745) - Eco-friendly theme
- **Secondary:** Dark Slate Grey - Text and borders
- **Accent:** White - Text on colored backgrounds

### Key Components
- Responsive navigation header
- Product cards with hover animations
- Quantity control buttons
- Cart item styling
- Responsive grid layout

---

## 🔐 Security Features

- **Password Encryption:** Bcrypt with salt rounds (10)
- **Input Validation:** Basic client and server-side validation
- **Session Management:** localStorage for user tracking
- **Unique Email:** MongoDB unique constraint on email field

---

## 🚀 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Order tracking system
- [ ] User profile management
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Advanced search filters
- [ ] Two-factor authentication

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 📧 Contact & Support

- **Email:** contact@ecoshoppe.com
- **Phone:** +1 (234) 567-890
- **Address:** 123 EcoShoppe Street, Green City, GA 12345

---

## 🌟 Acknowledgments

- Bootstrap framework for responsive design
- MongoDB for reliable data persistence
- Open-source community for tools and libraries

---

<div align="center">

**Made with ♻️ for a sustainable future**

[⬆ Back to Top](#ecoshoppe-eco-friendly-e-commerce-platform)

</div>
