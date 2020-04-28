import css from '@styled-system/css';
import htm from 'htm';
import { css as gcss } from 'glamor';
//@ts-ignore
import { renderStatic } from 'glamor/server';

interface Config {
  theme: Object;
  createElement: Function;
}

const useHtmUI = function({ theme, createElement }: Config) {
  function h(type: String, props: any, ...children: any) {
    if (props && props.sx) {
      const styling = css(props.sx)({ theme });
      const classRule = gcss(styling);
      delete props.sx;
      props.className = classRule;
    }
    return createElement(type, props, children);
  }
  return htm.bind(h);
};

const renderStaticHtmUI = function(
  TopLevelComponent: any,
  renderToString: Function
): [string, string] {
  let output = renderStatic(function() {
    return renderToString(TopLevelComponent);
  });
  return [output.html, output.css];
};

export { useHtmUI, renderStaticHtmUI };
