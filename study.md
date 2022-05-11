
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

Array.prototype.toString()
const array1 = [1, 2, 'a', '1a'];
console.log(array1.toString());// expected output: "1,2,a,1a"
返回值
一个表示指定的数组及其元素的字符串。
描述
Array对象覆盖了Object的 toString 方法。对于数组对象，toString 方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素。
当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。
ECMAScript 5 semantics
从 JavaScript 1.8.5 (Firefox 4) 开始，和 ECMAScript 第5版语义（semantics）一致，toString() 方法是通用的，可被用于任何对象。将调用Object.prototype.toString()，并返回结果值。

Array.prototype.unshift()
unshift() 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。
arr.unshift(element1, ..., elementN)
参数列表
elementN
要添加到数组开头的元素或多个元素。
返回值
当一个对象调用该方法时，返回其 length 属性值。

描述
unshift 方法会在调用它的类数组对象的开始位置插入给定的参数。

unshift 特意被设计成具有通用性；这个方法能够通过 call 或 apply 方法作用于类数组对象上。不过对于没有 length 属性（代表从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。

注意, 如果传入多个参数，它们会被以块的形式插入到对象的开始位置，它们的顺序和被作为参数传入时的顺序一致。 于是，传入多个参数调用一次 unshift ，和传入一个参数调用多次 unshift (例如，循环调用)，它们将得到不同的结果。例如:

let arr = [4,5,6];
arr.unshift(1,2,3);
console.log(arr); // [1, 2, 3, 4, 5, 6]

arr = [4,5,6]; // 重置数组
arr.unshift(1);
arr.unshift(2);
arr.unshift(3);
console.log(arr); // [3, 2, 1, 4, 5, 6]

Array.prototype.values()
values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值



Object
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object



Object.prototype.constructor



Object.assign()
浅拷贝可枚举
Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。
String类型和 Symbol 类型的属性都会被拷贝。
在出现错误的情况下，例如，如果属性不可写，会引发TypeError，如果在引发错误之前添加了任何属性，则可以更改target对象。
备注： Object.assign 不会在那些source对象值为 null 或 undefined 的时候抛出错误。
继承属性和不可枚举属性是不能拷贝的


Object.create()

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请打开浏览器控制台以查看运行结果。）



Object.defineProperty()
https://zhuanlan.zhihu.com/p/127408589
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
该方法允许精确地添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，在枚举对象属性时会被枚举到（for...in 或 Object.keys 方法），可以改变这些属性的值，也可以删除这些属性。这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改（immutable）的。

对象里目前存在的属性描述符有两种主要形式：1数据描述符（描述属性） 和 2存取描述符（存取属性）。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由 getter 函数和 setter 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者。

这两种描述符都是对象。它们共享以下可选键值（默认值是指在使用 Object.defineProperty() 定义属性时的默认值）：

把configurable修改成false是单向操作，无法撤销！不可以configurable改成 false->true;
注意：即便属性是configurable:false，我们还是可以把writable和enumerable的状态由true改为false，但是无法由false改为true。

configurable 特性表示对象的属性是否可以被删除，以及除 value 和 writable 特性外的其他特性是否可以被修改。


Object.freeze()
浅冻结；不可新增、修改、删除属性
Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。
不可扩展、不可配置、不可写
被冻结对象自身的所有属性都不可能以任何方式被修改。任何修改尝试都会失败，无论是静默地还是通过抛出TypeError异常（最常见但不仅限于strict mode）。

数据属性的值不可更改，访问器属性（有getter和setter）也同样（但由于是函数调用，给人的错觉是还是可以修改这个属性）。如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象。数组作为一种对象，被冻结，其元素不能被修改。没有数组元素可以被添加或移除。

这个方法返回传递的对象，而不是创建一个被冻结的副本。
对于一个常量对象，整个引用图（直接和间接引用其他对象）只能引用不可变的冻结对象。冻结的对象被认为是不可变的，因为整个对象中的整个对象状态（对其他对象的值和引用）是固定的。注意，字符串，数字和布尔总是不可变的，而函数和数组是对象。

