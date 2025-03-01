import cron from "node-cron";
import * as dbService from "../../DB/db.services.js";
import User from "../../DB/model/User.model.js";

cron.schedule("0 */6 * * *", async () => {
  await dbService.updateMany(
    { model: User, filter: {} },
    { $pull: { otp: { expiresIn: { $lt: new Date() } } } }
  );
});
