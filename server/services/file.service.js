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

  uploadDetail = async (req, res) => {
    try {
      const file = req.files.detail;
      // const detailId = req.body.detailId;
      const user = req.user.user;

      if (user.role !== "student") {
        const dirPath = path.join(this.path, "admin", user.id);

        if (!fs.existsSync(dirPath)) {
          await fs.mkdirSync(dirPath);
        }

        const filePath = path.join(dirPath, file.name);
        console.log(filePath);

        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }

        file.mv(filePath);
      } else {
        const filePath = path.join(this.path, "students", user.id, detailId);

        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }

        file.mv(filePath);

        const student = await Student.findOne({ userId: user.id });

        const student2 = await Student.findOne({
          userId: user.id,
          tasks: { $elemMatch: { detailId } },
        });

        console.log(student);
        console.log(student2);

        const task = student.tasks.find((task) => task.detailId === detailId);

        task.moderation = true;
        task.moderated = false;
        // task.createdAt = new Date();

        await student.save();
        // await Student.findOneAndUpdate(
        //   { userId: user.id, tasks: { $elemMatch: { detailId } } },
        //   { moderation: true, moderated:false, updatedAt: Date.now() }
        // );
      }
      return res.status(200).json({ message: "File uploaded" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
}

module.exports = new FileService();
