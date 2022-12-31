let database = require("../services/database");

async function getMinisters(ministries) {
  const ministers = [];

  const ministersResult = await database.minister.findAll().catch(() => {
    res.status(404).send("Could not locate ministers.");
  });

  const ministersData = [];
  const ministersLastNames = [];

  for (let i in ministersResult) {
    const ministryId = ministersResult[i].dataValues.ministryId;
    if (
      ministersResult[i].dataValues.name &&
      ministersResult[i].dataValues.name.split(" ").pop() !== ""
    )
      ministersLastNames.push(
        ministersResult[i].dataValues.name.split(" ").pop()
      );
    ministryId
      ? ministersData.push({
          name: ministersResult[i].dataValues.name,
          responsibility: ministersResult[i].dataValues.responsibility,
          role: ministersResult[i].dataValues.role,
          ministry: ministries[ministryId],
        })
      : ministersData.push({
          name: ministersResult[i].dataValues.name,
          responsibility: ministersResult[i].dataValues.responsibility,
          role: ministersResult[i].dataValues.role,
        });
  }
  ministersLastNames.sort();
  for (i in ministersLastNames) {
    for (j in ministersData) {
      const lastName = ministersData[j].name.split(" ").pop();
      if (lastName === ministersLastNames[i]) {
        ministers.push(ministersData[j]);
        break;
      }
    }
  }
  return ministers;
}

async function getMinistries() {
  const ministries = [];

  const ministriesResult = await database.ministries.findAll().catch(() => {
    res.status(404).send("Could not locate ministries.");
  });

  for (let i in ministriesResult) {
    ministries.push(ministriesResult[i].dataValues.name);
  }
  return ministries.sort();
}

module.exports = { getMinistries, getMinisters };
