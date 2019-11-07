import React,{ useEffect, useState, SFC, useMemo } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

const FullScreenModal: SFC<ModalProps> = props => {
  const [height, setHeight] = useState(0);
  const minuHeight = useMemo(() => (props.footer === null ? 0 : 53), [
    props.footer,
  ]);
  useEffect(() => {
    const caclHeight = () => {
      setTimeout(() => {
        const screenHeight = document.documentElement.clientHeight;
        setHeight(screenHeight - minuHeight);
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
      style={{ padding: 0 }}
      width={`100%`}
      bodyStyle={{ height, overflow: `auto` }}
      centered
      {...props}
    />
  );
};
export default FullScreenModal;
