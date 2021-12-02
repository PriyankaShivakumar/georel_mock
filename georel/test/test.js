const chai = require('chai');
const chaiHttp = require('chai-http');
//const server = require('./server');
const config = require('./config');

let businesspartnerrole;
let businesspartneraddress;
let businesspartneremail;
let businesspartnerphone;
let businesspartner;

let bp;

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Should create Entry automatically", () => {

    it('create business partner role', (done) => {

        bp = Date.now().toString().slice(8, 12);

        let businesspartnerrole = {
            BusinessPartner: bp,
            BusinessPartnerRole: "FLCU01",
            ValidFrom: "2017-10-05T00:00:00Z",
            ValidTo: "9999-12-31T23:59:59Z",
            AuthorizationGroup: "",
        }

        chai.request(config.mock_service_domain)
            .post('/api-business-partner/A_BusinessPartnerRole').send(businesspartnerrole)
            .end((error, response) => {
                try {

                    response.should.have.status(201);
                    console.log(response.body);


                    response.body.should.be.a('object');
                    businesspartnerrole = response.body.BusinessPartner;
                    done();
                } catch (err) {
                    console.log(err);
                    done(err);
                }
            });

    })

    it('create business partner Address', (done) => {

        let businesspartneraddress = {
            BusinessPartner: bp,
            AddressID: bp,
            Country: "US",
            CityName: "New york",
        }

        chai.request(config.mock_service_domain)
            .post('/api-business-partner/A_BusinessPartnerAddress').send(businesspartneraddress)
            .end((error, response) => {
                try {
                    response.should.have.status(201);
                    console.log(response.body);


                    response.body.should.be.a('object');
                    businesspartneraddress = response.body.BusinessPartner;
                    done();
                } catch (err) {
                    done(err);
                }
            });

    })

    it('create business partner email address', (done) => {

        let businesspartneremail = {
            AddressID: bp,
            Person: bp,
            OrdinalNumber: "3",
            EmailAddress: "test@sap.com",
        }

        chai.request(config.mock_service_domain)
            .post('/api-business-partner/A_AddressEmailAddress').send(businesspartneremail)
            .end((error, response) => {
                try {
                    response.should.have.status(201);
                    console.log(response.body);


                    response.body.should.be.a('object');
                    businesspartneremail = response.body.BusinessPartner;
                    done();
                } catch (err) {
                    done(err);
                }
            });

    })

    it('create business partner phone address', (done) => {

        let businesspartnerphone = {
            AddressID: bp,
            Person: bp,
            OrdinalNumber: "3",
            PhoneNumber: "999 222 4442",
        }

        chai.request(config.mock_service_domain)
            .post('/api-business-partner/A_AddressPhoneNumber').send(businesspartnerphone)
            .end((error, response) => {
                try {
                    response.should.have.status(201);
                    console.log(response.body);


                    response.body.should.be.a('object');
                    businesspartnerphone = response.body.BusinessPartner;
                    done();
                } catch (err) {
                    done(err);
                }
            });

    })

    it('create business partner', (done) => {
        let businesspartner = {
            BusinessPartner: bp,
            Customer: "SAP",
            FirstName: "Marcus" + bp,
            LastName: "Lopas" + bp,
            CorrespondenceLanguage: "EN"
        }
        chai.request(config.mock_service_domain)
            .post('/api-business-partner/A_BusinessPartner').send(businesspartner)
            .end((error, response) => {
                try {
                    response.should.have.status(201);
                    console.log(response.body);


                    response.body.should.be.a('object');
                    bp = response.body.BusinessPartner;
                    setTimeout(() => {
                        done();
                    }, 1000);
                    // done();
                } catch (err) {
                    done(err);
                }

            });
    })
})