## React学习

### 基本概念

+ 设计模式
	- react是 **MVC**
	- vue是MVVM
+ 库和框架
	- library(库)：小而巧的是库，优点是便于从一个库切换到另一个库，代码几乎不会改变；
	- Framework(框架)：大而全的是框架，框架提供了一整套的解决方案；所以从一个框架切换到另一个框架相对较为困难；
	- 虽然react自称是库，但是根据以上概念，可以将其归类为框架
+ 模块化和组件化的区别
	- 模块化：从**代码**的角度分析，将可复用代码抽离为单个模块，便于开发和维护
	- 组件化：从**UI界面**的角度分析，将可复用的UI元素抽离为单独的组件

### React和Vue的对比

#### 设计思想

+ **MVC**和MVVM
+ 单向数据流和双向绑定(伪)

#### 组件化的实现方式

+ vue：
	- template   （结构）
	- script     （行为）
	- style	     （样式） 
+ React:
	- 并没有vue那样的模板文件
	- 一切以JS来表现

### 核心概念

#### 虚拟DOM

+ **DOM的本质是什么**： 浏览器中的概念，用JS对象(某个标签可以用document.getElementById获取并操作)来表现页面上的元素，并提供了DOM对象的API
+ **什么是React中的虚拟DOM**：框架中的对象，用JS对象模拟页面上的DOM和DOM嵌套
+ **为什么要实现虚拟DOM**：为了实现页面中，DOM元素的高效更新
+ **虚拟DOM对象**：
		<div id="myDiv" title="a-div" data-index="0">
			content
			<p id="myP">p-content<p>
		</div>
		var p = {
			tagName: 'p',
			attrs: {
				id: 'myP'
			},
			childrens: []
		}
		// 注意，div和P通过嵌套，虚拟DOM树就是通过对象的一层层嵌套形成
		var div = {
			tagName: 'div',
			attrs:{
				id: 'myDiv',
				title: 'a-div',
				data-index: '0'
			},
			children: [
				'content',
				p
			]
		}

#### Diff算法

![DOM树](https://ftp.bmp.ovh/imgs/2019/11/2034f7ddfac4543c.png)

**注：假设上图中每一个节点代表一个DOM元素，被同一个方框包起来的部分代表一个组件**
+ **tree diff**：
	- 新旧两棵DOM树，逐层对比的过程，就是Tree Diff;当整棵DOM树逐层对比完毕，则所有被按需更新的元素，必然能够找到
+ **component diff**
	- **在进行Tree Diff时**，每一层中，组件级的对比，叫做Component Diff
		1. 若对比前后，组件类型相同，则**暂时**认为此组件不需要被更新
		2. 若对比前后，组件类型不同，则需要移除旧组件，并追加到页面上
+ **element diff**
	- **在进行组件对比的时候**，如果两个组件类型相同，则需要进行元素级别的对比，这叫做Element Diff

	**(注意，以上的tree diff、component diff、element diff是递进的关系)**

### react基础

#### 在项目中使用react（无脚手架版）

1. 运行`cnpm i react react-dom -S`安装包
	- react： 专门用于创建组件和虚拟DOM，同时组件的生命周期都在这个包中
	- react-dom： 专门进行DOM操作，最主要的应用场景就是ReactDOM.render()
	
2. 在index.html中，创建容器：
		<div id="app"></div>
3. 导入包：
		import React form 'react'
		import ReactDom from 'react-dom'
4. 创建虚拟DOM元素：
		// 注意，其结构和前面的虚拟DOM对象结构非常类似，myh1其实就是一个虚拟DOM对象
		// 参数1：tagName
		// 参数2：attrs
		// 参数3及之后的参数：children
		const myh1 = React.createElement('h1',{title:'this is a title',id: 'myh1','react study'})
5. 渲染：
		ReactDom.render(myh1, document.getElementById('app'))

#### 创建组件的方式对比

> 注意：使用class关键字创建的组件，有自己的私有数据（this.state）和生命周期
> 注意：使用function创建的组件，只有props，没有自己的私有数据和生命周期

1. 用**构造函数**创建的组件：叫做**无状态组件**
2. 用**class关键字**创建的组件：叫做**有状态组件**
3. 两种组件的使用情况？
	- 如果一个组件需要有自己的私有数据，则推荐使用有状态组件
	- 一个组件不需要私有数据，则推荐无状态组件
	- React官方：无状态组件由于没有自己的state和生命周期函数，运行效率会比有状态组件稍高

> 两者本质区别： 有无state属性、有无生命周期函数

#### 生命周期

![生命周期](https://s2.ax1x.com/2019/11/12/MlzlFO.png)

> 具体可参考[React生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

需要注意的是，触发视图更新的一般只有三种情况：
1. 属性更新
2. setState
3. forceUpdate

+ 16.3以后的版本，getDerivedStateFromProps已能完全取代componentWillMount，需注意的是，**getDerivedStateFromProps是静态方法**，return一个新对象作为更新后的state
+ 在项目开发时，无论将redux作为props还是讲state作为子组件的props，当管理的数据改变时，传入的都是一个新的对象，这就造成了将此对象作为props的所有组件全部触发更新，无论此更新是不是该组件需要的。因此有了shouldComponentUpdate生命周期，用于控制该组件是否触发更新。
	- 在shouldComponentUpdate中判断属性的具体值是否改变，并return一个true或false
	- class继承PureComponent而非Component可自动进行是否需要触发更新的判断
