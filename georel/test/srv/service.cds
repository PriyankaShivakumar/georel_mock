using API_BUSINESS_PARTNER as BUPA_API from './external/API_BUSINESS_PARTNER';
 
 
service GeoServiceMocks {

  @sap.persistance.skip 
  entity BusinessPartner as projection on BUPA_API.A_BusinessPartner;
  entity BusinessPartnerRole as projection on BUPA_API.A_BusinessPartnerRole;
  entity BusinessPartnerAddress as projection on BUPA_API.A_BusinessPartnerAddress;
  entity EmailAddress as projection on BUPA_API.A_AddressEmailAddress;
  entity PhoneNumber as projection on BUPA_API.A_AddressPhoneNumber;
}