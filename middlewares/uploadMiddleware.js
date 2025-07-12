const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({ storage });
module.exports = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: "additionalImages", maxCount: 10 },
]);