# uve-ai-chat 组件使用文档

`uve-ai-chat` 是一个类似 ChatGPT 的 AI 聊天框组件，支持富文本渲染和打字效果。

## 功能特点

- 支持用户和 AI 之间的对话交互
- 支持富文本渲染（Markdown 语法）
- 实现 AI 回答的打字效果
- 支持代码块高亮显示
- 输入框根据内容自适应高度
- 完全自定义的 UI，符合现代聊天应用的设计

## 安装和引入

组件已集成到项目中，无需额外安装。通过 easycom 规则可以直接使用：

```vue
<template>
  <uve-ai-chat />
</template>
```

## 基本用法

```vue
<template>
  <view class="container">
    <uve-navbar title="AI聊天助手" back></uve-navbar>
    <view class="chat-wrapper">
      <uve-ai-chat ref="aiChatRef" @send="handleSendMessage" @receive="handleReceiveMessage" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

const aiChatRef = ref()

// 处理用户发送消息
const handleSendMessage = (message: string) => {
  console.log("用户发送消息:", message)
  // 这里可以调用实际的API
}

// 处理AI回复消息
const handleReceiveMessage = (message: string) => {
  console.log("AI回复消息:", message)
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-wrapper {
  flex: 1;
  overflow: hidden;
}
</style>
```

## 组件属性

| 属性名      | 类型   | 默认值                    | 说明                   |
| ----------- | ------ | ------------------------- | ---------------------- |
| userAvatar  | String | '/static/tabbar/user.png' | 用户头像               |
| aiAvatar    | String | '/static/tabbar/home.png' | AI 头像                |
| typingSpeed | Number | 30                        | 打字效果的速度（毫秒） |
| customClass | String | ''                        | 自定义类名             |
| customStyle | String | ''                        | 自定义样式             |

## 事件

| 事件名  | 参数            | 说明                |
| ------- | --------------- | ------------------- |
| send    | message: string | 用户发送消息时触发  |
| receive | message: string | AI 接收到消息时触发 |

## 方法

通过 ref 可以调用组件的以下方法：

| 方法名        | 参数                                  | 说明         |
| ------------- | ------------------------------------- | ------------ |
| addMessage    | role: 'user' \| 'ai', content: string | 添加一条消息 |
| clearMessages | -                                     | 清空所有消息 |

示例：

```js
// 添加用户消息
aiChatRef.value.addMessage("user", "这是一条用户消息")

// 添加AI消息
aiChatRef.value.addMessage("ai", "这是一条AI回复消息")

// 清空所有消息
aiChatRef.value.clearMessages()
```

## 富文本支持

组件支持以下 Markdown 语法：

- **粗体**：`**粗体文本**`
- _斜体_：`*斜体文本*`
- [链接](https://example.com)：`[链接文本](https://example.com)`
- 代码块：

  ````
  ```js
  const example = 'hello world';
  console.log(example);
  ````

  ```

  ```

- 内联代码：`` `内联代码` ``
- 列表：

  ```
  * 项目1
  * 项目2

  1. 项目1
  2. 项目2
  ```

## 自定义样式

可以通过 CSS 变量或直接覆盖类名来自定义组件样式：

```scss
.uve-ai-chat {
  // 自定义样式
  .chat-messages {
    background-color: #f9f9f9;
  }

  .message-item.user-message .message-body {
    background-color: #4caf50; // 修改用户消息背景色
  }

  .message-item.ai-message .message-body {
    background-color: #e0e0e0; // 修改AI消息背景色
  }
}
```

## 注意事项

1. 组件高度默认为 100%，需要在父容器中设置具体高度
2. 如果需要实现真实的 AI 对话，需要在`send`事件处理函数中调用实际的 API
3. 代码高亮目前支持常见的编程语言，如 js、python、html 等
4. 组件内部已处理输入框自适应高度，无需额外配置

## 示例

### 基本聊天界面

```vue
<template>
  <view style="height: 100vh;">
    <uve-ai-chat />
  </view>
</template>
```

### 自定义头像

```vue
<template>
  <view style="height: 100vh;">
    <uve-ai-chat
      userAvatar="/static/images/user-avatar.png"
      aiAvatar="/static/images/ai-avatar.png"
    />
  </view>
</template>
```

### 调整打字速度

```vue
<template>
  <view style="height: 100vh;">
    <uve-ai-chat :typingSpeed="50" />
  </view>
</template>
```

### 与实际 API 集成

```vue
<template>
  <view style="height: 100vh;">
    <uve-ai-chat @send="callAiApi" />
  </view>
</template>

<script setup>
import { ref } from "vue"

const aiChatRef = ref()

const callAiApi = async (message) => {
  try {
    // 调用实际的AI API
    const response = await fetch("https://your-ai-api.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    const data = await response.json()

    // 添加AI回复
    aiChatRef.value.addMessage("ai", data.reply)
  } catch (error) {
    console.error("API调用失败:", error)
    // 添加错误提示
    aiChatRef.value.addMessage("ai", "抱歉，服务暂时不可用，请稍后再试。")
  }
}
</script>
```
