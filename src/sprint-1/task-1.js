const handleData = (arr) => ({
    arrLength: Number(arr[0].toString().trim()),
    array: arr[1].toString().trim().split(' ').map(Number)
});

const searchValue = ({array, targetValue, isValue, length}, key = 'value') => {
    let startIdx = 0;
    let endIdx = length - 1;
    let idx = -1;

    while(startIdx <= endIdx) {
        const mdIdx = Math.floor((startIdx + endIdx) / 2);

        if(array[mdIdx][key] === targetValue) {
            idx = mdIdx;

            if(isValue) {
                endIdx = mdIdx - 1;
            } else {
                startIdx = mdIdx + 1;
            }
        } else if(array[mdIdx][key] < targetValue) {
            startIdx = mdIdx + 1;
        } else {
            endIdx = mdIdx - 1;
        }
    }

    return idx;
};

const sortArray = (arr) => {
    const array = arr.map((value, index) => ({ index, value }));
  
    return array.sort((a, b) => {
        const nameA = a.value;
        const nameB = b.value;

        if(nameA < nameB) {
            return -1;
        }
        if(nameA > nameB) {
            return 1;
        }
        return 0;
    });
};

const searchTargetValue = (arr, length) => {
    const result = [];
    const key = 'value';
    const array = sortArray(arr);
    const idx = searchValue({
        array,
        targetValue: 0,
        isValue: true,
        length
    });

    if(idx === -1) {
        return [];
    }

    let i = idx;
    
    while(i !== -1 && array[i] !== undefined && array[i][key] === 0) {
        const [index] = Object.entries(array[i])[0];
        result.push(array[i][index]);
        i++;
    }
    
    return result;
};

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

const setValuesData = (array, values) => {
    const leftValues = setLeftValues(array);
    const rightValues = setRightValues(array);

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
        : [leftValues, handleComplexValues(complexValues, plainValues), rightValues]
};

const handleDataValues = (lines) => {
    const { array, arrLength } = handleData(lines);
    const startIdx = array.indexOf(0);
    const endIdx = array.length - 1;
    const valuesArr = searchTargetValue(array, arrLength);
    const intValuesLength = arrLength - valuesArr.length;

    if(valuesArr.length === array.length) {
        return array.map((_) => 0);
    }

    if(intValuesLength === 1) {
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

    return setValuesData(array, valuesArr).flat() || [];
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