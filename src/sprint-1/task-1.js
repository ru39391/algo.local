const handleData = (data) => data.toString().trim().split(' ').map(Number);

const sliceArr = (arr, [start, end], isReversed = false) => {
    const array = [];

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if(typeof start === 'number' && typeof end === 'number') {
            if(i >= start && i < end) isReversed ? array.unshift(item) : array.push(item);
        } else {
            if(i >= start) isReversed ? array.unshift(item) : array.push(item);
        }
    }

    return array;
};

const setValuesData = (array) => {
    const arr = [];
    const values = [];

    for (let i = 0; i < array.length; i++) {
        const value = array[i];

        arr.push({value, defaultIdx: i});

        if(value === 0) values.push(i);
    }

    return { arr, values };
};

const handleValues = ({arr, values}) => {
    const array = [];

    for (let i = 0; i < arr.length; i++) {
        const { defaultIdx, value } = arr[i];

        if(value === 0 && values.indexOf(defaultIdx) !== values.length - 1) {
            array.push(
                sliceArr(arr, [defaultIdx + 1, values[values.indexOf(defaultIdx) + 1]])
            );
        }
    }

    return array;
};

const setIdx = (arr) => {
    const array = [];

    for (let i = 0; i < arr.length; i++) {
        array.push({ ...arr[i], idx: i + 1 });
    }

    return array;
};

const handleArray = (arr) => {
    const evenLengthValue = arr.length / 2;
    const oddLengthValue = (arr.length - 1) / 2;

    const array = arr.length % 2 === 0
        ? [
            setIdx(sliceArr(arr, [0, evenLengthValue])),
            setIdx(sliceArr(arr, [evenLengthValue], true))
        ]
        : [
            setIdx(sliceArr(arr, [0, oddLengthValue])),
            [{ ...arr[oddLengthValue], idx: oddLengthValue + 1 }],
            setIdx(sliceArr(arr, [oddLengthValue + 1], true))
        ]
    
    return array.flat();
};

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

    for (let i = 0; i < array.length; i++) {
        array[i] > 0 ? intValuesArr.push(array[i]) : valuesArr.push(array[i]);
    }

    if(valuesArr.length === array.length) {
        for (let i = 0; i < array.length; i++) {
            finalValues.push(0);
        }

        return joinArray(finalValues);
    }

    if(intValuesArr.length === 1) {
        for (let i = 0; i < array.length; i++) {
            finalValues.push(Boolean(array[i]) ? 1 : 0);
        }

        return joinArray(finalValues);
    }

    if(valuesArr.length === 1) {
        if(startIdx === 0) {
            for (let i = 0; i < array.length; i++) {
                finalValues.push(i);
            }
        }

        if(startIdx === endIdx) {
            for (let i = 0; i < array.length; i++) {
                finalValues.unshift(i);
            }
        }

        if(startIdx > 0 && startIdx < array[endIdx]) {
            for (let i = 0; i < array.length; i++) {
                if(i < startIdx) finalValues.unshift(i + 1);
            }

            finalValues.push(0);

            for (let i = 0; i < array.length; i++) {
                if(i >= startIdx + 1) finalValues.push(i - startIdx);
            }
        }

        return joinArray(finalValues);
    }

    const {arr, values} = setValuesData(array);

    for (let i = 0; i < arr.length; i++) {
        if(i < values[0]) {
            startValues.unshift(arr[i]);
        }
        
        if(i > values[values.length - 1]) {
            endValues.push(arr[i]);
        }
    }

    const handledValues = [
        setIdx(startValues),
        handleValues({arr, values}).map((item) => item.length === 1 ? setIdx(item) : handleArray(item)).flat(),
        setIdx(endValues)
    ].flat();

    for (let i = 0; i < arr.length; i++) {
        finalValues.push(
            arr[i].value > 0 ? handledValues.find(({ defaultIdx, value }) => defaultIdx === i && value === arr[i].value).idx : 0
        );
    }

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