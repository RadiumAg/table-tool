declare module '*.module.scss' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.module.sass' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '@vue/theme/config' {
  import { UserConfig } from 'vitepress';
  const config: () => Promise<UserConfig>;
  export default config;
}
