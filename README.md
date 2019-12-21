# Gulp Starterkit

## Prerequisites

- [Yarn](https://yarnpkg.com/en/docs/getting-started)

## Purpose

This is an easy to use starter kit that does a few things like:

- [x] Starts a dev server using Browsersync
- [x] Compiles SCSS files w/ Sourcemaps
- [x] Autoprefixes CSS
- [x] Uses SASS Globbing to import multiple files at once
- [x] Use Babel to use ES2015
- [x] Concat + Uglify
- [x] Optimize Images (separate gulp task)
- [x] Style Lint
- [ ] Icon Fonts
- [ ] SVG Sprite
- [ ] JS Imports
- [ ] a11y test
- [ ] Living Styleguide
- [ ] Convert imaages to webP

## Getting Started

Make sure you have yarn installed. Open terminal and run `yarn`. This will install all necessary packages.

From there you can run `gulp` and start working. If you need to optimize images, that's a separate task `gulp img`.

## Other Goodies

### Prettierrc

Used to get consistent styles set.

### CSSComb

Write in whatever style you want. It'll format your CSS on save with the [csscomb](https://github.com/mrmlnc/vscode-csscomb) plugin so your team writes consistent CSS.

### Sass lint

Sass-lint rules to help you avoid errors and enforce consistent styles.
