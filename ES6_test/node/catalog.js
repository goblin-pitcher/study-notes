module.exports = {
	"前言": ["版本许可", "留言"],
	"ECMAScript 6简介": ["ECMAScript 和 JavaScript 的关系", "ES6 与 ECMAScript 2015 的关系", "语法提案的批准流程", "ECMAScript 的历史", "部署进度",
		"Babel 转码器", "Traceur 转码器"
	],
	"let 和 const 命令": ["let 命令", "块级作用域", "const 命令", "顶层对象的属性", "globalThis 对象"],
	"变量的解构赋值": ["数组的解构赋值", "对象的解构赋值", "字符串的解构赋值", "数值和布尔值的解构赋值", "函数参数的解构赋值", "圆括号问题", "用途"],
	"字符串的扩展": ["字符的 Unicode 表示法", "字符串的遍历器接口", "直接输入 U+2028 和 U+2029", "JSON.stringify() 的改造", "模板字符串", "实例：模板编译", "标签模板",
		"模板字符串的限制"
	],
	"字符串的新增方法": ["String.fromCodePoint()", "String.raw()", "实例方法：codePointAt()", "实例方法：normalize()",
		"实例方法：includes(), startsWith(), endsWith()", "实例方法：repeat()", "实例方法：padStart()，padEnd()",
		"实例方法：trimStart()，trimEnd()", "实例方法：matchAll()"
	],
	"正则的扩展": ["RegExp 构造函数", "字符串的正则方法", "u 修饰符", "RegExp.prototype.unicode 属性", "y 修饰符", "RegExp.prototype.sticky 属性",
		"RegExp.prototype.flags 属性", "s 修饰符：dotAll 模式", "后行断言", "Unicode 属性类", "具名组匹配", "String.prototype.matchAll"
	],
	"数值的扩展": ["二进制和八进制表示法", "Number.isFinite(), Number.isNaN()", "Number.parseInt(), Number.parseFloat()",
		"Number.isInteger()", "Number.EPSILON", "安全整数和 Number.isSafeInteger()", "Math 对象的扩展", "指数运算符"
	],
	"函数的扩展": ["函数参数的默认值", "rest 参数", "严格模式", "name 属性", "箭头函数", "尾调用优化", "函数参数的尾逗号", "Function.prototype.toString()",
		"catch 命令的参数省略"
	],
	"数组的扩展": ["扩展运算符", "Array.from()", "Array.of()", "数组实例的 copyWithin()", "数组实例的 find() 和 findIndex()", "数组实例的 fill()",
		"数组实例的 entries()，keys() 和 values()", "数组实例的 includes()", "数组实例的 flat()，flatMap()", "数组的空位"
	],
	"对象的扩展": ["属性的简洁表示法", "属性名表达式", "方法的 name 属性", "属性的可枚举性和遍历", "super 关键字", "对象的扩展运算符"],
	"对象的新增方法": ["Object.is()", "Object.assign()", "Object.getOwnPropertyDescriptors()",
		"<code>__proto__</code>属性，Object.setPrototypeOf()，Object.getPrototypeOf()",
		"Object.keys()，Object.values()，Object.entries()", "Object.fromEntries()"
	],
	"Symbol": ["概述", "Symbol.prototype.description", "作为属性名的 Symbol", "实例：消除魔术字符串", "属性名的遍历",
		"Symbol.for()，Symbol.keyFor()", "实例：模块的 Singleton 模式", "内置的 Symbol 值"
	],
	"Set 和 Map 数据结构": ["Set", "WeakSet", "Map", "WeakMap"],
	"Proxy": ["概述", "Proxy 实例的方法", "Proxy.revocable()", "this 问题", "实例：Web 服务的客户端"],
	"Reflect": ["概述", "静态方法", "实例：使用 Proxy 实现观察者模式"],
	"Promise 对象": ["Promise 的含义", "基本用法", "Promise.prototype.then()", "Promise.prototype.catch()",
		"Promise.prototype.finally()", "Promise.all()", "Promise.race()", "Promise.resolve()", "Promise.reject()", "应用",
		"Promise.try()"
	],
	"Iterator 和 for...of 循环": ["Iterator（遍历器）的概念", "默认 Iterator 接口", "调用 Iterator 接口的场合", "字符串的 Iterator 接口",
		"Iterator 接口与 Generator 函数", "遍历器对象的 return()，throw()", "for...of 循环"
	],
	"Generator 函数的语法": ["简介", "next 方法的参数", "for...of 循环", "Generator.prototype.throw()", "Generator.prototype.return()",
		"next()、throw()、return() 的共同点", "yield* 表达式", "作为对象属性的 Generator 函数", "Generator 函数的<code>this</code>", "含义", "应用"
	],
	"Generator 函数的异步应用": ["传统方法", "基本概念", "Generator 函数", "Thunk 函数", "co 模块"],
	"async 函数": ["含义", "基本用法", "语法", "async 函数的实现原理", "与其他异步处理方法的比较", "实例：按顺序完成异步操作", "顶层 await"],
	"Class 的基本语法": ["简介", "静态方法", "实例属性的新写法", "静态属性", "私有方法和私有属性", "new.target 属性"],
	"Class 的继承": ["简介", "Object.getPrototypeOf()", "super 关键字", "类的 prototype 属性和__proto__属性", "原生构造函数的继承", "Mixin 模式的实现"],
	"Module 的语法": ["概述", "严格模式", "export 命令", "import 命令", "模块的整体加载", "export default 命令", "export 与 import 的复合写法",
		"模块的继承", "跨模块常量", "import()"
	],
	"Module 的加载实现": ["浏览器加载", "ES6 模块与 CommonJS 模块的差异", "Node 加载", "循环加载", "ES6 模块的转码"],
	"编程风格": ["块级作用域", "字符串", "解构赋值", "对象", "数组", "函数", "Map 结构", "Class", "模块", "ESLint 的使用"],
	"读懂规格": ["概述", "术语", "抽象操作的标准流程", "相等运算符", "数组的空位", "数组的 map 方法"],
	"异步遍历器": ["同步遍历器的问题", "异步遍历的接口", "for await...of", "异步 Generator 函数", "yield* 语句"],
	"ArrayBuffer": ["ArrayBuffer 对象", "TypedArray 视图", "复合视图", "DataView 视图", "二进制数组的应用", "SharedArrayBuffer",
		"Atomics 对象"
	],
	"最新提案": ["do 表达式", "throw 表达式", "链判断运算符", "Null 判断运算符", "函数的部分执行", "管道运算符", "数值分隔符", "BigInt 数据类型", "Math.signbit()",
		"双冒号运算符", "Realm API"
	],
	"Decorator": ["类的装饰", "方法的装饰", "为什么装饰器不能用于函数？", "core-decorators.js", "使用装饰器实现自动发布事件", "Mixin", "Trait"],
	"参考链接": ["官方文件", "综合介绍", "let 和 const", "解构赋值", "字符串", "正则", "数值", "数组", "函数", "对象", "Symbol", "Set 和 Map",
		"Proxy 和 Reflect", "Promise 对象", "Iterator", "Generator", "异步操作和 Async 函数", "Class", "Decorator", "Module", "二进制数组",
		"SIMD", "工具"
	]
}
