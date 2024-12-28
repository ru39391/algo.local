const handleData = (data) => data.toString().trim().split(' ').map(Number);

const sliceArr = (arr, [start, end], isReversed = false) => {
    const array = [];

    arr.forEach((item, index) => {
        if(typeof start === 'number' && typeof end === 'number') {
            if(index >= start && index < end) {
                isReversed ? array.unshift(item) : array.push(item);
            }
        } else {
            if(index >= start) {
                isReversed ? array.unshift(item) : array.push(item);
            }
        }
    });

    return array;
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

const handleValues = ({arr, values}) => {
    const array = [];

    arr.forEach(({ defaultIdx, value }) => {
        if(value === 0 && values.indexOf(defaultIdx) !== values.length - 1) {
            array.push(
                sliceArr(arr, [defaultIdx + 1, values[values.indexOf(defaultIdx) + 1]])
            );
        }
    });

    return array;
};

const setIdx = (arr) => {
    const array = [];

    arr.forEach((item, index) => array.push({ ...item, idx: index + 1 }));

    return array;
};

const handleArray = (arr) => arr.length % 2 === 0
    ? [
        setIdx(sliceArr(arr, [0, arr.length / 2])),
        setIdx(sliceArr(arr, [arr.length / 2], true))
    ].flat()
    : [
        setIdx(sliceArr(arr, [0, (arr.length - 1) / 2])),
        [{ ...arr[(arr.length - 1) / 2], idx: (arr.length - 1) / 2 + 1 }],
        setIdx(sliceArr(arr, [(arr.length - 1) / 2 + 1], true))
    ].flat();

const joinArray = (arr) => arr.join(' ')

const handleDataValues = (data) => {
    const valuesArr = [];
    const intValuesArr = [];
    const finalValues = [];
    const startValues = [];
    const endValues = [];
    const array = handleData(data);
    const startIdx = array.indexOf(0);
    const endIdx = array.length - 1;

    array.forEach(value => value > 0 ? intValuesArr.push(value) : valuesArr.push(value))

    if(valuesArr.length === 1) {
        if(startIdx === 0) {
            array.forEach((_, index) => finalValues.push(index));

            return joinArray(finalValues);
        }

        if(startIdx === endIdx) {
            array.forEach((_, index) => finalValues.unshift(index));

            return joinArray(finalValues);
        }

        if(startIdx > 0 && startIdx < array[endIdx]) {
            array.forEach((_, index) => {
                if(index < startIdx) finalValues.unshift(index + 1);
            });

            finalValues.push(0);

            array.forEach((_, index) => {
                if(index >= startIdx + 1) finalValues.push(index - startIdx);
            });

            return joinArray(finalValues);
        }
    }

    if(intValuesArr.length === 1) {
        array.forEach(value => finalValues.push(Boolean(value) ? 1 : 0));

        return joinArray(finalValues);
    }

    if(valuesArr.length === array.length) {
        array.forEach(() => finalValues.push(0));

        return joinArray(finalValues);
    }

    const {arr, values} = setValuesData(array);

    arr.forEach((item, index) => {
        if(index < values[0]) startValues.unshift(item);
    });

    arr.forEach((item, index) => {
        if(index > values[values.length - 1]) endValues.push(item);
    });

    const handledValues = [
        setIdx(startValues),
        handleValues({arr, values}).map((item) => item.length === 1 ? setIdx(item) : handleArray(item)).flat(),
        setIdx(endValues)
    ].flat();

    arr.forEach((item, index) => {
        finalValues.push(
            item.value > 0 ? handledValues.flat().find(({ defaultIdx, value }) => defaultIdx === index && value === item.value).idx : 0
        );
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