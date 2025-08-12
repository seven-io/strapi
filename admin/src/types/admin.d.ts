import type { MessageDescriptor } from 'react-intl';

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

export interface FilterComponentProps {
  disabled: boolean;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export interface ToComponentProps {
  params: SmsParams | VoiceParams;
  setParams: (params: SmsParams | VoiceParams) => void;
}

export interface FromComponentProps {
  params: SmsParams | VoiceParams;
  setParams: (params: SmsParams | VoiceParams) => void;
  tooltip: string;
}

export interface NotificationToggle {
  type: 'success' | 'danger' | 'warning' | 'info';
  message: string | MessageDescriptor;
}