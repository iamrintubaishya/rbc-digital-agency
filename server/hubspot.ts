import { Client } from '@hubspot/api-client';

class HubSpotService {
  private client?: Client;

  constructor() {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      console.warn('HUBSPOT_ACCESS_TOKEN not found. HubSpot integration disabled.');
      return;
    }

    this.client = new Client({
      accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
    });
  }

  async createContact(contactData: {
    email: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    company?: string;
    website?: string;
  }) {
    if (!this.client) {
      throw new Error('HubSpot client not initialized. Please check HUBSPOT_ACCESS_TOKEN.');
    }

    try {
      const response = await this.client.crm.contacts.basicApi.create({
        properties: contactData,
      });
      return response;
    } catch (error: any) {
      console.error('HubSpot API Error:', error.message);
      throw new Error(`Failed to create HubSpot contact: ${error.message}`);
    }
  }

  async getContact(contactId: string) {
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
    } catch (error: any) {
      console.error('HubSpot API Error:', error.message);
      throw new Error(`Failed to get HubSpot contact: ${error.message}`);
    }
  }

  async updateContact(contactId: string, updates: Record<string, any>) {
    if (!this.client) {
      throw new Error('HubSpot client not initialized. Please check HUBSPOT_ACCESS_TOKEN.');
    }

    try {
      const response = await this.client.crm.contacts.basicApi.update(contactId, {
        properties: updates,
      });
      return response;
    } catch (error: any) {
      console.error('HubSpot API Error:', error.message);
      throw new Error(`Failed to update HubSpot contact: ${error.message}`);
    }
  }

  async searchContacts(email: string) {
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
                operator: 'EQ' as any,
                value: email,
              },
            ],
          },
        ],
        properties: ['firstname', 'lastname', 'email', 'phone', 'company'],
        limit: 1,
      });
      return response;
    } catch (error: any) {
      console.error('HubSpot API Error:', error.message);
      throw new Error(`Failed to search HubSpot contacts: ${error.message}`);
    }
  }

  async createDeal(dealData: {
    dealname: string;
    amount?: string;
    dealstage?: string;
    pipeline?: string;
    closedate?: string;
  }) {
    if (!this.client) {
      throw new Error('HubSpot client not initialized. Please check HUBSPOT_ACCESS_TOKEN.');
    }

    try {
      const response = await this.client.crm.deals.basicApi.create({
        properties: dealData,
      });
      return response;
    } catch (error: any) {
      console.error('HubSpot API Error:', error.message);
      throw new Error(`Failed to create HubSpot deal: ${error.message}`);
    }
  }

  // Check if service is enabled and ready
  isEnabled(): boolean {
    return !!this.client;
  }
}

export const hubspotService = new HubSpotService();