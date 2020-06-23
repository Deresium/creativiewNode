import {getStringAmount} from "../sendgridCreatiview";

test('expect 0.50 to be 0.50', () =>{
    expect(getStringAmount(50)).toBe('0.50');
});

test('expect 100 to be 1.00', () =>{
    expect(getStringAmount(100)).toBe('1.00');
});

test('expect 12345 to be 123.45', () =>{
    expect(getStringAmount(12345)).toBe('123.45');
});

test('expect 75 to be 0.75', () =>{
    expect(getStringAmount(75)).toBe('0.75');
});