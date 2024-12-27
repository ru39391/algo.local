const handleData = (data) => data.toString().split(' ').map(Number);

const sliceArr = (arr, [start, end]) => typeof start === 'number' && typeof end === 'number' ? arr.slice(start, end) :  arr.slice(start);

const handleValues = ({ item, idx, array }) => {
    const { value, defaultIdx, data } = item;
    const arr = [
        ...sliceArr(array, [data[data.indexOf(defaultIdx) - 1] + 1 || 0, defaultIdx]),
        { value, defaultIdx, data },
        ...sliceArr(array, [defaultIdx + 1, data[data.indexOf(defaultIdx) + 1]])
    ];

    return arr.map(
        (item) => ({ ...item, ...( item.defaultIdx > idx ? { idx: item.defaultIdx - idx } : { idx: idx - item.defaultIdx } ) })
    );
};

const setValuesData = (arr) => arr.map(
    (value, index, array) => ({
        value,
        defaultIdx: index,
        ...( value === 0 && { data: array.reduce((acc, item, idx) => item === 0 ? [...acc, idx] : acc, []) } )
    })
);

const mergeArr = (arr) => {
    return arr.reduce(
        (acc, item, _, array) => {
            const items = array.filter(
                ({ defaultIdx, value }) => defaultIdx === item.defaultIdx && value === item.value
            ).map(
                ({ idx }) => idx
            );

            return acc.find(data => data.defaultIdx === item.defaultIdx)
                ? acc
                : [
                    ...acc,
                    {
                        ...item,
                        idx: items
                    }
                ]
        }, []
    );
};

const handleDataValues = (data) => {
    const arr = setValuesData(
        handleData(data)
    ).reduce(
        (acc, item, index, array) => item.data ? [...acc, ...handleValues({ item, idx: index, array })] : acc, []
    );

    return mergeArr(arr).map(({ idx }) => Math.min(...idx)).join(' ');
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