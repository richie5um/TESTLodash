import * as _ from 'lodash';

describe('lodash test', () => {
    beforeAll(() => {
        this.users = [{
                name: 'Alex',
                age: 30,
                isAdmin: false
            }, {
                name: 'Bob',
                age: 20,
                isAdmin: true
            }, {
                name: 'Mary',
                age: 25,
                isAdmin: false,
                address: '1 Main Street'
            }];
    });

    describe('matches', () => {
        it('string', () => {
            let f = _.matches('hello');
            expect(f('hello')).toBe(true);
            expect(f('world')).toBe(false);
        });

        it('object', () => {
            let f = _.matches([{a:1, b:2}]);
            expect(f([{a:1, b:2}])).toBe(true);
            expect(f([{a:1, b:3}])).toBe(false);
        });
    });

    describe('matches property', () => {
        it('object', () => {
            let f = _.matchesProperty('name', 'Alex');
            expect(f({ name: 'Alex' })).toBe(true);
            expect(f({ name: 'Alex1' })).toBe(false);
            expect(f({ name1: 'Alex' })).toBe(false);
        });
    });

    describe('property', () => {
        it('value', () => {
            let f = _.property('name');
            expect(f({ name: 'Alex' })).toEqual('Alex');
        });
    });

    describe('find', () => {
        it('number', () => {
            let result = _.find(this.users, (user) => {
                return user.age > 20;
            });
            console.log(result);
            expect(result).toEqual({ name: 'Alex', age: 30, isAdmin: false });

            result = _.find(this.users, 'address');
            expect(result).toEqual({ name: 'Mary', age: 25, isAdmin: false, address: '1 Main Street' });

            result = _.find(this.users, (user) => {
                return !user.isAdmin;
            });
            expect(result).toEqual({ name: 'Alex', age: 30, isAdmin: false });
        });
    });

    describe('map', () => {
        it('array', () => {
            let result = _.map([1, 2, 3], (value) => {
                return value * 3;
            });
            expect(result).toEqual([3, 6, 9]);
        });

        it('match object - uses _.matches', () => {
            let result = _.map(this.users, { name: 'Alex' });
            expect(result).toEqual([true, false, false]);
        });

        it('match object - uses _.matchesProperty', () => {
            let result = _.map(this.users, ['name', 'Alex']);
            expect(result).toEqual([true, false, false]);
        });

        it('match object - uses _.property', () => {
            let result = _.map(this.users, 'name');
            expect(result).toEqual(['Alex', 'Bob', 'Mary']);
        });

        it('match function object', () => {
            var obj = {
                value: 10,
                // Note, this has to be a 'function' not 'arrow function' as otherwise 'this' is set incorrectly.
                add: function(n) {
                    return this.value + n;
                }
            };

            let result = _.map([1,2,3], _.bind(obj.add, obj));
            expect(result).toEqual([11,12,13]);
        });
    });
});