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
