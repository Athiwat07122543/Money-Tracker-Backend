const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addType = async (req, res) => {
  try {
    const { name } = req.body;
    const type = await prisma.Type.create({
      data: {
        name: name,
      },
    });
    return res.status(200).json(type);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "CAN'T_ADD_TYPE",
      message: "ไม่สามารถสร้างประเภทรายรับได้",
    });
  }
};

exports.getType = async (req, res) => {
  try {
    const type = await prisma.Type.findMany();
    return res.status(200).json(type);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "CAN'T_GET_TYPE",
      message: "ไม่สามารถดึงข้อมูลประเภทรายรับได้",
    });
  }
};

exports.deleteType = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await prisma.Type.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json(type);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "CAN'T_GET_Income_LIST",
      message: "ไม่สามารถลบข้อมูลประเภทรายรับได้",
    });
  }
};
