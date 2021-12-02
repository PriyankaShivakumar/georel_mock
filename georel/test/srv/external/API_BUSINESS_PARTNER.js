const cds = global.cds || require('@sap/cds')
module.exports = async srv => {

    const messaging = await cds.connect.to('messaging');
    // Mock events for s4
    srv.after("UPDATE", "A_BusinessPartner", async data => {
        const payload = { KEY: [{ BUSINESSPARTNER: data.BusinessPartner }] };
        console.log("sap.S4HANAOD.1908.ce.sap.s4.beh.businesspartner.v1.BusinessPartner.Changed.v1");
        await messaging.emit("sap.S4HANAOD.1908.ce.sap.s4.beh.businesspartner.v1.BusinessPartner.Changed.v1", payload);
        console.log('<< event emitted', payload);
    });

    srv.after("CREATE", "A_BusinessPartner", async data => {
        const payload = { KEY: [{ BUSINESSPARTNER: data.BusinessPartner }] };
        console.log("sap.S4HANAOD.1908.ce.sap.s4.beh.businesspartner.v1.BusinessPartner.Created.v1");
        await messaging.emit("sap.S4HANAOD.1908.ce.sap.s4.beh.businesspartner.v1.BusinessPartner.Created.v1", payload);
        console.log('<< event emitted', payload);
    });

    srv.on("READ", "A_BusinessPartner/to_BusinessPartnerRole", async(req) => {

        try {

            const businessPartner = req.params[0].BusinessPartner;
            let entity = 'A_BusinessPartnerRole';
            let columnsToSelect = ["BusinessPartner", "BusinessPartnerRole", "ValidFrom", "ValidTo", "AuthorizationGroup"];
            const tx = srv.transaction(req);
            const resultUsingHeaders = await tx.run(SELECT.from(entity).columns(columnsToSelect).where({
                BusinessPartner: businessPartner
            }));
            return resultUsingHeaders;



            // const tx = srv.transaction();
            // const resultUsingHeaders = await tx.send({
            //     query: SELECT.from(entity)
            //         .columns(columnsToSelect).where({
            //             BusinessPartner: businessPartner
            //         })
            // })
            // return resultUsingHeaders;

        } catch (err) {
            req.reject(err);
        }

    });

    srv.on('READ', "A_BusinessPartner/to_BusinessPartnerAddress", async(req) => {
        try {

            const businessPartner = req.params[0].BusinessPartner;
            let entity = 'A_BusinessPartnerAddress';
            let columnsToSelect = ["BusinessPartner", "AddressID", "Country", "CityName"];
            const tx = srv.transaction(req);
            const resultUsingHeaders = await tx.run(SELECT.from(entity).columns(columnsToSelect).where({
                BusinessPartner: businessPartner
            }));
            return resultUsingHeaders;

            // const tx = srv.transaction();
            // const resultUsingHeaders = await tx.send({
            //     query: SELECT.from(entity)
            //         .columns(columnsToSelect).where({
            //             BusinessPartner: businessPartner
            //         })
            // })
            // return resultUsingHeaders;

        } catch (err) {
            req.reject(err);
        }
    });


    srv.on('READ', "A_BusinessPartnerAddress/to_EmailAddress", async(req) => {
        try {

            //const businessPartner = req.params[0].BusinessPartner;
            const addressID = req.params[0].AddressID;
            let entity = 'A_AddressEmailAddress';
            let columnsToSelect = ["AddressID", "Person", "OrdinalNumber", "EmailAddress"];
            const tx = srv.transaction(req);
            const resultUsingHeaders = await tx.run(SELECT.from(entity).columns(columnsToSelect).where({
                AddressID: addressID
            }));
            return resultUsingHeaders;

            // const tx = srv.transaction();
            // const resultUsingHeaders = await tx.send({
            //     query: SELECT.from(entity)
            //         .columns(columnsToSelect).where({
            //             //  BusinessPartner: businessPartner,
            //             AddressID: addressID
            //         })
            // })
            // return resultUsingHeaders;

        } catch (err) {
            req.reject(err);
        }
    });

    srv.on('READ', "A_BusinessPartnerAddress/to_PhoneNumber", async(req) => {
        try {
            //console.log(req.params[0]);
            // const businessPartner = req.params[0].BusinessPartner;
            const addressID = req.params[0].AddressID;
            let entity = 'A_AddressPhoneNumber';
            let columnsToSelect = ["AddressID", "Person", "OrdinalNumber", "PhoneNumber"];
            const tx = srv.transaction(req);
            const resultUsingHeaders = await tx.run(SELECT.from(entity).columns(columnsToSelect).where({
                AddressID: addressID
            }));
            return resultUsingHeaders;


            // const tx = srv.transaction();
            // const resultUsingHeaders = await tx.send({
            //     query: SELECT.from(entity)
            //         .columns(columnsToSelect).where({
            //             //  BusinessPartner: businessPartner,
            //             AddressID: addressID

            //         })
            // })
            // return resultUsingHeaders;

        } catch (err) {
            req.reject(err);
        }
    });
}