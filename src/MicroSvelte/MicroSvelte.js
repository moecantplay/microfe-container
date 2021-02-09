import React, { useEffect, useState } from 'react';

const MicroSvelte = ({ history, name, host, document, window }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const scriptId = `micro-frontend-script-${name}`;

    const loadJS = (url, implementationCode) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.id = scriptId;
      script.crossOrigin = '';
      script.src = url;

      script.onload = implementationCode;
      script.onreadystatechange = implementationCode;

      document.head.appendChild(script);
    };

    const callBack = () => {
      setLoading(false);
    };

    loadJS(`${host}/dist/index.js`, callBack);

    return () => {
      if (document.getElementById(scriptId)) {
        document.getElementById(scriptId).remove();
      }
    };
  }, []);

  return (
    <main id={`${name}-container`}>
      {!loading ? <team-product-detail-component /> : 'Loading...'}
    </main>
  );
};

MicroSvelte.defaultProps = {
  document,
  window,
};

export default MicroSvelte;
