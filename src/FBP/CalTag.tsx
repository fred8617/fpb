import { useLocalStore, useObserver } from 'mobx-react-lite';
import { Tag } from 'antd';
import { useEffect } from 'react';
import React from 'react';

interface CalTagProps {
  /**
   * 计量宽高
   */
  height: any;
  width: any;
}
const CalTag: React.SFC<CalTagProps> = ({ width, height }) => {
  let timeout; //计量维度定时器
  const store = useLocalStore(() => ({
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
    clearTimeout(timeout);
    store.showCalTag();
    timeout = setTimeout(() => {
      store.hideCalTag();
    }, 1000);
  }, [height, width]);
  return useObserver(() => (
    <Tag
      style={{
        position: `absolute`,
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
