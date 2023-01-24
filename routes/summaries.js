const routes = require("express").Router();
const {
  authUser,
  authAdmin,
  authRole,
  authAgency,
} = require("../middleware/auth");
let database = require("../services/database");
const Enums = require("../lib/enums/analysis");

routes.get(
  "/",
  authUser,
  authRole,
  authAgency,
  authAdmin,
  async (req, res, next) => {
    let entries = await database.analysis.count();
    let draftLaws = await database.analysis.count({
      where: { type: Enums.Type.DraftLaw },
    });
    let parliamentariansAmendments = await database.analysis.count({
      where: { type: Enums.Type.ParliamentariansAmendments },
    });
    let ministerAmendments = await database.analysis.count({
      where: { type: Enums.Type.MinistersAmendments },
    });
    let plans = await database.analysis.count({
      where: { type: Enums.Type.LawPlan },
    });
    let guidelines = await database.analysis.count({
      where: { type: Enums.Type.Guidelines },
    });
    let proposals = await database.analysis.count({
      where: { type: Enums.Type.LawProposal },
    });
    let urgent = await database.analysis.count({
      where: { type: Enums.Type.UrgentBill },
    });
    let conventions = await database.analysis.count({
      where: { type: Enums.Type.InternationalConventions },
    });

    let user = await database.user.findOne({
      where: {
        taxId: req.session.user.taxId,
      },
    });
    res.render("user_views/summaries", {
      entries: entries,
      user: user,
      draftLaws: draftLaws,
      plans: plans,
      proposals: proposals,
      guidelines: guidelines,
      urgent: urgent,
      conventions: conventions,
      ministerAmendments: ministerAmendments,
      parliamentariansAmendments: parliamentariansAmendments,
    });
  }
);

module.exports = routes;
