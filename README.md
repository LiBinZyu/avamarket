
# **模板市场前端需求文档 (PRD)**


## **1. 全局组件 (Global Components)**

### **1.1 顶部导航栏 (Header)**

  * **靠左**: `Logo` `Template` `Platform` `MCP`
  * **靠右**: `Post (按钮)` `个人中心 (头像下拉)`
      * **个人中心下拉菜单**: `个人中心` `我的发布` `登出`
      > post 按钮转到Publish Page 发布页

### **1.2 内容卡片 (Content Card)**

  * **样式**: 参考 n8n.io/workflows 卡片网格布局。
  * **构成**:
      * **Template 卡片包含**: `SVG图标构成的label` `标题` `作者 (含认证/官方徽章)` `下载量`
      * **Platform/MCP 卡片**: `项目Logo为外部链接图标` `标题` `作者 (含认证/官方徽章)` `下载量`

## **2. 页面与功能 (Pages & Features)**

### **2.1 主页 (Homepage)**

  * **布局**: `顶部导航` -\> `搜索栏` -\> `筛选标签栏` -\> `内容分区`
  * **交互**:
      * **搜索**: 实时/异步筛选标题、标签。
      * **筛选标签**: 单选，点击后异步刷新下方内容列表。
  * **内容目录结构**:
      * **一级分类**: AI, Sales, IT Ops, Marketing, Document Ops, Other, Support
      * **二级分类**: 针对每个一级分类显示对应的二级分类
        * **AI**: Featured AI templates, AI Chatbot, AI RAG, AI Summarization, Multimodal AI
        * **Sales**: 销售相关二级分类
        * **IT Ops**: IT运维相关二级分类
        * **Marketing**: 营销相关二级分类
        * **Document Ops**: 文档操作相关二级分类
        * **Other**: 其他相关二级分类
        * **Support**: 支持相关二级分类
      * **三级**: 根据不同的二级分类展示结果，这个就是具体的每个post

  * **首页分区排版格式**:
      * 首页每个一级分类下，依次展示所有二级分类，每个二级分类为一个分区。
      * 每个分区包含：
        1. **标题**：二级分类名（如 Featured AI templates、AI Chatbot 等）
        2. **卡片区**：展示该二级分类下最多 6 个内容卡片（ContentCard），卡片内容为 post 标题、标签、作者、下载量等
        3. **explore more** 文字链接：跳转到该二级分类的完整列表或结果页
      * 示例：
        ```
        标题：Featured AI templates
        卡片：Angie, Personal AI Assistant with Telegram Voice and Text
        卡片：Chat with local LLMs using n8n and Ollama
        卡片：Chat with a database using AI
        卡片：RAG Chatbot for Company Documents using Google Drive and Gemini
        卡片：Basic Automatic Gmail Email Labelling with OpenAI and Gmail API
        卡片：Analyze Landing Page with OpenAI and Get Optimization Tips
        文字链接：explore more templates

        标题：AI Chatbot
        ...
        ```
      * 每个分区样式统一，卡片区为 3 列 x 2 行网格，底部 explore more 链接样式同上。
      * 点击“explore more templates”后，跳转到该二级分类的完整列表页，保留搜索栏，展示所有属于该二级分类的卡片。

  * **二级分类结果页面（explore more 跳转页）**:
      * 页面顶部保留搜索栏，支持关键词筛选。
      * 标题为“Results [数量]”，右上角有排序下拉菜单（如 Sort: Relevancy）。
      * 下方为卡片列表，每个卡片横向排布，包含标题、摘要、作者、更新时间、标签等，样式参考下图（Google Scholar 风格）。
      * 卡片间有分隔线，鼠标悬停有高亮。
      * 点击卡片进入内容详情页。
      * 支持返回首页或切换其他二级分类。

