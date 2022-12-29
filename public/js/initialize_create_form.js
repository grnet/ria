for (let i in ministries) {
  ministriesArray.push(ministries[i].ministry);
}
for (let j in ministers) {
  ministersArray.push(ministers[j].lastName);
}
ministriesArray.sort();
ministersArray.sort();

setUserRestrictions(role);
setUserRestrictions(role);
setAnalysisType();
type = getAnalysisType(); //renew analysis
setSubtitle();
setSubText();
analysisRestrictions();
//initial_submit date - will be updated again when actually submitted
getFullDate("#initial_submit");

requiredDigitalGov();
requiredLegalistics();
createTooltips(tooltips);
