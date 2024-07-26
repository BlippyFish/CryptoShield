

const fizzbuzz = num => {
    let newArr = [];

    for (let i = 1; i <= num; i++) {
        let newStr = '';

        if (i % 3 === 0) newStr += 'fizz';
        if (i % 5 === 0) newStr += 'buzz';

        newArr.push(newStr || i)
    };
    return newArr;
};








export default fizzbuzz;
