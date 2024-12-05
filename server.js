const app = require("./app");
const { sequelize } = require("./models");

const PORT = 5000;

sequelize.sync({ force: false }).then(() => {
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });