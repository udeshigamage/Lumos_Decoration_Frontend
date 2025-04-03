# Lumos Decoration - Frontend

## Overview

Lumos Decoration is an e-commerce platform where customers can order garlands, bouquets, and decorations. Employees manage orders and track earnings, while admins oversee the entire system.

This repository contains the **React (TypeScript) frontend**, built with **Tailwind CSS**, **Redux**, and **React hooks**.

---

## Tech Stack

- **React (TypeScript)** - UI Development
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Redux** - Global state management
- **React Hooks** - (`useState`, `useEffect`, `useContext`)
- **Axios** - API requests
- **LocalStorage** - Cart item storage
- **JWT Authentication** - Secure login & access

---

## Features

### **Customer**
- Browse & search for decorations (garlands, bouquets, etc.)
- Add/remove items from the cart (stored in `localStorage`)
- Place orders & track order history
- Secure login with **JWT Authentication**

### **Employee**
- View assigned orders & update statuses
- Track earnings & allowances

### **Admin**
- Manage users, employees & products
- Monitor orders and overall system operations

### **Authentication & Authorization**
- JWT authentication for secure access
- Role-based access control (Admin, Employee, Customer)

### **State Management**
- Redux is used for **global state management**.
- LocalStorage is used for **persisting cart items**.

---

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-frontend-repo-url.git
   cd frontend
