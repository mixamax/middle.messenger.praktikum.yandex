import sinon from "sinon";
import { HTTPTransport, METHODS } from "./httpTransport";
import { expect } from "chai";
import constants from "../constants";

describe("HttpTransport", () => {
    let http: HTTPTransport;
    beforeEach(() => {
        http = new HTTPTransport();
    });

    afterEach(() => {
        sinon.restore();
    });
    it("GET запрос с данными должен вызывать метод XMLHttpRequest.prototype.open c query параметрами ", async () => {
        const stub = sinon.spy(XMLHttpRequest.prototype, "open");
        await http.get("/test", { data: { a: "1", b: "2 2" } });
        const expectedUrl = `${constants.HOST}/test?a=1&b=202`;
        expect(stub.calledWithMatch(METHODS.GET, expectedUrl)).to.be.true;
    });
    it("POST запрос с данными должен вызывать метод XMLHttpRequest.prototype.send c объектом data в параметрах ", async () => {
        const stubPost = sinon.spy(XMLHttpRequest.prototype, "send");
        await http.post("/test", { data: "data" });
        expect(stubPost.calledWithMatch("data")).to.be.true;
    });
    it("POST запрос с headers должен вызывать метод XMLHttpRequest.prototype.setRequestHeader c объектом headers в параметрах ", async () => {
        const stubPostHeader = sinon.spy(
            XMLHttpRequest.prototype,
            "setRequestHeader"
        );
        await http.post("/test", {
            headers: { "content-type": "application/json" },
        });
        expect(
            stubPostHeader.calledWithMatch("content-type", "application/json")
        ).to.be.true;
    });
    it("PUT запрос с данными должен вызывать метод XMLHttpRequest.prototype.send c объектом data в параметрах ", async () => {
        const stubPost = sinon.spy(XMLHttpRequest.prototype, "send");
        await http.put("/test", { data: "data" });
        expect(stubPost.calledWithMatch("data")).to.be.true;
    });
    it("PUT запрос с headers должен вызывать метод XMLHttpRequest.prototype.setRequestHeader c объектом headers в параметрах ", async () => {
        const stubPostHeader = sinon.spy(
            XMLHttpRequest.prototype,
            "setRequestHeader"
        );
        await http.put("/test", {
            headers: { "content-type": "application/json" },
        });
        expect(
            stubPostHeader.calledWithMatch("content-type", "application/json")
        ).to.be.true;
    });
    it("DELETE запрос с данными должен вызывать метод XMLHttpRequest.prototype.send c объектом data в параметрах ", async () => {
        const stubPost = sinon.spy(XMLHttpRequest.prototype, "send");
        await http.delete("/test", { data: "data" });
        expect(stubPost.calledWithMatch("data")).to.be.true;
    });
    it("DELETE запрос с headers должен вызывать метод XMLHttpRequest.prototype.setRequestHeader c объектом headers в параметрах ", async () => {
        const stubPostHeader = sinon.spy(
            XMLHttpRequest.prototype,
            "setRequestHeader"
        );
        await http.delete("/test", {
            headers: { "content-type": "application/json" },
        });
        expect(
            stubPostHeader.calledWithMatch("content-type", "application/json")
        ).to.be.true;
    });
});
