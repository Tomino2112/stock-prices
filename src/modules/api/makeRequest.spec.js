import makeRequest from "./makeRequest";
const fetchMock = require("fetch-mock");

const nextTick = () => new Promise(setImmediate);

describe("makeRequest", () => {
    let responseData;

    afterEach(() => {
        fetchMock.reset();
        responseData = undefined;
    });

    describe("success", () => {
        beforeEach(() => {
            fetchMock.get('*', () => responseData);
        });

        test("should resolve with response body", async () => {
            responseData = { hello: 'world' };
            const onResolve = jest.fn();

            makeRequest("/hello").then(onResolve);

            await nextTick();

            expect(onResolve).toHaveBeenCalledWith(responseData);
        });

        test("should resolve with empty object", async () => {
            responseData = 200;
            const onResolve = jest.fn();

            makeRequest("/hello").then(onResolve).catch(console.log);

            await nextTick();

            expect(onResolve).toHaveBeenCalledWith({});
        });
    });

    describe("failure", () => {
        beforeEach(() => {
            fetchMock.get('*', () => ({
                status: 400,
                body: responseData
            }));
        });

        test("should reject with status code and error from api", async () => {
            responseData = {
                error: { message: "Hello World" }
            };

            const onReject = jest.fn();

            makeRequest("/hello").catch(onReject);

            await nextTick();

            expect(onReject).toHaveBeenCalledWith({
                code: 400,
                message: responseData.error.message
            });
        });

        test("should reject with status codewhen no response body", async() => {
            const onReject = jest.fn();

            makeRequest("/hello").catch(onReject);

            await nextTick();

            expect(onReject).toHaveBeenCalledWith({
                code: 400,
                message: undefined,
            });
        });

        test("should reject with generic error when request failed", async () => {
            const onReject = jest.fn();

            fetchMock.reset();
            fetchMock.mock('*', Promise.reject("CORS error"));

            makeRequest("/hello").catch(onReject);

            await nextTick();

            expect(onReject).toHaveBeenCalledWith(
                expect.objectContaining({ code: 666, message: undefined })
            );
        });
    });
});