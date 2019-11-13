import React from 'react';
/**
 * 区块
 */
export interface BlockProps {
    /**
     * 父元素自动响应高度
     * @param height 区块内部高度
     */
    onParentHeightChange(height: number): any;
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
declare const Block: React.SFC<BlockProps>;
export { Block as default };
//# sourceMappingURL=Block.d.ts.map