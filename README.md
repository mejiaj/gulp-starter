# Gulp Starterkit

## Prerequisites
- [Yarn](https://yarnpkg.com/en/docs/getting-started)

## Purpose
This is an easy to use starter kit that does a few things like:
- Starts a dev server using Browsersync
- Creates sourcemaps for SCSS and JS files
- Handles SCSS files
  - Autoprefixes (last 3 versions)
  - Handles Errors gracefully
- Handles JS files
  - Use Babel to use ES2015
  - Concat + Uglify
- Optimize Images (separate gulp task)

## Getting Started
Make sure you have yarn installed. Open terminal and run `yarn`. This will install all necessary packages.

From there you can run `gulp` and start working. If you need to optimize images, that's a separate task `gulp img`.
