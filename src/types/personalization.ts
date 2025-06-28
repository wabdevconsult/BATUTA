export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  boxShadow: string;
}

export interface NavigationItem {
  label: string;
  url: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

export interface ActivityItem {
  title: string;
  description: string;
  image: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface SimulatorSettings {
  enabled: boolean;
  selectedSimulateur: string;
}

export interface BusinessHours {
  day: string;
  hours: string;
}

export interface SupportContact {
  email: string;
  phone: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  mapUrl: string;
  hours: BusinessHours[];
  support: SupportContact;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface SocialMediaLink {
  platform: string;
  url: string;
}

export interface FooterSettings {
  links: FooterLink[];
  socialMedia: SocialMediaLink[];
  copyright: string;
}

export interface Personalization {
  _id?: string;
  userId: string;
  siteName: string;
  logo?: string;
  theme: ThemeSettings;
  navigation: NavigationItem[];
  services: ServiceItem[];
  activities: ActivityItem[];
  features: FeatureItem[];
  simulateur: SimulatorSettings;
  contact: ContactInfo;
  footer: FooterSettings;
  createdAt?: string;
  updatedAt?: string;
}