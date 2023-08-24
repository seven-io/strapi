import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function Initializer({ updatePlugin }) {
  const ref = useRef();
  ref.current = updatePlugin;

  useEffect(() => {
    ref.current('seven', 'isReady', true);
  }, []);

  return null;
};

Initializer.propTypes = {
  updatePlugin: PropTypes.func.isRequired,
};
