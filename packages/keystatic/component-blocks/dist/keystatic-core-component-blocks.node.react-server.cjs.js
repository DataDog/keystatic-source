'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var api = require('../../dist/api-26a0a35c.node.react-server.cjs.js');
var index = require('../../dist/index-bf07e3be.node.react-server.cjs.js');
require('../../dist/empty-field-ui-11e96e9f.node.react-server.cjs.js');
require('react/jsx-runtime');
require('emery');
require('@sindresorhus/slugify');
require('@braintree/sanitize-url');
require('@markdoc/markdoc');
require('slate');
require('emery/assertions');
require('js-base64');
require('crypto');
require('@emotion/weak-memoize');

function CloudImagePreview() {}
let cloudImageToolbarIcon = undefined;

const cloudImageSchema = {
  src: index.text({
    label: 'URL',
    validation: {
      length: {
        min: 1
      }
    }
  }),
  alt: index.text({
    label: 'Alt text'
  }),
  height: api.integer({
    label: 'Height'
  }),
  width: api.integer({
    label: 'Width'
  })
};

/** @deprecated Experimental */
function cloudImage(args) {
  return api.component({
    label: args.label,
    schema: cloudImageSchema,
    preview: CloudImagePreview,
    chromeless: true,
    toolbar: null,
    toolbarIcon: cloudImageToolbarIcon
  });
}

exports.cloudImage = cloudImage;