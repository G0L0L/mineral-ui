/* @flow */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';
import {
  createThemedComponent,
  mineralTheme,
  ThemeProvider
} from './../../themes';
import { shallow } from 'enzyme';
import TextInput, { componentTheme } from '../TextInput';
import examples from '../../../website/app/demos/TextInput/examples';
import testDemoExamples from '../../../../utils/testDemoExamples';

function shallowTextInput() {
  return shallow(<TextInput />);
}

describe('TextInput', () => {
  testDemoExamples(examples, {
    exclude: ['states', 'types']
  });

  it('renders', () => {
    const textInput = shallowTextInput();

    expect(textInput.exists()).toEqual(true);
  });

  describe('theme overrides', () => {
    // NOTE: This approach can only validate the rendered styles and not those
    // that may require different props/state/interaction to be applied.

    const renderComponentStylesToString = (component: React$Node) => {
      return renderStylesToString(
        renderToString(<ThemeProvider>{component}</ThemeProvider>)
      );
    };

    const getComponentThemeKeys = (
      component: React$ComponentType<*>,
      componentTheme: (baseTheme: Object) => {},
      ignoredKeys: Array<string>
    ) => {
      return Object.keys(componentTheme(mineralTheme)).filter(
        (key) => key.startsWith(component.name) && !ignoredKeys.includes(key)
      );
    };

    fit('is supported', () => {
      const SutComponent = TextInput;
      const defaultStyles = renderComponentStylesToString(<SutComponent />);
      const componentThemeKeys = getComponentThemeKeys(
        SutComponent,
        componentTheme,
        [
          'TextInput_color_readOnly',
          'TextInput_fontSize_small',
          'TextInput_height_small',
          'TextInput_height_medium',
          'TextInput_height_jumbo',
          'TextInput_paddingHorizontal_small'
        ]
      );

      componentThemeKeys.forEach((key) => {
        const ThemedSutComponent = createThemedComponent(SutComponent, {
          [key]: null
        });
        const themedStyles = renderComponentStylesToString(
          <ThemedSutComponent />
        );

        const styledChanged = themedStyles !== defaultStyles;
        if (!styledChanged) {
          throw new Error(`${key}: theme variable override failed`);
        }

        expect(styledChanged).toEqual(true);
      });
    });
  });
});
