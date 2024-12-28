const handleData = (data) => data.toString().trim().split(' ').map(Number);

const isEvenArr = ({ arr, index, evenLengthValue }) => arr.length % 2 === 0 ? index < evenLengthValue : index <= evenLengthValue;

const handleResArray = (arr, isValues = false) => {
    const array = [];
    const evenLengthValue = arr.length / 2;

    arr.forEach((value, index) => {
        const idx = isEvenArr({ arr, index, evenLengthValue }) ? index + 1 : index - 2 * (index - evenLengthValue);

        array.push(isValues ? idx : { [value]: idx })
    });

    return array;
};

const handleResult = (values, isComplex = false) => {
    if(values.length !== 2) {
        return [];
    }

    const array = [];

    for(let i = values[0] + 1; i < values[1]; i++) {
        array.push(i);
    }

    return isComplex ? [{[values[0]]: 0}, ...handleResArray(array), {[values[1]]: 0}] : handleResArray(array, true);
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
    if(!complexValues) {
        return [];
    }

    const data = {};
    const array = [];

    for(let i = 0; i < complexValues.length; i++) {
        array.push(handleResult(complexValues[i], true));
    }

    // array.flat().reduce((acc, item) => acc[Object.keys(item)[0]] === undefined ? {...acc, [Object.keys(item)[0]]: Object.values(item)[0]} : acc, {});
    for(let j = 0; j < array.flat().length; j++) {
        const [key, value] = Object.entries(array.flat()[j])[0];

        if(data[key] === undefined) data[key] = value;
    }

    for(let k = 0; k < plainValues.length; k++) {
        if(data[plainValues[k]] === undefined) data[plainValues[k]] = 0;
    }

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
        : { complexValues: null, plainValues: null };

    return values.length === 2
        ? [leftValues, 0, handleResult(values), 0, rightValues].flat()
        : [leftValues, handleComplexValues(complexValues, plainValues), rightValues].flat();
};

const joinArray = (arr) => arr.join(' ');

const setIdxArr = (arr, isIncreased = false) => arr.map((_, index) => isIncreased ? index + 1 : index);

const handleDataValues = (data) => {
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
            return joinArray([setLeftValues(array), 0, setRightValues(array)].flat());
        }
    }

    return joinArray(setValuesData(array) || null);
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