import React, { useEffect } from 'react';

const MicroReact = ({ history, name, host }) => {
  const scriptId = `micro-frontend-script-${name}`;

  const renderMicroReact = () =>
    window[`render${name}`](`${name}-container`, history);

  // const fetchScript = () => {
  //   fetch(`${host}/asset-manifest.json`)
  //     .then(res => res.json())
  //     .then(manifest => {
  //       const script = document.createElement('script');
  //       script.id = scriptId;
  //       script.crossOrigin = '';
  //       script.src = `${host}${manifest['main.js']}`;
  //       script.onload = renderMicroReact;
  //       document.head.appendChild(script);
  //     });
  // };

  useEffect(() => {
    if (document.getElementById(scriptId)) {
      renderMicroReact();
      return;
    }

    // fetchScript();
    fetch(`${host}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        const script = document.createElement('script');
        script.id = scriptId;
        script.crossOrigin = '';
        script.src = `${host}${manifest['main.js']}`;
        script.onload = renderMicroReact;
        document.head.appendChild(script);
      });
  }, []);

  useEffect(() => {
    return () => {
      if (window[`unmount${name}`])
        window[`unmount${name}`](`${name}-container`);
    };
  }, []);

  return <main id={`${name}-container`} />;
};

export default MicroReact;
