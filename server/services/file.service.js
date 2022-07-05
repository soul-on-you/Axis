const path = require("path");
const fs = require("fs");
const Student = require("../models/Student");
const Detail3D = require("../models/Detail3D");
const Graduation = require("../models/Graduation");

class FileService {
  constructor() {
    this.path = path.join(__dirname, "../files");
  }

  getDetails = async (req, res) => {
    try {
      const { role, id: userId } = req.user.user;

      if (role !== "student")
        return res.status(403).json({ message: "You are not student" });

      const student = await Student.findOne({ userId });

      if (!student)
        return res.status(404).json({ message: "Student not found" });

      const tasks = await Promise.all(
        (
          await Promise.all(
            student.tasks.map(async (task) => ({
              passed: task.passed,
              moderation: task.moderation,
              detail: await Detail3D.findById(task.detailId),
            }))
          )
        ).map(async ({ detail, passed, moderation }) => {
          return {
            title: detail.title,
            passed,
            moderation,
            level: await Graduation.findById(detail.graduation),
          };
        })
      );
      return res.status(200).json({ tasks });
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  loadDetailById = async (req, res) => {
    const detailId = req.query.detailId;

    // console.log(req.user);
    // if (
    //   !req.user.student.details
    //     .map((detail) => detail.detailId)
    //     .includes(detailId)
    // )
    //   return res.status(403).json({ message: "You dont have access rights" });

    const filePath = path.join(
      this.path,
      "/sourceDetails",
      detailId,
      "model.glb"
    );

    console.log("start loading file");

    console.log(filePath);

    if (await fs.existsSync(filePath)) {
      console.log("start loading file");

      return res.download(filePath);
    }
    return res.status(404).json({ message: "File not found" });
  };

  async uploadDetail(detailId, file) {
    // const filePath = path.join(this.path, detailId);
    // await fs.promises.writeFile(filePath, file);
  }
}

module.exports = new FileService();
