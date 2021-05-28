### @violets/core
#### 1.类
#### Guid
Guid 提供uuid 生成功能
|      名称      |   类型   |      说明      |
| :------------: | :------: | :------------: |
| Guid.NewGuid() | 静态方法 | 创建Guid字符串 |
|   Guid.Empty   | 静态属性 |   返回空Guid   |

使用举例:

```typescript
import {Guid} from "@violet/core";

let guid= Guid.NewGuid();
let empty= Guid.Empty; 
//00000000-0000-0000-0000-000000000000
```

#### Task
Task 提供对Promise 的某些封装

|       方法名       |                      参数                       |     返回值     |             说明             |
| :----------------: | :---------------------------------------------: | :------------: | :--------------------------: |
|     Task.Delay     |        millisecondDelay:number 等待时长         |    Promise     | 等待一段时间,替代 setTimeout |
|     Task.Delay     | millisecondDelay:等待时长,cancelToken:取消token |    Promise     | 等待一段时间,替代 setTimeout |
| Task.FromResult<T> |                 data:T 返回数据                 |   Promise<T>   |      从结果返回一个任务      |
| Task.CompletedTask |                       无                        |    Promise     |     返回一个R状态Promise     |
|      Task.Run      |                 Action:()=>void                 |    Promise     |        开启一个新任务        |
|    Task.Run<T>     |                  Func<T>:()=>T                  |   Promise<T>   |        开启一个新任务        |
|    Task.WaitAll    |            ...promise:Promise<any>[]            | Promise<any[]> |     等待所有Promise完成      |

#### CancellationToken
可取消Token

| 名称        | 类型                        | 说明             |
| ----------- | --------------------------- | ---------------- |
| IsCancel    | 只读属性                    | 任务是否被取消   |
| CancelEvent | Action[]  方法数组,只读属性 | 被取消时触发订阅 |
| Cancel()    | 方法，无参数                | 触发任务取消     |



