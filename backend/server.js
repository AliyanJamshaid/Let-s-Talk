const app = require("./app");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_LOCAL_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
