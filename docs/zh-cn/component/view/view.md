---
title: 图层管理器
---

# 图层管理器

初始化MapVGL容器对象，用来管理各可视化图层对象。

## 基础示例

### 普通示例
::: demo
examples/layer/BarLayer
:::

### Setup示例
::: demo
examples/layer/BarLayer-setup
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | mapvgl.View | View


## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例
