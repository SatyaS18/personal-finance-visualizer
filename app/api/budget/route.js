import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Budget from "@/models/Budget";

export async function GET() {
  await connectDB();
  const budgets = await Budget.find({});
  return NextResponse.json(budgets, { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const { category, budget } = await req.json();

  if (!category || budget <= 0) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Update existing budget or create a new one
  const updatedBudget = await Budget.findOneAndUpdate(
    { category },
    { budget },
    { new: true, upsert: true }
  );

  return NextResponse.json(updatedBudget, { status: 201 });
}
