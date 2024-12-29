const handleData = (data) => data.toString().trim().split(' ').map(Number);

const handleResArray = (arr, isValues = false) => {
    const array = [];
    const evenLengthValue = arr.length / 2;

    arr.forEach((value, index) => {
        const isEvenArr = arr.length % 2 === 0 ? index < evenLengthValue : index <= evenLengthValue;
        const idx = isEvenArr ? index + 1 : index - 2 * (index - evenLengthValue);

        array.push(isValues ? idx : { [value]: idx })
    });

    return array;
};

const handleResult = (values, isComplex = false) => {
    if(values.length !== 2) {
        return [];
    }

    const array = [];
    const result = [];

    for(let i = values[0] + 1; i < values[1]; i++) {
        array.push(i);
    }

    const isEvenArr = array.length % 2 === 0;
    const evenLengthValue = array.length / 2;

    array.forEach((value, index) => {
        const isEvenItem =  isEvenArr ? index < evenLengthValue : index <= evenLengthValue;
        const idx = isEvenItem ? index + 1 : index - 2 * (index - evenLengthValue);

        result.push(isComplex ? { [value]: idx } : idx);
    });

    return isComplex ? [{[values[0]]: 0}, result, {[values[1]]: 0}].flat() : result;
}

const setLeftValues = (arr) => {
    const array = [];

    let i = 0;
    while(arr[i] > 0) {
        array.unshift(i + 1);
        i++;
    }

    return array;
}

const setRightValues = (arr) => {
    const array = [];

    let j = arr.length - 1;
    while(arr[j] > 0) {
        array.push(arr.length - j);
        j--;
    }

    return array;
}

const handleComplexValues = (complexValues, plainValues) => {
    if(!complexValues.length && !plainValues.length) {
        return [];
    }

    const array = complexValues.map(item => handleResult(item, true));

    const data = array.flat().reduce((acc, item) => {
        const [key, value] = Object.entries(item)[0];

        return acc[key] === undefined ? {...acc, [key]: value} : acc
    }, {});

    plainValues.forEach(item => {
        if(data[item] === undefined) data[item] = 0;
    })

    return Object.values(data);
}

const setValuesData = (array) => {
    const values = [];
    const leftValues = setLeftValues(array);
    const rightValues = setRightValues(array);

    array.forEach((value, index) => {
        if(value === 0) values.push(index);
    });

    const { complexValues, plainValues } = values.length > 2
        ? values.reduce(
            (acc, item, index, array) => array[index + 1] && array[index + 1] - item > 1
                ? {...acc, complexValues: [...acc.complexValues, [item, array[index + 1]]]}
                : {...acc, plainValues: [...acc.plainValues, item]},
            { complexValues: [], plainValues: [] }
        )
        : { complexValues: [], plainValues: [] };

    return values.length === 2
        ? [leftValues, 0, handleResult(values), 0, rightValues]
        : [leftValues, handleComplexValues(complexValues, plainValues), rightValues];
};

const handleDataValues = (data) => {
    const array = handleData(data);
    const startIdx = array.indexOf(0);
    const endIdx = array.length - 1;
    const valuesArr = array.filter(value => value === 0);
    const intValuesArr = array.filter(value => value > 0);

    if(valuesArr.length === array.length) {
        return array.map((_) => 0);
    }

    if(intValuesArr.length === 1) {
        return array.map(value => Boolean(value) ? 1 : 0);
    }

    if(valuesArr.length === 1) {
        if(startIdx === 0) {
            return [0, setRightValues(array)].flat();
        }

        if(startIdx === endIdx) {
            return [setLeftValues(array), 0].flat();
        }

        if(startIdx > 0 && startIdx < array[endIdx]) {
            return [setLeftValues(array), 0, setRightValues(array)].flat();
        }
    }

    return setValuesData(array).flat() || [];
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