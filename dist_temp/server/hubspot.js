import { Client } from '@hubspot/api-client';
class HubSpotService {
    constructor() {
        if (!process.env.HUBSPOT_ACCESS_TOKEN) {
            console.warn('HUBSPOT_ACCESS_TOKEN not found. HubSpot integration disabled.');
            return;
        }
        this.client = new Client({
            accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
        });
    }
    async createContact(contactData) {
        if (!this.client) {
            throw new Error('HubSpot client not initialized. Please check HUBSPOT_ACCESS_TOKEN.');
        }
        try {
            const response = await this.client.crm.contacts.basicApi.create({
                properties: contactData,
            });
            return response;
        }
        catch (error) {
            console.error('HubSpot API Error:', error.message);
            throw new Error(`Failed to create HubSpot contact: ${error.message}`);
        }
    }
    async getContact(contactId) {
        if (!this.client) {
            throw new Error('HubSpot client not initialized. Please check HUBSPOT_ACCESS_TOKEN.');
        }
        try {
            const response = await this.client.crm.contacts.basicApi.getById(contactId, [
                'firstname',
                'lastname',
                'email',
                'phone',
                'company',
            ]);
            return response;
        }
        catch (error) {
            console.error('HubSpot API Error:', error.message);
            throw new Error(`Failed to get HubSpot contact: ${error.message}`);
        }
    }
    async updateContact(contactId, updates) {
        if (!this.client) {
            throw new Error('HubSpot client not initialized. Please check HUBSPOT_ACCESS_TOKEN.');
        }
        try {
            const response = await this.client.crm.contacts.basicApi.update(contactId, {
                properties: updates,
            });
            return response;
        }
        catch (error) {
            console.error('HubSpot API Error:', error.message);
            throw new Error(`Failed to update HubSpot contact: ${error.message}`);
        }
    }
    async searchContacts(email) {
        if (!this.client) {
            throw new Error('HubSpot client not initialized. Please check HUBSPOT_ACCESS_TOKEN.');
        }
        try {
            const response = await this.client.crm.contacts.searchApi.doSearch({
                filterGroups: [
                    {
                        filters: [
                            {
                                propertyName: 'email',
                                operator: 'EQ',
                                value: email,
                            },
                        ],
                    },
                ],
                properties: ['firstname', 'lastname', 'email', 'phone', 'company'],
                limit: 1,
            });
            return response;
        }
        catch (error) {
            console.error('HubSpot API Error:', error.message);
            throw new Error(`Failed to search HubSpot contacts: ${error.message}`);
        }
    }
    async createDeal(dealData) {
        if (!this.client) {
            throw new Error('HubSpot client not initialized. Please check HUBSPOT_ACCESS_TOKEN.');
        }
        try {
            const response = await this.client.crm.deals.basicApi.create({
                properties: dealData,
            });
            return response;
        }
        catch (error) {
            console.error('HubSpot API Error:', error.message);
            throw new Error(`Failed to create HubSpot deal: ${error.message}`);
        }
    }
    isEnabled() {
        return !!this.client;
    }
}
export const hubspotService = new HubSpotService();
