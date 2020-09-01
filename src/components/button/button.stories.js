import primary from './primary.html';
import primaryCode from '!!raw-loader!./primary.html';
import secondary from './secondary.html';
import secondaryCode from '!!raw-loader!./secondary.html';
import tertiary from './tertiary.html';
import tertiaryCode from '!!raw-loader!./tertiary.html';
import danger from './danger.html';
import dangerCode from '!!raw-loader!./danger.html';
import ghost from './ghost.html';
import ghostCode from '!!raw-loader!./ghost.html';
import mdx from './button.mdx';
import './_button.scss';

export const Primary = () => {
  return primary;
};

Primary.parameters = {
  docs: {
    source: { code: primaryCode },
  },
};

export const Secondary = () => {
  return secondary;
};

Secondary.parameters = {
  docs: {
    source: { code: secondaryCode },
  },
};

export const Tertiary = () => {
  return tertiary;
};

Tertiary.parameters = {
  docs: {
    source: { code: tertiaryCode },
  },
};

export const Danger = () => {
  return danger;
};

Danger.parameters = {
  docs: {
    source: { code: dangerCode },
  },
};

export const Ghost = () => {
  return ghost;
};

Ghost.parameters = {
  docs: {
    source: { code: ghostCode },
  },
};

export default {
  title: 'Components/Button',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
