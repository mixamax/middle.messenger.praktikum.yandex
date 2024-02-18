import { expect, assert } from "chai";
import { Router, Route } from "./router";
import { describe, it } from "mocha";
import Block from "./Block";
import sinon from "sinon";

interface BlockConstructable<Props extends object, R extends {}> {
    new (): Block<Props, R>;
}
interface IProps {}
type Refs = {};

describe("Router test", () => {
    let router: Router<typeof Block>;
    let PageClass: BlockConstructable<object, typeof Block>;
    before(() => {
        router = new Router("app");
        class testPage extends Block<IProps, Refs> {
            constructor(props: IProps) {
                super({
                    ...props,
                });
            }

            protected render(): string {
                return `<div id="test"></div>`;
            }
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        PageClass = testPage;
    });

    afterEach(() => {
        // Restore the default sandbox here
        sinon.restore();
        // window.onpopstate = null;
    });

    it("метод use должен добавлять Route в массив router.routes", () => {
        const lengthBefore = router.routes.length;
        router.use("/", PageClass);
        const lengthAfter = router.routes.length;
        assert.equal(lengthBefore + 1 === lengthAfter, true);
    });
    it("метод use должен добавлять экземпляр класса Route в массив router.routes", () => {
        router.use("/", PageClass);
        assert.equal(
            Object.getPrototypeOf(router.routes[0]).constructor === Route,
            true
        );
    });
    it("метод start должен отрендерить тестовую страницу по пути '/' ", () => {
        router.use("/", PageClass);
        router.start();
        const element = document.getElementById("test");
        expect(!!element).to.be.true;
    });
    it("метод go должен установить новый location.pathname", () => {
        router.use("/", PageClass);
        router.start();
        router.go("/404");
        expect(window.location.pathname === "/404").to.be.true;
    });
    it("метод go должен увеличить window.history.length", () => {
        router.use("/", PageClass);
        router.start();
        const startLength = window.history.length;
        router.go("/404");
        const finishLength = window.history.length;
        expect(startLength + 1 === finishLength).to.be.true;
    });
    it("метод back должен вызвать метод window.history.back", () => {
        const stub = sinon.stub();
        window.history.back = stub;
        router.back();
        expect(stub.calledOnce).to.be.true;
    });
    it("метод forward должен вызвать метод window.history.forward", () => {
        const stub = sinon.stub();
        window.history.forward = stub;
        router.forward();
        expect(stub.calledOnce).to.be.true;
    });
});
