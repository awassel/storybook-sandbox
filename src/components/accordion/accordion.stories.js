import { useEffect } from '@storybook/client-api';
import Accordion from './accordion';
import accordion from './accordion.html';
import accordionCode from '!!raw-loader!./accordion.html';
import mdx from './accordion.mdx';
import './_accordion.scss';

export const Default = () => {
  useEffect(() => {
    Accordion.init();
  });
  return accordion;
};

Default.parameters = {
  docs: {
    source: { code: accordionCode },
  },
};

export default {
  title: 'Components/Accordion',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
