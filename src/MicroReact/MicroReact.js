import React, { useEffect } from 'react';

const MicroReact = ({ history, name, host, document, window }) => {
  const renderMicroReact = () => {
    if (window[`render${name}`])
      window[`render${name}`](`${name}-container`, history);
  };

  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;
    if (document.getElementById(scriptId)) {
      renderMicroReact();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        const script = document.createElement('script');
        script.id = scriptId;
        script.crossOrigin = '';
        script.src = `${host}${manifest['main.js']}`;
        script.onload = renderMicroReact();
        document.head.appendChild(script);
      });

    return () => {
      if (window[`unmount${name}`]) {
        window[`unmount${name}`](`${name}-container`);
      }
    };
  }, []);

  return <main id={`${name}-container`} />;
};

MicroReact.defaultProps = {
  document,
  window,
};

export default MicroReact;
