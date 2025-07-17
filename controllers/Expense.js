const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addExpense = async (req, res) => {
  try {
    const { amount, reason } = req.body;

    const expense = await prisma.expenses.create({
      data: {
        amount: Number(amount),
        reason: reason,
      },
    });
    return res.status(200).json(expense);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "CAN'T_ADD_EXPENSE",
      message: "ไม่สามารถสร้างข้อมูลรายจ่ายได้",
    });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await prisma.expenses.findMany();
    return res.status(200).json(expense);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "CAN'T_GET_EXPENSE",
      message: "ไม่สามารถดึงข้อมูลรายจ่ายได้",
    });
  }
};
