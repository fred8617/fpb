import React, { useState } from "react";
import { SizeMe } from "react-sizeme";
export interface Size {
  width: number;
  height: number;
}

export default function useSizeMe(
  render,
  options
): [React.ReactElement, number, number] {
  const [currentSize, setSize] = useState<Size>({ width: null, height: null });
  return [
    <SizeMe {...options}>
      {({ size }: { size: Size }) => {
        if (
          size.width !== currentSize.width ||
          size.height !== currentSize.height
        ) {
          setSize(size);
        }
        return render({ ...size });
      }}
    </SizeMe>,
    currentSize.width,
    currentSize.height
  ];
}
