import React, { SFC } from 'react';
interface FPRProps {}
const FPR: SFC<FPRProps> = props => {
  return (
    <>
      {/* <Provider value={{ form: props.form }}>
        <ResponsiveGridLayout
          style={{ display: !store.hasLayout() ? "none" : "block" }}
          className="layout"
          {...store.jsConfig}
        >
          {Object.entries(store.datas).map(([key, data]) => {
            return (
              <div key={key}>
                <Observer>
                  {() =>
                    store.mode === Mode.DESIGN && (
                      <ObservableBlockContainer
                        store={store}
                        itemKey={key}
                        data={data}
                      />
                    )
                  }
                </Observer>

                <ObservableBlock store={store} i={key} />
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </Provider> */}
    </>
  );
};
export { FPR as default };
