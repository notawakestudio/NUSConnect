import "@testing-library/jest-dom";

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

//https://medium.com/@arivu_a/how-to-mock-functions-globally-in-jest-f267fedf7683
const mockFetchPromise = Promise.resolve({
    json: () => Promise.resolve({}),
});
global.fetch = jest.fn(() => mockFetchPromise);