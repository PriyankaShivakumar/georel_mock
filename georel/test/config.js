// const cred = require('./appEnv')
// const vcap = cred.system_env_json.VCAP_SERVICES;
// const appenv = cred.application_env_json.VCAP_APPLICATION;
// let mockserverurl = appenv.application_uris[0].split(".");
// mockserverurl[0] = "cpapp-srv-mocks";
// mockserverurl = mockserverurl.join(".");


module.exports = {
    "service_domain": 'https://geomain-sleepy-hyena-ju.cfapps.sap.hana.ondemand.com/',
    "mock_service_domain": 'https://geo-mocks.cfapps.sap.hana.ondemand.com'
}