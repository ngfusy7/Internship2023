// Document expect https://jestjs.io/docs/expect


test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  // expect(value).toBe(0.3); 
  // expect(value).toEqual(0.3); 
  expect(value).toBeCloseTo(0.3); // This works.
});


test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});


test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});

const fruits = ['banana', 'kiwi', 'strawberry']
const sameFruits = ['banana', 'kiwi', 'strawberry']
expect(fruits).toEqual(sameFruits)
// // Oops error! They don't have the same reference
// expect(fruits).toBe(sameFruits)

const event = {
  title: 'My super event',
  description: 'Join me in this event!',
}

expect({ ...event, city: 'London' }).toEqual({
  title: 'My super event',
  description: 'Join me in this event!',
  city: 'London',
})