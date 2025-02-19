# 🏦 Personal Finance Visualizer

A **Next.js-powered** personal finance tracker that helps users manage their **expenses, budgets, and spending insights** effectively. Users can **add transactions, track monthly expenses, analyze category-wise breakdowns, set budgets, and compare actual vs. budgeted spending.**

📌 **Live Demo:** [personal-finance-visualizer.vercel.app](https://personal-finance-visualizer-gold.vercel.app/)

---

## 🚀 Features

### ✅ **Stage 1: Basic Transaction Tracking**

- Add, edit, and delete transactions 💰
- Track expenses with a **Monthly Expenses Chart 📊**
- Category-wise breakdown with **Pie Chart 🥧**
- Basic form validation 📝

### ✅ **Stage 2: Categories & Dashboard**

- Predefined **expense categories** 📂
- **Category Breakdown Pie Chart** 📊
- Dashboard with **total expenses, latest transactions, and spending summary**

### ✅ **Stage 3: Budgeting & Insights**

- **Set monthly budgets** for each category 📏
- **Budget vs. Actual Spending Bar Chart** 🏦
- Simple **spending insights** to help track highest expenses & categories 🧐

### ✅ **Multi-Page Navigation**

- **Add Transaction**
- **Monthly Expense**
- **Category Breakdown**
- **Set Monthly Budget**
- **Budget vs. Actual Spending**
- **Spending Insights**
- **Transaction History**

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, ShadCN UI, Recharts 📊
- **Backend:** Next.js API Routes, MongoDB Atlas (Mongoose ORM) 🛢️
- **Deployment:** Hosted on **Vercel** 🚀

---

## ⚙️ Setup Instructions

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/SatyaS18/personal-finance-visualizer.git
cd personal-finance-visualizer
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a .env.local file in the root directory and add:

```env
MONGODB_URI=mongodb+srv://your_user:your_password@your_cluster.mongodb.net/personal_finance
```

### **4️⃣ Run the Development Server**

```sh
npm run dev
```

Open http://localhost:3000 to see the app.

---
