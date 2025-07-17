const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addIncome = async (req, res) => {
  try {
    const { count, amount, typeId } = req.body;

    const income = await prisma.income.create({
      data: {
        count: Number(count),
        amount: Number(amount),
        typeId: Number(typeId),
      },
    });
    return res.status(200).json(income);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "CAN'T_ADD_INCOME",
      message: "ไม่สามารถสร้างข้อมูลรายรับได้",
    });
  }
};

exports.getIncome = async (req, res) => {
  try {
    const income = await prisma.income.findMany();
    return res.status(200).json(income);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "CAN'T_GET_Income_LIST",
      message: "ไม่สามารถดึงข้อมูลรายรับได้",
    });
  }
};