### **2.2 内容详情页 (Detail Page)**

  * **Template 详情页**:
    * **整体布局**:采用两栏响应式布局。**左栏**: 占页面宽度约 1/3，用于展示核心信息、元数据和操作按钮。**右栏**: 占页面宽度约 2/3，用于展示内容的可视化预览和详细的 Markdown 文档。
    * **左栏详细构成 (自上而下)**:
        1.  **返回链接**: `← Back to Templates`，引导用户返回列表页。
        2.  **技术栈图标**: 一行展示该 Template 使用的核心技术/应用的小图标 (例如 Dify, Gemini, Google Drive 的 Logo)。若图标过多，则显示前3 个，剩余的用 `+N` 标签聚合展示。
        3.  **H1 标题**: Template 的完整标题，字体较大，是视觉核心。
        4.  **主要行动点 (Call to Action)**:
            * **平台 DSL 切换器**: 一个下拉菜单或一组按钮，用于在不同的平台DSL之间切换 (如 `Dify`, `n8n`)。这是**核心功能**。
            * **主按钮**: 一个色彩鲜艳、非常醒目的按钮，文案可以是 “获取模板” 或 “Use for free”。按钮的下载链接会根据上方切换器的选择而**动态改变**。
        5.  **元数据区块 (Metadata Block)**:
            * **CREATED BY**: 作者头像、昵称，以及 `认证作者`/`官方作者` 的认证徽章 ✓。
            * **LAST UPDATE**: 显示“最后更新于 X 个月前”，提供内容时效性。
            * **CATEGORIES**: 展现一级分类>二级分类>三级分类。
            * **SHARE**: 提供社交媒体分享链接复制。

    * **右栏详细构成 (自上而下)**:
        1.  `内容预览区`:一个带有圆角的、占据显著位置的大尺寸容器。**内部**: 默认显示Loading... 状态。加载完成后，在此区域内渲染可交互的 **SVG 预览图**，必须支持拖拽 (Pan) 和缩放 (Zoom)。
        2. 渲染用户上传的 `README.md` 文件。需要支持完整的 Markdown 语法，包括：
          * **段落**: 用于简短介绍。
          * **多级标题**: 例如 `<h2>How it works</h2>`，用于构建清晰的文档结构。
          * **有序/无序列表**: 用于分点说明。
          * **代码块、引用** 等。

  * **Platform / MCP 详情页**:
      * 跟template一致
      * 左栏增加 `Visit Project`: 一个指向项目 URL 的 "Visit Project" 按钮。

### **2.3 内容发布页 (Publish Page)**

  * **流程**:
    1.  选择发布类型 (`Template` / `Platform` / `MCP`)。
    2.  根据选择动态显示对应表单。
  * **表单字段**:
      * **Template**: `类型 (下拉)` `标题` `label` `SVG预览图 (上传)` `DSL文件 (动态增减项)` `README`。
          * **DSL文件**: 允许多组 `平台名称 (文本)` + `DSL文件 (上传)`。
      * **Platform/MCP**: `标题` `label` `项目URL` `README`。
  * **README.md 编辑器**:
      * **功能要求**: `编辑/预览` 双 Tab 模式，工具栏支持图片/文件上传。
      * **技术建议**: 采用 `MDXEditor` 或 `StackEdit` 等成熟组件。后端需提供文件上传接口。

## **3. 用户体系 (User System)**

### **3.1 认证与流程 (Auth & Flow)**

  * **登录**:
    1.  用户提交凭据。
    2.  登录成功后，后端返回用户信息及 `isSurveyCompleted: boolean` 标志。
    3.  若为 `false`，前端**立即弹出不可关闭的全屏模态框**。
    4.  模态框内用 `<iframe>` 嵌入飞书问卷。
    5.  **后台**: 需配置接口接收飞书表单提交成功后的 Webhook 回调，用以更新用户的 `isSurveyCompleted` 状态。
    6.  **前端**: 状态更新后，自动关闭模态框。

### **3.2 角色与权限 (Roles & Permissions)**

| 角色         | 核心权限                                                                |
| :----------- | :---------------------------------------------------------------------- |
| **作者** | 发布/管理自己的内容。                                                   |
| **认证/官方作者** | 拥有特殊徽章，内容在排序上可获优待。                                      |
| **超级管理员** | **后台管理界面**: \<br\>- **用户管理**: 查看、修改用户角色。\<br\>- **内容管理**: 编辑/删除所有内容，设置置顶项及数量。 |

### **3.3 个人中心 (Profile Center)**

  * **功能**: `编辑个人资料` `显示用户类型徽章` `查看/管理我的发布列表`。

