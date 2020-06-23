"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendgridCreatiview_1 = require("../sendgridCreatiview");
test('expect 0.50 to be 0.50', () => {
    expect(sendgridCreatiview_1.getStringAmount(50)).toBe('0.50');
});
test('expect 100 to be 1.00', () => {
    expect(sendgridCreatiview_1.getStringAmount(100)).toBe('1.00');
});
test('expect 12345 to be 123.45', () => {
    expect(sendgridCreatiview_1.getStringAmount(12345)).toBe('123.45');
});
test('expect 75 to be 0.75', () => {
    expect(sendgridCreatiview_1.getStringAmount(75)).toBe('0.75');
});
