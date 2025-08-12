import type { Core } from '@strapi/strapi';
import type {
  SevenUtilClass,
  SmsParams,
  VoiceParams,
  Role,
  User,
  SevenPluginConfig
} from './types/strapi';

import SevenClient from "sms77-client";
import {phoneAttribute} from "./constants";

export class Util implements SevenUtilClass {
  static async sendMessage(
    ctx: any,
    method: 'sms' | 'voice',
    strapi: Core.Strapi
  ): Promise<{ message: string }> {
    const messages: string[] = [];
    const client = await Util.initSevenClient(strapi);
    const params = {
      ...await Util.findUserPhonesByRoles(ctx, strapi),
      json: true
    };
    const isToArray = Array.isArray(params.to);
    const requests: any[] = [];

    if (method === 'sms') {
      if (isToArray) {
        (params as any).to = (params.to as string[]).join(',');
      }
      requests.push(params);
    } else {
      const recipients = isToArray ? params.to : (params.to as string).split(',');
      for (const to of recipients) {
        requests.push({ ...params, to });
      }
    }

    for (const request of requests) {
      try {
        const res = await client[method](request);
        messages.push(JSON.stringify(res, null, 2));
      } catch (e: any) {
        messages.push(e.message);
      }
    }

    return { message: messages.join('\n') };
  }

  static async getApiKey(strapi: Core.Strapi): Promise<string> {
    const settings: SevenPluginConfig = await strapi.plugin('seven').service('store').getSettings();
    return settings.apiKey;
  }

  static async findUserPhonesByRoles(
    ctx: any,
    strapi: Core.Strapi
  ): Promise<SmsParams | VoiceParams> {
    const { filters, params } = ctx.request.body;

    if (params.to === '') {
      const to: string[] = [];

      const users = await Util.findUsersByRole(filters.role, strapi);
      for (const user of users) {
        const phoneNumber = (user as any)[phoneAttribute];
        if (phoneNumber && phoneNumber !== '') {
          to.push(phoneNumber);
        }
      }

      params.to = to;
    }

    return params;
  }

  static toLocaleTimestamp(dateTime: string | Date, locale: string = 'de-DE'): number {
    return (new Date(new Date(dateTime).toLocaleString(locale)).valueOf()) / 1000;
  }

  static async getRoles(strapi: Core.Strapi): Promise<Role[]> {
    const values: Role[] = [];
    let total = 0;

    const roles = await strapi.documents('plugin::users-permissions.role').findMany({
      pagination: { limit: -1 }
    });

    for (const role of roles) {
      const { id, name } = role as any;
      const count = await strapi.documents('plugin::users-permissions.user').count({
        filters: { role: { id } }
      });

      if (count !== 0) {
        total += count;
        values.push({
          id,
          name,
          label: `${name} (${count})`,
          value: id
        });
      }
    }

    return values;
  }

  static async findUsersByRole(
    role: string | number,
    strapi: Core.Strapi
  ): Promise<User[]> {
    const filters = role ? { role: { id: role } } : {};
    const users = await strapi.documents('plugin::users-permissions.user').findMany({
      filters,
      pagination: { limit: -1 }
    });
    return users as User[];
  }

  static async initSevenClient(strapi: Core.Strapi): Promise<any> {
    const apiKey = await Util.getApiKey(strapi);
    return new SevenClient(apiKey, 'strapi');
  }
}

export default Util;