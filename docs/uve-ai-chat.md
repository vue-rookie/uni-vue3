# uve-ai-chat 组件使用文档

`uve-ai-chat` 是一个类似 ChatGPT 的 AI 聊天框组件，支持富文本渲染和打字效果。

## 功能特点

- 支持用户和 AI 之间的对话交互
- 用户和 AI 消息均显示头像
- 支持富文本渲染（Markdown 语法）
- 实现 AI 回答的打字效果，打字过程中代码块保持样式
- 支持代码块高亮显示，每个代码块右上角显示复制按钮
- 输入框根据内容自适应高度
- 完全自定义的 UI，符合现代聊天应用的设计
- **NEW:** 支持文件上传和附件发送
- **NEW:** 支持对 AI 消息的反馈功能（点赞/点踩）
- **NEW:** 支持复制消息内容和重新生成功能
- **NEW:** Tailwind 风格的交互设计

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

| 事件名     | 参数                                                  | 说明                       |
| ---------- | ----------------------------------------------------- | -------------------------- |
| send       | message: string, attachments?: FileAttachment[]       | 用户发送消息时触发         |
| receive    | message: string                                       | AI 接收到消息时触发        |
| feedback   | messageIndex: number, feedbackType: 'like'\|'dislike' | 用户对消息进行反馈时触发   |
| regenerate | messageIndex: number                                  | 用户请求重新生成响应时触发 |

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

## 新增功能说明

### 头像显示

- 用户消息和 AI 消息都会显示头像
- 头像为圆形，尺寸 32x32px
- 用户消息头像显示在右侧，AI 消息头像显示在左侧
- 可通过 `userAvatar` 和 `aiAvatar` 属性自定义头像路径

### 代码块实时渲染

- 打字效果期间，代码块会立即应用语法高亮样式
- 代码块右上角显示复制按钮（i-ri-file-copy-line 图标）
- 复制按钮仅在包含代码块的消息中显示
- 打字过程中代码块带有脉冲动画效果

### 文件上传

点击输入框左侧的附件图标 (i-ri-attachment-2) 可以选择文件上传。组件支持：

- 选择多个文件（最多 5 个）
- 显示文件预览卡片
- 支持移除选中的文件
- 文件信息会随消息一起发送

发送按钮使用 i-ri-send-plane-fill 图标，移除文件按钮使用 i-ri-close-line 图标。

**平台差异说明：**

- **H5 环境**：使用 `uni.chooseFile` API，支持多种文件类型（图片、PDF、Office 文档等）
- **微信小程序**：使用 `uni.chooseMessageFile` API，支持聊天中的文件选择，失败时降级为 `uni.chooseImage`
- **其他平台**：降级使用 `uni.chooseImage` 仅支持图片选择

### 消息反馈

每条 AI 消息下方提供以下交互按钮（使用 UnoCSS Remix Icon）：

- 👍 点赞 (i-ri-thumb-up-line) - 标记有用的回答
- 👎 点踩 (i-ri-thumb-down-line) - 标记需要改进的回答
- 📋 复制 (i-ri-file-copy-line) - 复制消息内容到剪贴板
- 🔄 重新生成 (i-ri-refresh-line) - 请求 AI 重新生成回答

### 使用反馈事件

```vue
<template>
  <uve-ai-chat @feedback="handleFeedback" @regenerate="handleRegenerate" @send="handleSend" />
</template>

<script setup lang="ts">
const handleFeedback = (messageIndex: number, feedbackType: "like" | "dislike") => {
  console.log(`消息 ${messageIndex} 收到反馈: ${feedbackType}`)
  // 发送反馈到后端API
}

const handleRegenerate = (messageIndex: number) => {
  console.log(`请求重新生成消息 ${messageIndex}`)
  // 调用API重新生成回答
}

const handleSend = (message: string, attachments?: FileAttachment[]) => {
  console.log("发送消息:", message)
  if (attachments && attachments.length > 0) {
    console.log("包含附件:", attachments)
    // 处理文件上传
  }
}
</script>
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
