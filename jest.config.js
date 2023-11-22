module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ['/node_modules/', '/tests/', '/spec/'],
    coverageReporters: ['text', 'lcov', 'html']
}