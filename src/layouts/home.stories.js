import { useEffect } from '@storybook/client-api';
import Accordion from '../components/accordion/accordion';
import accordion from '../components/accordion/accordion.html';
import '../components/accordion/_accordion.scss';
import primary from '../components/button/primary.html';
import secondary from '../components/button/secondary.html';
import tertiary from '../components/button/tertiary.html';
import danger from '../components/button/danger.html';
import ghost from '../components/button/ghost.html';
import '../components/button/_button.scss';

export const Default = () => {
  useEffect(() => {
    Accordion.init();
  });
  return `
    <div style="max-width: 800px;">
      ${accordion}
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        ${primary}
        ${secondary}
        ${tertiary}
        ${danger}
        ${ghost}
      </div>
    </div>
  `;
};

export default {
  title: 'Page Layouts/Home',
};
