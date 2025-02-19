import mongoose from "mongoose";

const categories = [
  "Food",
  "Shopping",
  "Transport",
  "Entertainment",
  "Bills",
  "Health",
  "Other",
];

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: categories, required: true }, // Category field
  date: { type: Date, required: true },
});

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
