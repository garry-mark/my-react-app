
import * as React from 'react';

// 'hoist-non-react-statics' is no useful because it's a commndjs module
// and browser side use esnext module for tree shaking
// import hoistStatics = require('hoist-non-react-statics');

interface Style {
  _getCss: () => void;
}

function withStyles(...styles: any) {
  return function wrapWithStyles(ComposedComponent: any) {
    const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';
    const loadData = ComposedComponent.loadData || Promise.resolve();

    class WithStyles extends React.Component<any, any> {
      public static displayName = `WithStyles(${displayName})`;
      public static ComposedComponent = ComposedComponent;
      public static loadData = loadData;

      public componentWillMount() {
        if (this.props.staticContext) {
          styles.forEach((style: any) => {
            this.props.staticContext.styles.push((style as Style)._getCss());
          });

        }
      }

      public render() {
        return <ComposedComponent {...this.props} />;
      }
    }

    // return hoistStatics(WithStyles, ComposedComponent);
    return WithStyles;
  };
}

export default withStyles;
