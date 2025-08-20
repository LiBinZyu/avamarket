
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

  * **布局**: `顶部导航` -\> `搜索栏` -\> `筛选标签栏` -\> `内容卡片网格`
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
  * **二级分类页面布局**:
      * 每个二级分类以卡片布局展示
      * 第一行显示一级分类标题
      * 第一个卡片横向填充 (fill horizontally)
      * 最多3个x2行的卡片网格布局
      * 每个卡片都有label：Google Sheets, Feishu/Lark, OpenAI, Telegram, Gmall, MySQL, Postgres, Discord, Google Drive, Slack, Notion, Microsoft Outlook, Microsoft Excel 365, Google Calendar, AWS Bedrock Chat Model, AWS Certificate Manager 等。过多则显示前 4-5 个，剩余的用 +N 标签聚合展示。
      * 底部显示 "explore more" 文字链接
  * **三级分类结果页面**:
      * 从二级目录进入或通过搜索栏筛选后展现
      * 显示 "Results" 标题
      * 以无填充的卡片列表形式展示，类似Google Scholar的搜索结果样式
      > 点击卡片进入其内容详情页

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