## **4. 数据结构建议 (Data Schema Suggestion)**

  * **User**
    ```json
    {
      "userId": "uuid", "nickname": "string", "role": "author",
      "isSurveyCompleted": false
    }
    ```
  * **Post (Template)**
    ```json
    {
      "postId": "uuid", "authorId": "uuid", "title": "string",
      "postType": "template", "svgPreviewUrl": "string",
      "dslFiles": [
        { "platformName": "Dify", "fileUrl": "url" },
        { "platformName": "n8n", "fileUrl": "url" }
      ],
      "readme": "markdown string"
    }
    ```
  * **Post (Platform / MCP)**
    ```json
    {
      "postId": "uuid", "authorId": "uuid", "title": "string",
      "postType": "platform", "projectUrl": "string",
      "readme": "markdown string"
    }
    ```

---

## 前端样式体系与类名速查表

本项目采用 Tailwind CSS + 全局 CSS 变量的混合方案，所有主题色、圆角、阴影和常用组件样式均已预定义，便于统一管理和快速原型开发。

### 主题变量与 Tailwind 类名

| 变量/用途         | Tailwind 类名         | CSS 变量名             | 说明                |
|------------------|----------------------|------------------------|---------------------|
| 主背景色         | `bg-light-bg`        | `--light-bg`           | 页面主背景色        |
| 侧边栏背景       | `bg-sidebar-bg`      | `--sidebar-bg`         | 侧边栏/卡片背景     |
| 图标提示色       | `text-icon-hint`     | `--icon-hint`          | 图标/辅助文字       |
| 次要字体色       | `text-secondary-font`| `--secondary-font`     | 次要文字            |
| 主要字体色       | `text-primary-font`  | `--primary-font`       | 主文字/标题         |
| 浅蓝             | `bg-LightBlue`       | `--LightBlue`          | 标签/高亮背景       |
| 主蓝             | `bg-NormalBlue`      | `--NormalBlue`         | 主按钮/高亮         |
| 品牌蓝           | `bg-DifyBlue`        | `--DifyBlue`           | 品牌色/主按钮       |

### 圆角与阴影

| 用途             | Tailwind 类名         | CSS 变量名             |
|------------------|----------------------|------------------------|
| 页面容器圆角     | `rounded-page-container` | `--radius-page-container` |
| 卡片圆角         | `rounded-card`        | `--radius-card`        |
| 弹窗圆角         | `rounded-modal`       | `--radius-modal`       |
| 按钮圆角         | `rounded-button`      | `--radius-button`      |
| 输入框圆角       | `rounded-input`       | `--radius-input`       |
| 标签圆角         | `rounded-tag`         | `--radius-tag`         |
| 卡片阴影         | `shadow-card`         | `--shadow-card`        |
| 输入聚焦阴影     | `shadow-input-focus`  | `--shadow-input-focus` |

### 常用组件类名

| 组件/用途        | 类名                | 说明                    |
|------------------|---------------------|-------------------------|
| 主按钮           | `btn-primary`       | 高亮主按钮              |
| 次按钮           | `btn-secondary`     | 次要操作按钮            |
| 发布按钮         | `btn-post`          | 发布/操作按钮           |
| 内容卡片         | `content-card`      | 主要内容卡片            |
| 分类卡片         | `category-card`     | 分类/筛选卡片           |
| 输入框           | `input-field`       | 表单输入                |
| 技术标签         | `tech-tag`          | 技术/平台标签           |
| 分类标签         | `category-tag`      | 分类/筛选标签           |
| 导航链接         | `nav-link`          | 顶部/侧边导航           |
| 激活导航         | `nav-link-active`   | 当前激活导航            |
| 页面容器         | `page-container`    | 页面主内容区            |
| 搜索栏           | `search-bar`        | 顶部搜索栏              |
| 弹窗蒙层         | `modal-overlay`     | 全屏弹窗背景            |
| 弹窗内容         | `modal-content`     | 弹窗内容区              |

### 使用建议

- 组件开发时，优先用 Tailwind 类名（如 `bg-light-bg rounded-card shadow-card`），如需更复杂样式可用自定义类（如 `btn-primary`）。
- 所有主题变量都集中在 `:root`，如需调整主题色或圆角，只需改一处即可全局生效。
- 组件样式建议继续沿用当前命名规范，便于团队协作和维护。
