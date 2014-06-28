# livefyre-bootstrap

Bootstrap CSS framework, skinned to be ON FYRE.

## Features

* All Bootstrap rules only apply to descendants of elements with class 'lf'.
* `.lf-navbar` - `navbar` skinned to match Bard

## Building

Install node, then

    npm install

Run the dev server with

    npm start

The dev server compiles the livefyre-bootstrap less, and serves css.

Visit /demos/main to see it in action

![In action](http://d.pr/i/fFnP+)

## Usage

Build the CSS, then include add the stylesheet to your page

```html
<link rel="stylesheet" href="./dist/lf.css"></link>
```

Add the 'lf' class to your Element.

```html
<html class="lf">...</html>
```

You can include Bootstrap JS (to power dropdowns and such), with:

```javascript
require('livefyre-bootstrap');
```

## Developing

Styles go in /src/styles/ and are written in LESS.

/src/styles/all.less is what is compiled.

You can compile all.less into dist/lf.css with

    npm run build

## Tests

There are mocha tests in /tests/spec.

Run tests with

    npm test
