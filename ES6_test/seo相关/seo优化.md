# seo搜索引擎优化

## seo概述

### 什么是seo

seo即Search Engine Optimization(搜索引擎优化)，指在了解搜索引擎自然排名机制的基础上，对网站进行内部及外部的调整优化，改进网站在搜索引擎中关键词的自然排名，吸引更多用户和流量
### 搜索引擎工作原理

在搜索网站上进行关键词搜索时，搜索网站并不是临时对因特网上相关内容进行搜索，而是根据用户搜索内容，从索引数据库中找到相应的页面，并对搜索记过进行排序，并将结果展示给用户。
#### 搜索网站提前的工作
搜索网站给出的搜索结果是从其自己的数据库中获取的，搜索网站需要做的工作如下：
1. 从网上爬取大量网页信息
2. 将网页信息存入的**网页数据库**
3. 根据网页相关信息将其放入相应的**索引数据库**(如找到某医院网页，将其放入 疾病索引数据库)

#### 用户搜索时搜索网站的处理
1. 分析用户搜索的关键词
2. 根据关键词在对应的索引数据库中找到相关网页信息
3. 对找到的所有网页信息进行排序，将排序后的结果返回给用户

### seo小知识

#### 查看网站是否被搜索引擎收录
在搜索网站首页搜索： site:+域名，如百度首页搜索site:segmentfault.com，结果第一项可查看到站点信息即是被收录，可[查勘示例](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=site%3Asegmentfault.com&oq=site%253Asegmentfault.com&rsv_pq=8f5717f700051272&rsv_t=85c8VCn3jzp066CfUnrgg8N%2B8kOjMNWI%2FWMzY9hDB5Js2qaub%2BEmNVtF1aQ&rqlang=cn&rsv_enter=0&rsv_dl=tb)

#### seo和sem
sem(Search Engine Marketing)即花了钱的搜索词条，以百度为例，sem的搜索词条后面会带上“广告”字样。
seo优缺点：
1. 优点：价格低、排名稳定、无需担心恶意点击
2. 缺点：见效慢、关键词数量限制、排名永远在竞价排名之后

sem优缺点：
1. 优点：见效快、范围广、操作简单
2. 缺点：价格贵、排名波动大、恶意点击(sem点击量越大，需要付的钱越多)

#### seo查询工具
chinaz： [http://seo.chinaz.com/](http://seo.chinaz.com/)
爱站：[https://www.aizhan.com/cha/](https://www.aizhan.com/cha/)

## seo优化

### 关键词优化

#### 关键词的种类
关键词分为**核心关键词**和**长尾关键词**
核心关键词： 网站核心内容、主要服务等方面的特征词汇,核心关键词数量有限制
长尾关键词： 长尾关键词带来的流量较小，但其数量非常多，带来的流量总和可能大于核心关键词
例： 若给思否选取关键词，核心关键词可以是：segmentfault、思否等，长尾关键词可以是：国内的stackoverflow等。
#### 关键词挖掘工具
1. 百度推广——关键词规划师
2. 站长工具、爱站——关键词挖掘
3. 百度指数

### 网站相关优化
#### url优化与导航优化
1. url优化：url结构对于seo很重要，url层级太多不利于搜索网站对页面信息的爬取，在开发时应尽量将url层级控制在3层以内。
   （注：如链接[https://segmentfault.com/u/wswx](https://segmentfault.com/u/wswx)，url层级从域名后面的第一个斜杠开始计算，‘/u’是第一层，‘/wswx’为第二层，因此该页面层级为2）
2. 导航优化：搜索引擎不会识别导航栏中的图片和flash，因此导航最好采用文本链接，导航文本中包含网页关键词有助于提升网站排名。

#### TDK标签优化技巧
TDK分别指:Title、Description、Keywords，重要性权重为：Title > Description > Keywords。
1. `<title/>`优化：
    搜索引擎很大程度上是依靠title判断网站是关于什么内容的，TDK中重要程度最高。
    —— title应控制在80个字符以内
    —— 应包含本页面核心关键词
    —— title中包含关键词的数量应在5个以内
    —— title内容分隔尽量别用中文的逗号，用（|-,）较为合理
    
2. `<meta name="description" content="...">`优化：
    description是对关键词的重要补充，对关键词相关搜索有排名辅助的作用。
    —— 字符应控制在200个以内
    ——  description包含标题中的关键词有利于提升排名（如标题是“**思否**”，描述的content是“**思否**是......”）
    
3. `<meta name="keywords" content="...">`优化：
   keywords主要用于描述网站的工作内容，原本TDK的重要性排名是T > K > D，但现在许多网站都在堆砌keywords，导致目前许多搜索引擎都降低了keywords的权重。在seo中，搜索内容中本网站的keywords密度越高，排名越靠前。
   —— 字符应控制在100个以内
   —— 网站流量不是特别大时，keywords太多反而不利于排名，此时应将keywords数量控制在3个以下
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    