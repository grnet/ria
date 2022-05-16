function getMinisters(ministriesJson) {
    let count = 0;
    let ministers = {};
    for (i in ministriesJson) {
      for (j in ministriesJson[i].roles) {
        let ministerFullName = ministriesJson[i].roles[j].name.split(/(\s+)/);
        let role;
        role = ministriesJson[i].roles[j].role;
        if (ministriesJson[i].roles[j].responsibility) {
          role += " - " + ministriesJson[i].roles[j].responsibility;
        }
        ministers[`${count}`] = {
          firstName: ministerFullName[0],
          lastName: ministerFullName[2],
          role: role,
          ministry: ministriesJson[i].ministry,
        };
        count++;
      }
    }
    return ministers;
}

function getMinistries(ministriesJson) {
    let ministries = [];
    for (i in ministriesJson) {
      let value = ministriesJson[i].ministry;
      if (value && String(value).trim()) {
        ministries.push({ ministry: value });
      }
    }
    return ministries;
}

module.exports = { getMinistries, getMinisters }