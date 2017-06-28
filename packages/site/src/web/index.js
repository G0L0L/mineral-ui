/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { simulations } from 'glamor';
import 'babel-polyfill';
import { ThemeProvider } from '@mineral-ui/component-utils';
import App from '../components/App';
import siteTheme from '../components/siteTheme';
// $FlowFixMe
import demos from '{{DEMO_LIST_PATH}}';

// Enable Glamor simulate helper
simulations(true);

// Github 404 page hack to support SPA hosting
const { redirect } = window.sessionStorage;
delete window.sessionStorage.redirect;
if (redirect && redirect !== window.location.href) {
  window.history.replaceState(null, '', redirect);
}

render(
  <BrowserRouter>
    <ThemeProvider>
      <ThemeProvider theme={siteTheme}>
        <App demos={demos} />
      </ThemeProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('app')
);