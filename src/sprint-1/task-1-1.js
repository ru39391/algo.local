const handleData = (data) => data.toString().trim().split(' ').map(Number);

const sliceArr = (arr, [start, end], isReversed = false) => {
    const array = typeof start === 'number' && typeof end === 'number' ? arr.slice(start, end) :  arr.slice(start);

    return isReversed ? array.reverse() : array;
};

const setValuesData = (array) => {
    const arr = [];
    const values = [];

    array.forEach((value, index) => {
        arr.push({value, defaultIdx: index});

        if(value === 0) values.push(index);
    });

    return { arr, values };
};

const setIdx = (arr) => arr.map((data, index) => ({ [data.defaultIdx]: index + 1 }));

const handleValues = ({arr, values}) => arr.reduce(
    (acc, { defaultIdx, value }) => value === 0 && values.indexOf(defaultIdx) !== values.length - 1
        ? [...acc, sliceArr(arr, [defaultIdx + 1, values[values.indexOf(defaultIdx) + 1]])]
        : acc, []
    ).filter(item => item.length);

const handleArray = (arr) => {
    const evenLengthValue = arr.length / 2;
    const oddLengthValue = (arr.length - 1) / 2;

    return arr.length % 2 === 0
        ? [
            setIdx(sliceArr(arr, [0, evenLengthValue])),
            setIdx(sliceArr(arr, [evenLengthValue], true))
        ].flat()
        : [
            setIdx(sliceArr(arr, [0, oddLengthValue])),
            { [arr[oddLengthValue].defaultIdx]: oddLengthValue + 1 },
            setIdx(sliceArr(arr, [oddLengthValue + 1], true))
        ].flat();
};

const joinArray = (arr) => arr.join(' ');

const setIdxArr = (arr, isIncreased = false) => arr.map((_, index) => isIncreased ? index + 1 : index);

const handleDataValues = (data) => {
    const finalValues = [];
    const array = handleData(data);
    const startIdx = array.indexOf(0);
    const endIdx = array.length - 1;
    const valuesArr = array.filter(value => value === 0);
    const intValuesArr = array.filter(value => value > 0);

    if(valuesArr.length === array.length) {
        return joinArray(array.map((_) => 0));
    }

    if(intValuesArr.length === 1) {
        return joinArray(array.map(value => Boolean(value) ? 1 : 0));
    }

    if(valuesArr.length === 1) {
        if(startIdx === 0) {
            return joinArray(setIdxArr(array));
        }

        if(startIdx === endIdx) {
            return joinArray(setIdxArr(array).reverse());
        }

        if(startIdx > 0 && startIdx < array[endIdx]) {
            return joinArray([
                ...setIdxArr(sliceArr(array, [0, startIdx]), true).reverse(),
                0,
                ...setIdxArr(sliceArr(array, [startIdx + 1]), true)
            ]);
        }
    }

    const {arr, values} = setValuesData(array);
    const handledValues = handleValues({arr, values})
        .map((item) => item.length === 1 ? { [item[0].defaultIdx]: 1 } : handleArray(item))
        .flat()
        .reduce((acc, item) => ({...acc, ...item}), {});

    arr.forEach((_, index) => {
        if(index < values[0]) {
            finalValues[index] = values[0] - index;
        } else if (index > values[values.length - 1]) {
            finalValues[index] = index - values[values.length - 1];
        } else if (values.includes(index)) {
            finalValues[index] = 0;
        } else {
            finalValues[index] = handledValues[index];
        }
    });

    return joinArray(finalValues);
};

export default handleDataValues;

/*
A. Ближайший ноль

Node.js 14.15.5
Ограничение времени 1.6 секунд
Ограничение памяти 256Mb

Тимофей ищет место, чтобы построить себе дом. Улица, на которой он хочет жить, имеет длину n, то есть состоит из n одинаковых идущих подряд участков. Каждый участок либо пустой, либо на нём уже построен дом.

Общительный Тимофей не хочет жить далеко от других людей на этой улице. Поэтому ему важно для каждого участка знать расстояние до ближайшего пустого участка. Если участок пустой, эта величина будет равна нулю — расстояние до самого себя.

Помогите Тимофею посчитать искомые расстояния. Для этого у вас есть карта улицы. Дома в городе Тимофея нумеровались в том порядке, в котором строились, поэтому их номера на карте никак не упорядочены. Пустые участки обозначены нулями.
Формат ввода

В первой строке дана длина улицы —– n (1 ≤ n ≤ 106). В следующей строке записаны n целых неотрицательных чисел — номера домов и обозначения пустых участков на карте (нули). Гарантируется, что в последовательности есть хотя бы один ноль. Номера домов (положительные числа) уникальны и не превосходят 109.
Формат вывода

Для каждого из участков выведите расстояние до ближайшего нуля. Числа выводите в одну строку, разделяя их пробелами.
*/