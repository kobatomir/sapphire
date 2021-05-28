#### @violets/shape
##### 1.安装
> npm  i  @violets/shape  --save

项目需安装shape图形基础库

##### 2.类
顶级类
`ShapeCreator` 
ShapeCreator 提供图形构建,返回线条图形`LineShape`或面图形`PolygonShape`

> ShapeCreator(points:点集合,type:图形类型,size:可选边数量)：LineShape|PolygonShape

```typescript
import {ShapeCreator } from "@violets/shape"
import { Feature, Map, MapBrowserEvent } from "ol";
export class Draw{

  Creator(){
    let shape= ShapeCreator(this.points,this.type,this.size);
    let feature= new Feature(shape);
    this.featureSource.addFeature(feature);
  }
}
```
`LineShape`
所有线条类型的基类，继承自 LineString

​	依赖关系:
​	LineShape->LineString-> SimpleGeometry ->Geometry
​	LineShape->IShape



共有属性

| 属性名 |     类型     |    说明    |
| :----: | :----------: | :--------: |
| Points | Coordinate[] | 控制点集合 |
| First  |  Coordinate  |    首点    |
|  Last  |  Coordinate  |    尾点    |

方法

| 方法名 | 参数 | 返回值 | 说明 |
| :----: | :--: | :----: | :----: |
| Generate | void | void | 生成图形 |

`PolygonShape`
所有线条类型的基类，继承自 LineString

​	依赖关系:
​	PolygonShape->Polygon-> SimpleGeometry ->Geometry
​	PolygonShape->IShape



共有属性

| 属性名 |     类型     |    说明    |
| :----: | :----------: | :--------: |
| Points | Coordinate[] | 控制点集合 |
| First  |  Coordinate  |    首点    |
|  Last  |  Coordinate  |    尾点    |

方法

| 方法名 | 参数 | 返回值 | 说明 |
| :----: | :--: | :----: | :----: |
| Generate | void | void | 生成图形 |

`ShapeNames`
提供图形静态名称与对应类型名
