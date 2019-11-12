import React, { useEffect, useState, SFC, useMemo, useRef } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import ReactDOM from 'react-dom';

interface FullScreenModalProps extends ModalProps {
  minuHeight?: number;
}

const FullScreenModal: SFC<FullScreenModalProps> = allProps => {
  const { bodyStyle, ...props } = allProps;
  const [height, setHeight] = useState(0);

  const minuHeight = useMemo(() => {
    return props.footer === null ? 0 : props.minuHeight ? props.minuHeight : 53;
  }, [props.footer, props.minuHeight]);
  const minuHeightRef = useRef(minuHeight);
  minuHeightRef.current = minuHeight;
  useEffect(() => {
    const caclHeight = () => {
      setTimeout(() => {
        const screenHeight = document.documentElement.clientHeight;
        setHeight(screenHeight - minuHeightRef.current);
      });
    };
    caclHeight();
    window.addEventListener('resize', caclHeight);
    return () => {
      window.removeEventListener('resize', caclHeight);
    };
  }, []);
  return (
    <Modal
      style={{ padding: 0, margin: 0, maxWidth: `100%` }}
      width={`100%`}
      bodyStyle={{ height, overflow: `auto`, ...bodyStyle }}
      centered
      {...props}
    />
  );
};
export default FullScreenModal;
