
```javascript
1. 不借助bind、call、apply，手写实现
    function bindThis(f, oTarget) {
    const fKey = Symbol('fKey');
    oTarget[fKey] = f;
    return (...rest) => {
        const result = oTarget[fKey](...rest);
        Reflect.deleteProperty(oTarget, fKey);
        return result;
    };
    }
    function bindThis(f, oTarget) {
    return function(...args){//返回一个函数--封装；。。。arg用于将数据都接收到数组args中
        oTarget.f=f;//利用对象的方法中的this指向对象原理，将f中的this指向对象
        return oTarget.f(...args);//函数的最终结果返回函数指向结果。。。args将参数展开传入
    }
    }



2. 时间格式化输出
    function formatDate(date, format) {
        let addZero = function (data) {
            if (data < 10) {
                return '0' + data
            }
            return data
        }
        let obj = {
            'yyyy': date.getFullYear(),
            'yy': date.getFullYear() % 100,
            'MM': addZero(date.getMonth() + 1),
            'M': date.getMonth() + 1,
            'dd': addZero(date.getDate()),
            'd': date.getDate(),
            'HH': addZero(date.getHours()),
            'H': date.getHours(),
            'hh': addZero(date.getHours() % 12),
            'h': date.getHours() % 12,
            'mm': addZero(date.getMinutes()),
            'm': date.getMinutes(),
            'ss': addZero(date.getSeconds()),
            's': date.getSeconds(),
            'w': function () {
                let arr = ['日', '一', '二', '三', '四', '五', '六']
                return arr[date.getDay()]
            }()
        }
        console.log('format', format)
        console.log('obj', obj)
        for (let i in obj) {
        console.log('i', i)
        console.log('obj[i]', obj[i])
            format = format.replace(i, obj[i])
        }
        return format
    }


3. 颜色字符串转换
如 rgb(255, 255, 255) 转为 #ffffff
方法一：

% 16 求余再求余
253 % 16 = 13
253 - 13 =240
240 / 16 = 15

方法二
Number(255).toString(16)

4. 简易深拷贝

const _sampleDeepClone = target => {
  // base case
    if (target == null || typeof target !== 'object') {
        return target;
    }
    // tyoeof null = object
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            if (target[key] && typeof target[key] == 'object') {
              // 递归
                cloneTarget[key] = _sampleDeepClone(target[key]);
            } else {
                // 基本数据类型
                cloneTarget[key] = target[key];
            }
        }
    }
    return cloneTarget;
};


Array
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array


Array.prototype.find()

在第一次调用 callback函数时会确定元素的索引范围，因此在 find方法开始执行之后添加到数组的新元素将不会被 callback函数访问到。如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。被删除的元素仍旧会被访问到，但是其值已经是undefined了。


Array.prototype.findIndex()
findIndex不会修改所调用的数组。
在第一次调用callback函数时会确定元素的索引范围，因此在findIndex方法开始执行之后添加到数组的新元素将不会被callback函数访问到。如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。被删除的元素仍然会被访问到。


Array.prototype.flat()
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? this.deepFlatten(v) : v)))    


Array.prototype.flatMap()

Array.prototype.forEach()
arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
forEach() 方法按升序为数组中含有效值的每一项执行一次 callback 函数，那些已删除或者未初始化的项将被跳过（例如在稀疏数组上）。
如果 thisArg 参数有值，则每次 callback 函数被调用时，this 都会指向 thisArg 参数。如果省略了 thisArg 参数，或者其值为 null 或 undefined，this 则指向全局对象。按照函数观察到 this 的常用规则，callback 函数最终可观察到 this 值。
forEach() 遍历的范围在第一次调用 callback 前就会确定。调用 forEach 后添加到数组中的项不会被 callback 访问到。如果已经存在的值被改变，则传递给 callback 的值是 forEach() 遍历到他们那一刻的值。已删除的项不会被遍历到。如果已访问的元素在迭代时被删除了（例如使用 shift()），之后的元素将被跳过——参见下面的示例。

forEach() 为每个数组元素执行一次 callback 函数；与 map() 或者 reduce() 不同的是，它总是返回 undefined 值，并且不可链式调用。其典型用例是在一个调用链的最后执行副作用（side effects，函数式编程上，指函数进行 返回结果值 以外的操作）。

forEach() 被调用时，不会改变原数组，也就是调用它的数组（尽管 callback 函数在被调用时可能会改变原数组）。（译注：此处说法可能不够明确，具体可参考EMCA语言规范：'forEach does not directly mutate the object on which it is called but the object may be mutated by the calls to callbackfn.'，即 forEach 不会直接改变调用它的对象，但是那个对象可能会被 callback 函数改变。）
除了抛出异常以外，没有办法中止或跳出 forEach() 循环。
改变arrary.length会影响 遍历



Array.prototype.join()
arr.join([separator])
separator 可选
指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果缺省该值，数组元素用逗号（,）分隔。如果separator是空字符串("")，则所有元素之间都没有任何字符。


Array.prototype.keys()

Array.prototype.lastIndexOf()






Array.prototype.map()
不能中断或者跳出循环
map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
map 方法会给原数组中的每个元素都按顺序调用一次 callback 函数。callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。 callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。

因为map生成一个新数组，当你不打算使用返回的新数组却使用map是违背设计初衷的，请用forEach或者for-of替代。你不该使用map: A)你不打算使用返回的新数组，或/且 B) 你没有从回调函数中返回值。

callback 函数会被自动传入三个参数：数组元素，元素索引，原数组本身。

如果 thisArg 参数提供给map，则会被用作回调函数的this值。否则 undefined 会被用作回调函数的this值。this的值最终相对于callback函数的可观察性是依据the usual rules for determining the this seen by a function决定的

map 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）

map 方法处理数组元素的范围是在 callback 方法第一次调用之前就已经确定了。调用map方法之后追加的数组元素不会被callback访问。如果存在的数组元素改变了，那么传给callback的值是map访问该元素时的值。在map函数调用后但在访问该元素前，该元素被删除的话，则无法被访问到。

根据规范中定义的算法，如果被map调用的数组是离散的，新数组将也是离散的保持相同的索引为空。




Array.of()
Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。


Array.prototype.pop()
pop() 方法从数组中删除最后一个元素，并返回该元素的值。此方法会更改数组的长度。
pop 方法从一个数组中删除并返回最后一个元素。

pop 方法有意具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。pop 方法根据 length 属性来确定最后一个元素的位置。如果不包含 length 属性或 length 属性不能被转成一个数值，会将 length 置为 0，并返回 undefined。

如果你在一个空数组上调用 pop()，它将返回 undefined。


Array.prototype.push()
push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
push 方法具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。

唯一的原生类数组（array-like）对象是 Strings，尽管如此，它们并不适用该方法，因为字符串是不可改变的。

Array.prototype.reduce()
注意：index是currentItem
reduce() 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被作为初始值 initialValue，迭代器将从第二个元素开始执行（索引为 1 而不是 0）。
callbackfn 应是一个接受四个参数的函数，reduce 对于数组中第一个元素之后的每一个元素，按升序各调用一次回调函数。

callbackfn 被调用时会传入四个参数：

previousValue（前一次调用 callbackfn 得到的返回值）
currentValue（数组中正在处理的元素）
currentIndex（数组中正在处理的元素的索引）
被遍历的对象
回调函数第一次执行时，previousValue 和 currentValue 的取值有两种情况：

如果调用 reduce() 时提供了 initialValue，previousValue 取值则为 initialValue，currentValue 则取数组中的第一个值。
如果没有提供 initialValue，那么 previousValue 取数组中的第一个值，currentValue 取数组中的第二个值。
如果数组为空且未指定初始值 initialValue，则会抛出 TypeError。

reduce 不会直接改变调用它的对象，但对象可被调用的 callbackfn 所改变。

遍历的元素范围是在第一次调用 callbackfn 之前确定的。所以即使有元素在调用开始后被追加到数组中，这些元素也不会被 callbackfn 访问。如果数组现有的元素发生了变化，传递给 callbackfn 的值将会是元素被 reduce 访问时的值（即发生变化后的值）；在调用 reduce 开始后，尚未被访问的元素若被删除，则其将不会被 reduce 访问。




reduceRight() 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
注意：index是currentItem
reduceRight 为数组中每个元素调用一次 callback 回调函数，但是数组中被删除的索引或从未被赋值的索引会跳过。回调函数接受四个参数：初始值（或上次调用回调的返回值）、当前元素值、当前索引，以及调用迭代的当前数组。
reduceRight 为数组中每个元素调用一次 callback 回调函数，但是数组中被删除的索引或从未被赋值的索引会跳过。回调函数接受四个参数：初始值（或上次调用回调的返回值）、当前元素值、当前索引，以及调用迭代的当前数组。

可以像下面这样调用 reduceRight 的回调函数 callback：

array.reduceRight(function(accumulator, currentValue, index, array) {
  // ...
});
Copy to Clipboard
首次调用回调函数时，accumulator 和 currentValue 的可能取值情况有两种：

如果在调用 reduceRight 时提供了 initialValue 参数，则 accumulator 等于 initialValue，currentValue 等于数组中的最后一个元素。
如果没有提供 initialValue 参数，则 accumulator 等于数组最后一个元素， currentValue 等于数组中倒数第二个元素。
如果数组为空，但提供了 initialValue 参数，或如果数组中只有一个元素，且没有提供 initialValue 参数，将会直接返回 initialValue 参数或数组中的那一个元素。这两种情况下，都不会调用 callback 函数。

如果数组为空，且没有提供 initialValue 参数，则会抛出一个 TypeError 错误。

Array.prototype.reverse()
改变原数组。
reverse() 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。
reverse 方法颠倒数组中元素的位置，改变了数组，并返回该数组的引用。
reverse方法是特意类化的；此方法可被 called 或 applied于类似数组对象。对象如果不包含反映一系列连续的、基于零的数值属性中的最后一个长度的属性，则该对象可能不会以任何有意义的方式运行。


Array.prototype.shift()
shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
返回值：从数组中删除的元素; 如果数组为空则返回undefined 。 
shift 方法移除索引为 0 的元素(即第一个元素)，并返回被移除的元素，其他元素的索引值随之减 1。如果 length 属性的值为 0 (长度为 0)，则返回 undefined。
shift 方法并不局限于数组：这个方法能够通过 call 或 apply 方法作用于类似数组的对象上。但是对于没有 length 属性（从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。
Array.prototype.pop() 有着和 shift相似的行为, 但是是作用在数组的最后一个元素上的。


Array.prototype.slice()
slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
slice 不会修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：

如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。
如果向两个数组任一中添加了新元素，则另一个不会受到影响。


Array.prototype.splice()
改变原数组。
splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
语法
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
参数
start​
指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。
deleteCount 可选
整数，表示要移除的数组元素的个数。如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。
item1, item2, ... 可选
要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
返回值
由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。
描述
如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。



Array.prototype.some()
Try it
some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
数组中有至少一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false。

描述
some() 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some() 将会立即返回 true。否则，some() 返回 false。callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。

callback 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。

如果一个thisArg参数提供给some()，它将被用作调用的 callback的 this 值。否则， 它的 this value将是 undefined。this的值最终通过callback来观察，根据 the usual rules for determining the this seen by a function的this判定规则来确定。

some() 被调用时不会改变数组。

some() 遍历的元素的范围在第一次调用 callback. 前就已经确定了。在调用 some() 后被添加到数组中的值不会被 callback 访问到。如果数组中存在且还未被访问到的元素被 callback 改变了，则其传递给 callback 的值是 some() 访问到它那一刻的值。已经被删除的元素不会被访问到。

Array.prototype.sort()
改变原数组。
sort() 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时

let arr = [2,1,6,3,7,8,2,6,735,5,4]
arr.sort((a,b) => a - b); // [1, 2, 2, 3, 4, 5, 6, 6, 7, 8, 735]
如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；// 升序 [1,2,3,4]
如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。// 降序  [4,3,2,1]



Array.prototype.toLocaleString()
toLocaleString() 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。










```
