import { useLocalStore, useObserver, Observer } from 'mobx-react-lite';
import { Tag } from 'antd';
import { useEffect } from 'react';
import React from 'react';

interface CalTextProps {
  /**
   * 计量宽高
   */
  height?: number;
  width?: number;
}
const CalText: React.SFC<CalTextProps> = ({ width, height }) => {
  const store = useLocalStore(() => ({
    timeout: null, //计量维度定时器
    /**
     * 计量维度的透明度
     */
    opacity: 0,
    transition: null,
    showCalText() {
      store.opacity = 1;
      store.transition = null;
    },
    hideCalText() {
      store.opacity = 0;
      // store.transition= `opacity .5s`;
    },
  }));
  useEffect(() => {
    clearTimeout(store.timeout);
    store.showCalText();
    store.timeout = setTimeout(() => {
      store.hideCalText();
    }, 1000);
  }, [height, width]);
  return (
    <Observer>
      {() => (
        <div
          style={{
            position: `absolute`,
            zIndex: 2,
            top: 0,
            right: 10,
            transition: store.transition,
            opacity: store.opacity,
            color: `rgba(0, 0, 0, 0.65)`,
            fontWeight: `bold`,
          }}
        >
          {(width && height && `${Math.round(width)}x${Math.round(height)}`) ||
            (width &&  `${Math.round(width)}px`) ||
            (height && `${Math.round(height)}px`)}
        </div>
      )}
    </Observer>
  );
};
export default CalText;
