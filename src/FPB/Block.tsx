import useSizeMe from './useSizeMe';
import CalTag from './CalTag';
import debounce from 'lodash/debounce';
import { useEffect, useCallback } from 'react';
import React from 'react';
/**
 * 区块
 */
export interface BlockProps {
  /**
   * 父元素自动响应高度
   * @param height 区块内部高度
   */
  onParentHeightChange(height: number);
  /**
   * 外层height
   */
  height?: number;
  /**
   * 断点
   */
  breakpoint: string;
  /**
   * 开启计算高度
   */
  autoHeight: boolean;
  /**
   * 显示计量标签
   */
  showTag?: boolean;
}
const Block: React.SFC<BlockProps> = props => {
  const { showTag = true } = props;
  const [sized, width, height] = useSizeMe(
    () => {
      return (
        <div style={{ position: `relative`, zIndex: 0 }}>
          {/* 计量维度的tag */}
          {showTag && <CalTag width={width} height={props.height} />}
          {props.children}
        </div>
      );
    },
    {
      monitorHeight: true,
      // refreshMode: showTag?'debounce':'throttle',
      // refreshRate: showTag?200:16,
    },
  );
  const setParent = useCallback(
    debounce(props.onParentHeightChange, showTag ? 200 : 0),
    [props.onParentHeightChange],
  );
  useEffect(() => {
    console.log('setHeight');

    setParent(height as number);
  }, [height, props.breakpoint, props.autoHeight]);

  return <>{sized}</>;
};
export { Block as default };
