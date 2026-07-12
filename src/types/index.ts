export type Locale = "en" | "ar";

export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  body: string;
}

export interface BrandItem {
  name: string;
  logo?: string;
  category?: string;
}

export interface BrandTier {
  eyebrow: string;
  title: string;
  description: string;
  brands: BrandItem[];
}

export interface Sector {
  title: string;
  description: string;
  icon: string;
}

export interface Partner {
  name: string;
  note?: string;
}

export interface Value {
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface Dictionary {
  locale: Locale;
  meta: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
  };
  nav: {
    home: string;
    about: string;
    history: string;
    brands: string;
    sectors: string;
    partners: string;
    gallery: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    qattanglobalStore: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroPrimary: string;
    heroSecondary: string;
    heroEst: string;
    heroStat: string;
    heroScrollLabel: string;
    overviewEyebrow: string;
    overviewTitle: string;
    overviewBody: string;
    stats: Stat[];
    missionEyebrow: string;
    missionTitle: string;
    missionBody: string;
    visionEyebrow: string;
    visionTitle: string;
    visionPoints: string[];
    valuesEyebrow: string;
    valuesTitle: string;
    values: Value[];
    historyEyebrow: string;
    historyTitle: string;
    historyBody: string;
    historyCta: string;
    ecosystemEyebrow: string;
    ecosystemTitle: string;
    ecosystemBody: string;
    sectorsEyebrow: string;
    sectorsTitle: string;
    brandsEyebrow: string;
    brandsTitle: string;
    brandsBody: string;
    brandsCta: string;
    partnersEyebrow: string;
    partnersTitle: string;
    whyEyebrow: string;
    whyTitle: string;
    whyPoints: string[];
    galleryEyebrow: string;
    galleryTitle: string;
    galleryCta: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    marqueeLabel: string;
  };
  about: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    storyEyebrow: string;
    storyTitle: string;
    storyBody: string;
    missionEyebrow: string;
    missionTitle: string;
    missionBody: string;
    visionEyebrow: string;
    visionTitle: string;
    visionPoints: string[];
    valuesEyebrow: string;
    valuesTitle: string;
    values: Value[];
    heritageLead: string;
    scaleEyebrow: string;
    scaleTitle: string;
    stats: Stat[];
  };
  history: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    timelineEyebrow: string;
    timelineTitle: string;
    milestones: TimelineMilestone[];
    infraEyebrow: string;
    infraTitle: string;
    infraBody: string;
    stats: Stat[];
  };
  brands: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    tiers: BrandTier[];
    showroomsEyebrow: string;
    showroomsTitle: string;
    showroomsBody: string;
  };
  sectors: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    sectors: Sector[];
  };
  partners: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    sisterEyebrow: string;
    sisterTitle: string;
    sisterBody: string;
    accountsEyebrow: string;
    accountsTitle: string;
    accountsBody: string;
    accounts: Partner[];
  };
  gallery: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    lightboxClose: string;
    lightboxNext: string;
    lightboxPrev: string;
  };
  contact: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    detailsTitle: string;
    phoneLabel: string;
    emailLabel: string;
    websiteLabel: string;
    addressLabel: string;
    address: string;
    formTitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formSubject: string;
    formMessage: string;
    formConsent: string;
    formSubmit: string;
    formSuccessTitle: string;
    formSuccessBody: string;
    formErrorTitle: string;
    formErrorBody: string;
    formNote: string;
    validation: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      subjectRequired: string;
      messageRequired: string;
      consentRequired: string;
    };
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    getInTouch: string;
    copyright: string;
  };
  breadcrumbs: {
    home: string;
  };
  aria: {
    logo: string;
    langSwitcher: string;
    navToggle: string;
    externalLink: string;
    scrollDown: string;
    lightboxImage: string;
  };
}
