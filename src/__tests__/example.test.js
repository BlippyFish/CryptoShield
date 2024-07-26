import fizzbuzz from "../example ";

// Step 1: npm install --save-dev jest

// Step 2: package.json --> scripts --> "test": "jest"

// Step 3: create test file --> ex. <fileName>.test.js  (same name as file you're testing + <test>.)


describe('fizzbuzz test', () => {
    const arr = fizzbuzz(31);

    it('should work for non-multiples of 3 and 5', () => {
      expect(arr.length).toBe(31);

      expect(arr[0]).toBe(1);
      expect(arr[6]).toBe(7);
      expect(arr[10]).toBe(11);
    });

    it('should work for multiples of 3', () => {
      expect(arr[2]).toBe('fizz');
      expect(arr[5]).toBe('fizz');
      expect(arr[8]).toBe('fizz');
    });

    it('should work for multiples of 5', () => {
      expect(arr[4]).toBe('buzz');
      expect(arr[9]).toBe('buzz');
    });

    it('should work for multiples of 3 and 5', () => {
      expect(arr[14]).toBe('fizzbuzz');
      expect(arr[29]).toBe('fizzbuzz');
    });
  });
