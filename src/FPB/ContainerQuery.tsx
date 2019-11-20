import { applyContainerQuery } from 'react-container-query';
import React from 'react';
//测量尺
export default applyContainerQuery(
  function(props: any) {
    const { xs, sm, md } = props.containerQuery;
    const nowBreakpoint=Object.entries(props.containerQuery).find(e => e[1] === true)[0];
    const isMobile = xs || sm || md;
    const childrenProps = { ...props.containerQuery, isMobile,nowBreakpoint };
    return (
      <>
        <div style={{ position: `fixed`, top: 0, left: 0, width: `100%` }} />
        {props.children(childrenProps)}
      </>
    );
  },
  {
    xs: {
      maxWidth: 575,
    },
    sm: {
      minWidth: 576,
      maxWidth: 767,
    },
    md: {
      minWidth: 768,
      maxWidth: 1024,
    },
    lg: {
      minWidth: 1025,
      maxWidth: 1199,
    },
    xl: {
      minWidth: 1200,
      maxWidth: 1599,
    },
    xxl: {
      minWidth: 1600,
    },
  },
);