要使对象不可变，需要递归冻结每个类型为对象的属性（深冻结）。当你知道对象在引用图中不包含任何 环 (循环引用)时，将根据你的设计逐个使用该模式，否则将触发无限循环。对 deepFreeze()  的增强将是具有接收路径（例如Array）参数的内部函数，以便当对象进入不变时，可以递归地调用 deepFreeze() 。你仍然有冻结不应冻结的对象的风险，例如[window]。



// 使用Object.freeze是冻结一个对象最方便的方法.
var frozen = { 1: 81 };
Object.isFrozen(frozen) //=== false
Object.freeze(frozen);
Object.isFrozen(frozen) //=== true
// 一个冻结对象也是一个密封对象.
Object.isSealed(frozen) //=== true
// 当然,更是一个不可扩展的对象.
Object.isExtensible(frozen) //=== false



Object.getOwnPropertyDescriptor(obj, prop)
Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）



Object.getOwnPropertyDescriptors(obj)
Object.getOwnPropertyDescriptors() 方法用来获取一个对象的所有自身属性的描述符。

浅拷贝一个对象
Object.assign() 方法只能拷贝源对象的可枚举的自身属性，同时拷贝时无法拷贝属性的特性们，而且访问器属性会被转换成数据属性，也无法拷贝源对象的原型，该方法配合 Object.create() 方法可以实现上面说的这些。
Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);

创建子类
创建子类的典型方法是定义子类，将其原型设置为超类的实例，然后在该实例上定义属性。这么写很不优雅，特别是对于 getters 和 setter 而言。 相反，您可以使用此代码设置原型：
function superclass() {}
superclass.prototype = {
  // 在这里定义方法和属性
};
function subclass() {}
subclass.prototype = Object.create(superclass.prototype, Object.getOwnPropertyDescriptors({
  // 在这里定义方法和属性
}));


Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。


Object.getOwnPropertySymbols(obj)
Object.getOwnPropertySymbols() 方法返回一个给定对象自身的所有 Symbol 属性的数组。


Object.getPrototypeOf(object)
Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。



Object.prototype.hasOwnProperty()
obj.hasOwnProperty(prop)
hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
('toString' in Object)


Object.is()
Object.is() 方法判断两个值是否为同一个值。
Object.is() 方法判断两个值是否为同一个值，如果满足以下任意条件则两个值相等：

都是 undefined
都是 null
都是 true 或都是 false
都是相同长度、相同字符、按相同顺序排列的字符串
都是相同对象（意味着都是同一个对象的值引用）
都是数字且
都是 +0
都是 -0
都是 NaN
都是同一个值，非零且都不是 NaN
Object.is() 与 == 不同。== 运算符在判断相等前对两边的变量（如果它们不是同一类型）进行强制转换（这种行为将 "" == false 判断为 true），而 Object.is 不会强制转换两边的值。

Object.is() 与 === 也不相同。差别是它们对待有符号的零和 NaN 不同，例如，=== 运算符（也包括 == 运算符）将数字 -0 和 +0 视为相等，而将 Number.NaN 与 NaN 视为不相等。



Object.isExtensible()
Object.isExtensible() 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。
Object.isExtensible(obj)
// 新对象默认是可扩展的.
var empty = {};
Object.isExtensible(empty); // === true

// ...可以变的不可扩展.
Object.preventExtensions(empty);
Object.isExtensible(empty); // === false

// 密封对象是不可扩展的.
var sealed = Object.seal({});
Object.isExtensible(sealed); // === false

// 冻结对象也是不可扩展.
var frozen = Object.freeze({});
Object.isExtensible(frozen); // === false



Object.isFrozen()
一个对象是冻结的是指它不可扩展，所有属性都是不可配置的，且所有数据属性（即没有getter或setter组件的访问器的属性）都是不可写的。




```
