import React from 'react';
import { createRoot } from 'react-dom/client';
import RootApp from './App';

const reactDomNode = document.getElementById('react-comp');

if (reactDomNode === null) {
    throw 'Invalid id for React entry HTML element!';
}

const root = createRoot(reactDomNode);
root.render(<RootApp />);