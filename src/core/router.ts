import Block from "./Block";
import { RefType } from "./Block";

interface BlockConstructable<Props extends object, R extends {}> {
    new (): Block<Props, R>;
}

class Route<Path extends string, R extends {}> {
    private _pathname;
    private _blockClass;
    private _block: Block<object> | null;
    private _props;
    constructor(
        pathname: Path,
        view: BlockConstructable<object, R>,
        props: Record<string, any>
    ) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: Path) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: Path) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }
        // console.log("this._block есть вызываем show() вместо render");

        this._block.show();
    }
}

// function render(query: string, block: B) {
//     const root = document.querySelector(query);
//     if (root) {
//         root.textContent = block.getContent();
//     }
//     return root;
// }
// ***********************************************************моя версия
function render(query: string, block: Block<object, RefType>) {
    const root = document.getElementById(query);
    if (root) {
        // root.innerHTML = "";
        root.append(block.getContent()!);
    }
    return root;
}

export type PathName =
    | "/"
    | "/sign-up"
    | "/settings"
    | "/messanger"
    | "/settings/changeprofile"
    | "/settings/changepass"
    | "/404"
    | "/500";
export class Router<R extends {}> {
    private static __instance: Router<{}>;
    routes: Route<PathName, R>[] = [];
    private _currentRoute: Route<PathName, R> | null = null;
    history;
    private _rootQuery;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance as Router<R>;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: PathName, block: BlockConstructable<object, R>) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
        });
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            const target = event.currentTarget as Window;
            if (target) this._onRoute(target.location.pathname as PathName);
        }).bind(this);

        this._onRoute(window.location.pathname as PathName);
    }

    _onRoute(pathname: PathName) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        // console.log("root.render");
        route.render();
    }

    go(pathname: PathName) {
        let path = pathname;
        if (
            pathname !== "/" &&
            pathname !== "/sign-up" &&
            pathname !== "/settings" &&
            pathname !== "/messanger" &&
            pathname !== "/settings/changeprofile" &&
            pathname !== "/settings/changepass" &&
            pathname !== "/500" &&
            pathname !== "/404"
        ) {
            path = "/404";
        }

        this.history!.pushState({}, "", path);
        // console.log(this.history?.state);
        this._onRoute(path);
    }

    back() {
        this.history!.back();
    }

    forward() {
        this.history!.forward();
    }

    getRoute(pathname: PathName) {
        return this.routes.find((route) => route.match(pathname));
    }
}

function isEqual<T>(lhs: T, rhs: T) {
    return lhs === rhs;
}

// function render(query, block) {
//     const root = document.querySelector(query);
//     root.textContent = block.getContent();
//     return root;
// }
export default new Router("app");
