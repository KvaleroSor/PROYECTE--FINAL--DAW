import express from "express";
import cors from "cors";

//USERS
import postUser from "./api/routes_users/postNewUser.js";
import postUserLogin from "./api/routes_users/postUserLogin.js";
import updateUser from "./api/routes_users/updateUser.js";
import deleteUser from "./api/routes_users/deleteUser.js";
import getUser from "./api/routes_users/getUser.js";
import getUserById from "./api/routes_users/getUserById.js";

//ADMINS
import getUserRole from "./api/routes_admin/getUserRole.js";

//SPENDS
import postSpend from "./api/routes_spends/postSpend.js";
import updateSpend from "./api/routes_spends/updateSpend.js";
import deleteSpend from "./api/routes_spends/deleteSpend.js";
import getSpend from "./api/routes_spends/getSpend.js";
import getSpendById from "./api/routes_spends/getSpendById.js";
import getSpendsByCagegory from "./api/routes_spends/getSpendsByCategory.js";
import getSpendsByCategoryType from "./api/routes_spends/getSpendsByCategoryType.js";

//CATEGORIES
import postCategory from "./api/routes_categories/postCategory.js";
import getCategory from "./api/routes_categories/getCategory.js";
import getCategoryById from "./api/routes_categories/getCategoryById.js";
import updateCategory from "./api/routes_categories/updateCategory.js";
import deleteCategory from "./api/routes_categories/deleteCategory.js";

//INVERSION
import postInversion from "./api/routes_inversion/postInversion.js";
import getInversion from "./api/routes_inversion/getInversion.js";
import updateInversion from "./api/routes_inversion/updateInversion.js";
import deleteInversion from "./api/routes_inversion/deleteInversion.js";

//NOMINA
// import postNomina from './api/routes_nomina/postNomina.js';
// import getNomina from './api/routes_nomina/getNomina.js'
// import updateNomina from './api/routes_nomina/updateNomina.js';
// import deleteNomina from './api/routes_nomina/deleteNomina.js';

//SPEND PERCENTAGE
import postPercentageSpend from "./api/routes_percentage_spends/postPercentageSpends.js";
import getPercentageSpend from "./api/routes_percentage_spends/getPercentageSpend.js";
import updatePercentageSpend from "./api/routes_percentage_spends/updatePercentageSpend.js";
import deletePercentageSpend from "./api/routes_percentage_spends/deletePercentageSpend.js";

//SAVINGS
import postSaving from "./api/routes_savings/postSaving.js";
import getSavings from "./api/routes_savings/getSavings.js";
import getSavingById from "./api/routes_savings/getSavingById.js";
import updateSaving from "./api/routes_savings/updateSaving.js";
import deleteSaving from "./api/routes_savings/deleteSaving.js";
import processMonthlyContributions from "./api/routes_savings/processMonthlyContributions.js";
import getContributionHistory from "./api/routes_savings/getContributionHistory.js";
//========================================================================================//

const app = express();

app.use(express.json());
app.use(cors());

/**
 * Routes for users 🧑🏽‍💻👩🏽‍💻
 */

app.use("/api/users", postUser);
app.use("/api/users", postUserLogin);
app.use("/api/users", updateUser);
app.use("/api/users", deleteUser);
app.use("/api/users", getUser);
app.use("/api/users", getUserById);

/**
 * Routes for spends 💰
 */

app.use("/api/spends", postSpend);
app.use("/api/spends", updateSpend);
app.use("/api/spends", deleteSpend);
app.use("/api/spends", getSpend);
app.use("/api/spends", getSpendsByCagegory);
app.use("/api/spends", getSpendsByCategoryType);
app.use("/api/spends", getSpendById);
/**
 * Routes for categories 📋
 */

app.use("/api/categories", postCategory);
app.use("/api/categories", updateCategory);
app.use("/api/categories", deleteCategory);
app.use("/api/categories", getCategory);
app.use("/api/categories", getCategoryById);

/**
 * Routes for inversions 📋
 */

app.use("/api/inversion", postInversion);
app.use("/api/inversion", updateInversion);
app.use("/api/inversion", deleteInversion);
app.use("/api/inversion", getInversion);

/**
 * Routes for Nominas
 */

// app.use("/api/nomina", postNomina);
// app.use("/api/nomina", updateNomina);
// app.use("/api/nomina", deleteNomina);
// app.use("/api/nomina", getNomina);

/**
 * Routes for Spend Percentage
 */

app.use("/api/spendpercentage", postPercentageSpend);
app.use("/api/spendpercentage", getPercentageSpend);
app.use("/api/spendpercentage", updatePercentageSpend);
app.use("/api/spendpercentage", deletePercentageSpend);

/**
 * Routes for savings 💰🎯
 */

app.use("/api/savings", postSaving);
app.use("/api/savings", updateSaving);
app.use("/api/savings", deleteSaving);
app.use("/api/savings", getSavingById);
app.use("/api/savings", getSavings);
app.use("/api/savings", processMonthlyContributions);
app.use("/api/savings", getContributionHistory);

/**
 * Routes for Admin
 *
 * URL --> Per a que el admin puga vore tots els users que tinguen role "user".
 *
 */

app.use("/api/admin", getUserRole);

export default app;
