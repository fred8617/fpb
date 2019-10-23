import { useLocalStore, useObserver } from 'mobx-react-lite';
import { Tag } from 'antd';
import { useEffect } from 'react';
import React from 'react';

interface CalTagProps {
  /**
   * 计量宽高
   */
  height: number;
  width: number;
}
const CalTag: React.SFC<CalTagProps> = ({ width, height }) => {
  const store = useLocalStore(() => ({
    timeout:null,//计量维度定时器
    /**
     * 计量维度的透明度
     */
    opacity: 0,
    transition:null,
    showCalTag() {
      store.opacity = 1;
      store.transition= null;
    },
    hideCalTag() {
      store.opacity = 0;
      // store.transition= `opacity .5s`;
    },
  }));
  useEffect(() => {
    clearTimeout(store.timeout);
    store.showCalTag();
    store.timeout = setTimeout(() => {
      store.hideCalTag();
    }, 1000);
  }, [height, width]);
  return useObserver(() => (
    <Tag
      style={{
        position: `absolute`,
        zIndex:2,
        top: 0,
        left: 0,
        transition: store.transition,
        opacity: store.opacity,
      }}
    >
      {Math.round(width)}x{Math.round(height)}
    </Tag>
  ));
};
export default CalTag;
