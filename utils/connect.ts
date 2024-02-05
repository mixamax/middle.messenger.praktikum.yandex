import Block, { RefType } from "../src/core/Block";
import { StoreEvents } from "../src/core/Store";
import { AppState } from "../src/type";
import { isEqual } from "./isEqual";
import { appStore } from "../src/store/appStore";

export function connect(
    mapStateToProps: (state: AppState) => Partial<AppState>
) {
    return function <P extends Record<string, any>, R extends RefType>(
        Component: typeof Block<P, R>
    ) {
        return class extends Component {
            private onChangeStoreCallback: () => void;
            constructor(props: P) {
                const store = appStore;
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                this.onChangeStoreCallback = () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        this.setProps({ ...newState });
                        // не забываем сохранить новое состояние
                        state = newState;
                    }

                    return;
                };

                // подписываемся на событие
                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }

            componentWillUnmount() {
                super.componentWillUnmount();
                appStore.off(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        };
    };
}
