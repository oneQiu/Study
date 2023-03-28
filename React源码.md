# `React`源码

## 架构

- `scheduler`调度器：用来调度优先级不同的任务
- `renconciler`协调器：通过`Fiber`的递归来找出节点变化，同时打上`tag`
- `commit`渲染器：渲染变化的节点或节点属性

## `Fiber`

对于`JSX`的解析来说，最重要的莫过于`Fiber`节点的递归流程。`React Fiber`可以理解为内部实现的一套装填更新机制
，支持不同的任务级，可中断可恢复。

### 遍历方式

`Fiber`采用深度优先遍历，在其上包含了节点信息以外，还包含了`child sibling return`等节点信息，如果存在`child`
会继续往下遍历，如果不存在则遍历兄弟节点，直到为空，通过`return`节点返回父节点，依次直到回到`hostRoot`根节点。

```typescript
export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5;
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
export const ScopeComponent = 21;
export const OffscreenComponent = 22;
export const LegacyHiddenComponent = 23;
export const CacheComponent = 24;
export const TracingMarkerComponent = 25;
export const HostHoistable = 26;
export const HostSingleton = 27;
```

同时如果`JSX`中组件的`children`有且只有一个文本，则会被优化掉，不会创建`Fiber`节点。

### 初始化过程经历了什么？

#### `beginWork`

> 源码路径: `react-renconciler/src/ReactFiberBeginWork.js`

```typescript
type beginWork = (current: Fiber | null, workInProgress: Fiber, renderLanes: Lanes) => Fiber;
```

`current`: 当前节点信息，在初始化过程中为空，只会在挂载最初创建一个`hostRoot`根节点的时候存在，更新阶段一直存在。
所以可以根据`current !== null`来判断当前是处于`mount`还是`update`阶段。
`workInProgress`: 当前节点信息，在你执行更新或挂载时候的新节点信息，会用来对比`diff`变化。
`renderLanes`: 渲染通道，可以理解为优先级。
