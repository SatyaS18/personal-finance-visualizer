import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

// export async function GET() {
//   await connectDB();
//   const transactions = await Transaction.find().sort({ date: -1 });
//   return NextResponse.json(transactions);
// }

export async function GET() {
  await connectDB();

  // Explicitly select category along with other fields
  const transactions = await Transaction.find(
    {},
    "amount description category date"
  );

  console.log("Transactions Sent to Frontend:", transactions);

  return NextResponse.json(transactions, { status: 200 });
}



export async function POST(req) {
  await connectDB();
  const { amount, description, category, date } = await req.json();

  console.log("Received Transaction:", { amount, description, category, date });

  if (!amount || !description || !category || !date) {
    return NextResponse.json(
      { error: "Invalid input - All fields are required" },
      { status: 400 }
    );
  }

  const newTransaction = await Transaction.create({
    amount,
    description,
    category,
    date: new Date(date),
  });
  console.log("Saved Transaction:", newTransaction);

  return NextResponse.json(newTransaction, { status: 201 });
}
