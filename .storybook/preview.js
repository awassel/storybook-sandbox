import { themes } from '@storybook/theming';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  ally: {
    runOnly: ['wcag2aa', 'section-508', 'best-practice'],
    rules: {
      'color-contrast': { enabled: true },
    },
  },
  docs: {
    theme: themes.light,
  },
};
