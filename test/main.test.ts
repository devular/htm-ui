import { h } from 'preact';
import preactRenderToString from 'preact-render-to-string';
import { createElement } from 'react';
import { renderToString as reactRenderToString } from 'react-dom/server';
import { useHtmUI, renderStaticHtmUI } from '../src/index';
import * as glamor from 'glamor';

import theme from './test-theme';

describe('Core functions', () => {
  beforeEach(() => {
    //@ts-ignore
    glamor.flush();
  });

  it('Renders components with Preact', () => {
    const html = useHtmUI({ theme, createElement: h });
    const Heading = () =>
      html`
        <h1>Hello, World</h1>
      `;
    const [markup]: [string?, string?] = renderStaticHtmUI(
      html`
        <${Heading} />
      `,
      preactRenderToString
    );
    expect(markup).toMatch('Hello, World');
  });

  it('Renders components with React', () => {
    const html = useHtmUI({ theme, createElement });
    const Heading = () =>
      html`
        <h1>Hello, World</h1>
      `;
    const [markup]: [string?, string?] = renderStaticHtmUI(
      html`
        <${Heading} />
      `,
      reactRenderToString
    );
    expect(markup).toMatch('Hello, World');
  });

  it('Uses theme values', () => {
    const html = useHtmUI({ theme, createElement });
    const Heading = () =>
      html`
        <h1 sx=${{ color: 'red' }}>Hello, World</h1>
      `;
    const [, styles]: [string?, string?] = renderStaticHtmUI(
      html`
        <${Heading} />
      `,
      preactRenderToString
    );
    expect(styles).toMatch('hsl(30, 80%, 61%)');
  });

  it('Uses styled-system media queries', () => {
    const html = useHtmUI({ theme, createElement });
    const Heading = () =>
      html`
        <h1 sx=${{ fontSize: [2, 3, 4] }}>Hello, World</h1>
      `;
    const [, styles]: [string?, string?] = renderStaticHtmUI(
      html`
        <${Heading} />
      `,
      preactRenderToString
    );
    expect(styles).toMatch('font-size: 16px;');
    expect(styles).toMatch('min-width: 40em');
    expect(styles).toMatch('font-size: 20px');
    expect(styles).toMatch('min-width: 52em');
    expect(styles).toMatch('font-size: 24px');
  });
});
