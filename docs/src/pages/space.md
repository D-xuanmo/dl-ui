# Space 间距

可用于给多个元素增加间距

```vue playground=Space

```

## API

### Props

| 参数      | 类型               | 默认值     | 说明                     | 必传 |
| --------- | ------------------ | ---------- | ------------------------ | ---- |
| gap       | `number`           | -          | 空格间隙，单位：px       | N    |
| direction | `DirectionType`    | horizontal | 排列方式，水平、垂直     | N    |
| justify   | `SpaceJustifyType` | -          | 水平排列方式             | N    |
| align     | `SpaceAlignType`   | -          | 垂直排列对齐方式         | N    |
| wrap      | `boolean`          | -          | 是否自动换行，水平时生效 | N    |

#### SpaceJustifyType

```typescript
type SpaceJustifyType = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
```

#### SpaceAlignType

```typescript
type SpaceAlignType = 'start' | 'center' | 'end' | 'baseline'
```
