interface SiteConfig {
  name: string;
  description: string;
  links: {
    twitter: string;
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Duckee for Solana',
  description: '💛 Tokenized Generative AI Playground, built on Solana',
  links: {
    twitter: 'https://twitter.com/duckee',
    github: 'https://github.com/duckee-sol/',
  },
};
