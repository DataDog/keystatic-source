'use strict';

var React = require('react');
var index = require('./index-8af3e3be.cjs.js');

function useSlugsInCollection(collection) {
  const config = index.useConfig();
  const tree = index.useTree().current;
  return React.useMemo(() => {
    const loadedTree = tree.kind === 'loaded' ? tree.data.tree : new Map();
    return index.getEntriesInCollectionWithTreeKey(config, collection, loadedTree).map(x => x.slug);
  }, [config, tree, collection]);
}

exports.useSlugsInCollection = useSlugsInCollection;
