import type { Core, UID } from '@strapi/strapi';

declare global {
  var strapi: Core.Strapi;
}

export interface SevenPluginConfig {
  apiKey: string;
}

export interface SmsParams {
  to: string;
  from?: string;
  text: string;
  foreign_id?: string;
  label?: string;
  ttl?: number;
  flash?: boolean;
  no_reload?: boolean;
  performance_tracking?: boolean;
  delay?: string | Date;
}

export interface VoiceParams {
  to: string;
  from?: string;
  text: string;
  xml?: boolean;
}

export interface Filters {
  role?: string | number;
}

export interface Role {
  id: string | number;
  name: string;
  label: string;
  value: string | number;
}

export interface User {
  id: string | number;
  email: string;
  mobile_phone?: string;
  role: Role;
}

export interface SevenUtilClass {
  sendMessage(ctx: any, method: 'sms' | 'voice', strapi: Core.Strapi): Promise<{ message: string }>;
  getApiKey(strapi: Core.Strapi): Promise<string>;
  findUserPhonesByRoles(ctx: any, strapi: Core.Strapi): Promise<SmsParams | VoiceParams>;
  toLocaleTimestamp(dateTime: string | Date, locale?: string): number;
  getRoles(strapi: Core.Strapi): Promise<Role[]>;
  findUsersByRole(role: string | number, strapi: Core.Strapi): Promise<User[]>;
  initSevenClient(strapi: Core.Strapi): Promise<any>;
}

export interface SevenController {
  index(ctx: any): Promise<{ message: string }>;
  viewSettings(ctx: any): void;
  bulkFilters(ctx: any): Promise<{ roles: Role[] }>;
  sendSMS(ctx: any): Promise<{ message: string }>;
  sendVoice(ctx: any): Promise<{ message: string }>;
  getSettings(ctx: any): Promise<SevenPluginConfig>;
  setSettings(ctx: any): Promise<SevenPluginConfig>;
}

export interface SevenService {
  getSettings(): Promise<SevenPluginConfig>;
  setSettings(value: SevenPluginConfig): Promise<SevenPluginConfig>;
}