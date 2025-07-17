const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getList = async (req, res) => {
  try {
    const incomes = await prisma.income.findMany({
      include: {
        type: true,
      },
    });
    const expenses = await prisma.expenses.findMany();
    const list = [
      ...incomes.map((item) => ({
        id: item.id,
        type: "income",
        typeId: item.type.name,
        amount: item.amount,
        created_at: item.created_at,
      })),
      ...expenses.map((item) => ({
        id: item.id,
        type: "expense",
        amount: item.amount,
        reason: item.reason,
        created_at: item.created_at,
      })),
    ];

    list.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    return res.status(200).json(list);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "CAN'T_GET_LIST",
      message: "ไม่สามารถดึงรายการได้",
    });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const { date } = req.query;

    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 0);

    const [income, expense] = await Promise.all([
      prisma.income.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          created_at: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      prisma.expenses.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          created_at: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
    ]);

    return res.status(200).json({ income, expense });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "CAN'T_GET_SUMMARY",
      message: "ไม่สามารถดึงผลรวมได้",
    });
  }
};
