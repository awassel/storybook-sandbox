# Rightpoint Storybook (CMS)

The Rightpoint Storybook is a standard front-end template for building fast, robust, and adaptable web components within the Rightpoint FED/UI group.

- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Code Quality](#code-quality)
  - [Prettier](#prettier)
  - [Linting](#linting)
- [Build Scripts](#build-scripts)

## Quick Start

Check out this repository to you local machine. From the commmand line, run:

```
npm install
```

Once the install completes, you can run:

```
npm start
```

## Architecture

The project is set up into multiple root level directories

`.storybook` contains all Storybook specific configuration files. Find out more about these files [here](https://storybook.js.org/docs/html/configure/overview).

`docs` contains all documentation files. There should only be MDX files within the directory.

`scripts` contains all build scripts. These all compile into the `dist` directory for easy integration will CMS systems.

`src` contains all files for the component builds. It is split into two specific directories `components` and `globals`.
  1. `components` is where all component files live. This directory should be seperated by component with all related files
  2. `globals` contains all

`static` hosts all static elements (image assets, PDF, Sketch files, etc.).

## Code Quality

This project uses a code formatter and two linting tools to ensure quality code delivery. They have many benefits, such as outputting better and more consistent code, getting rid of useless diffs in commits (new lines, indentation, etc.) among many others.

### Prettier

[Prettier](https://prettier.io/) is a code formatter that will ensure the code written matches the linting rules. It removes all original styling and ensures that all outputted code conforms to a consistent style defined by it's [Prettier rules](./.prettierrc).

### Linting

This project also utilizes uses two linters.

- [Stylelint](https://stylelint.io/) is used to keep Sass file quality consistent. It extends the default [Prettier rules](https://github.com/prettier/stylelint-prettier) as well as the [Sass Style Guidelines rules](https://github.com/bjankord/stylelint-config-sass-guidelines). Modifications on a per project basis can be made within the [.stylelintrc file](./.stylelinkrc).
- [ESLint](https://eslint.org/) is used to keep quality of the JavaScript files consistent. It extends [AirBnB's rules](https://www.npmjs.com/package/eslint-config-airbnb-base) and [Prettier rules](https://github.com/prettier/eslint-config-prettier). Modifications on a per project basis can be made within the [.eslintrc file](./.eslintrc).

## Build Scripts

There are a set of build scripts defined in the [`package.json`](./package.json) file.

- `build` runs the build process for all assets - HTML, Sass, CSS, and JavaScript - and puts them in the `dist` directory.
- `build:css` runs the build process for Sass and CSS and puts the compiled files in the `dist` directory.
- `build:html` runs the build process for HTML and puts the compiled files in the `dist` directory.
- `build:scripts` runs the build process for JavaScript and puts the compiled files in the `dist` directory.
- `build-storybook` builds the Storybook instance into static assets.
- `clean` deletes all assets from the `dist` directory.
- `dev` is an alias for `npm run storybook`.
- `prettier` runs a code quality check and updates
- `start` is an alias for `npm run storybook`.
- `storybook` starts the Storybook instance.
