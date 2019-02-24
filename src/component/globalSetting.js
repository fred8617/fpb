export const HOST='host';//主机路径
export const GRID_HEIGHT='gridHeight';//格子单位高度
export const GRID_WIDTH='gridWidth';//格子单位宽度
export const COLS='cols';//格子单位宽度
export const MARGIN_LR=`marginLR`;//左右间距
export const MARGIN_TB=`marginTB`;//上下间距
export const CONTAINER_TYPE=`containerType`;
export const CONTAINER_HEIGHT=`containerHeight`;
export const DEFAULT_HOST=`http://localhost:8080/`;//默认单位宽度
export const METHOD_LIST=[`GET`,`POST`,`PUT`,`DELETE`];//请求方法列表
export const CONTENT_TYPE_LIST=[
  {
    name:`Form`,
    value:`application/x-www-form-urlencoded`,
  },
  {
    name:`JSON`,
    value:`application/json`,
  },
];//contenttype
export const GRID_BREAK_POINTS=[
  {
    value:`lg`,
    width:1200,
    props:{
      disabled:true,
    }
  },
  {
    value:`md`,
    width:996,
  },
  {
    value:`sm`,
    width:768,
  },
  {
    value:`xs`,
    width:480,
  },
  {
    value:`xxs`,
    width:0,
  },
];
export const DEFAULT_GRID_WIDTH=10;//默认单位宽度
export const DEFAULT_GRID_HEIGHT=32;//默认单位高度
export const DEFAULT_MARGIN_LR=0;//默认左右间距
export const DEFAULT_MARGIN_TB=0;//默认上下间距
export const DEFAULT_COLS=['lg'];//默认栅格
export const SETTING_DRAWER_WIDTH=512;//布局抽屉宽度
export const DEFAULT_CONTAINER_TYPE=0;
export const DEFAULT_CONTAINER_HEIGHT=[null,null];
export const DRAWER_MASK_STYLE={
  background:`transparent`,
};//抽屉遮罩样式
export const DEFAULT_BREAK_POINTS={
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 0
}
