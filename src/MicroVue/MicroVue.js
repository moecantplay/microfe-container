import React, { useEffect } from 'react';

const MicroVue = ({ history, name, host, document, window }) => {
  const renderMicroVue = () => {
    if (window[`render${name}`])
      window[`render${name}`](`${name}-container`, history);
  };

  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;
    if (document.getElementById(scriptId)) {
      renderMicroVue();
      return;
    }

    fetch(`${host}`)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(manifest => {
        const script = document.createElement('script');
        script.id = scriptId;
        script.crossOrigin = '';
        script.src = `${host}${manifest['main.js']}`;
        script.onload = renderMicroVue();
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

MicroVue.defaultProps = {
  document,
  window,
};

export default MicroVue;
