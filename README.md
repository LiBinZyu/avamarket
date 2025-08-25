# **AvaMarket - 模板市场前端系统**

## **系统概述**

AvaMarket 是一个现代化的模板市场前端系统，专注于 AI 工作流模板、平台集成和 MCP 服务的展示与分发。系统采用 React + Vite 技术栈，具备响应式设计和现代化的用户界面。

## **核心功能特性**

### **1. 智能分类系统**
- **7个主要分类**: AI、Sales、IT Ops、Marketing、Document Ops、Other、Support
- **多级分类结构**: 每个主分类下包含多个二级分类，支持精确的内容组织
- **动态内容展示**: 每个二级分类最多显示6个精选内容，支持"explore more"扩展查看

### **2. 内容类型支持**
- **Template**: AI工作流模板，支持多平台DSL文件
- **Platform**: 第三方平台集成服务
- **MCP**: Model Context Protocol 服务

### **3. 高级搜索与筛选**
- **实时搜索**: 支持标题、标签的实时搜索
- **分类筛选**: 点击分类标签快速筛选内容
- **结果页面**: 搜索结果页面支持排序和完整列表展示

## **页面结构与功能**

### **1. 主页 (HomePage)**
- **分类导航**: 顶部显示7个主要分类，支持切换
- **分区展示**: 每个二级分类独立区块，包含标题、内容卡片、explore more链接
- **内容卡片**: 3列×2行网格布局，展示模板/平台的核心信息
- **搜索集成**: 顶部搜索栏，支持关键词搜索和分类筛选

### **2. 内容详情页 (DetailPage)**
- **两栏布局**: 左栏(1/3)显示元数据，右栏(2/3)显示预览和文档
- **平台切换器**: 支持Dify、n8n等平台的DSL文件切换
- **SVG预览窗口**: 可交互的SVG预览，支持拖拽和缩放
- **Markdown渲染**: 完整的README文档渲染，支持下载和代码/渲染视图切换
- **元数据展示**: 作者信息、认证徽章、更新时间、下载量、分类信息

### **3. 内容发布页 (PublishPage)**
- **类型选择**: 支持Template、Platform、MCP三种类型
- **动态表单**: 根据类型动态显示对应表单字段
- **DSL文件管理**: 支持多平台 DSL 文件上传和管理，每个平台（Dify/n8n/Coze）只能选择一次，且每个平台成套上传 DSL 文件和 SVG 预览图
- **README编辑器**: 支持 Markdown 格式内容编辑，并支持本地 .md 文件上传自动填充

## **用户界面组件**

### **1. 顶部导航栏 (Header)**
- **品牌标识**: AvaMarket Logo和品牌名称
- **主导航**: Templates、Platforms、MCP三个主要分类
- **操作按钮**: Publish按钮（带发光效果）
- **用户中心**: 头像下拉菜单，包含Profile、My Posts、Logout

### **2. 内容卡片 (ContentCard)**
- **信息展示**: 标题、作者、认证徽章、下载量、标签
- **交互功能**: 点击进入详情页
- **视觉设计**: 现代化卡片设计，支持悬停效果

### **3. 分类筛选器 (CategoryFilter)**
- **分类标签**: 支持主分类和二级分类的快速切换
- **视觉反馈**: 选中状态的高亮显示
- **响应式设计**: 适配不同屏幕尺寸

## **技术架构**

### **前端技术栈**
- **框架**: React 18
- **构建工具**: Vite
- **样式系统**: Tailwind CSS + 自定义CSS变量
- **图标库**: Lucide React
- **Markdown渲染**: @uiw/react-markdown-preview

### **状态管理**
- **路由状态**: 基于useState的简单路由管理
- **组件状态**: 各页面独立的状态管理
- **数据流**: 从mockData到组件的单向数据流

### **样式系统**
- **CSS变量**: 统一的颜色、字体、间距、圆角定义
- **组件类**: 预定义的按钮、卡片、输入框等组件样式
- **响应式设计**: 支持不同屏幕尺寸的适配
- **高级动画**: CSS keyframes动画，支持SVG预览刷新和按钮光效
- **伪元素**: 使用::after伪元素实现复杂的视觉效果
- **混合模式**: 支持mix-blend-mode等高级CSS特性

## **数据结构**

### **分类数据结构**
```javascript
categories: {
  "AI": {
    name: "AI",
    subcategories: [
      { id: "ai-featured", name: "Featured AI templates" },
      { id: "ai-chatbot", name: "AI Chatbot" },
      // ... 更多二级分类
    ]
  }
  // ... 更多主分类
}
```

### **内容数据结构**
```javascript
templates: [
  {
    id: "template-1",
    title: "模板标题",
    author: { name: "作者名", avatar: "头像URL", isVerified: true, isOfficial: false },
    downloads: 2345,
    category: "AI",
    subcategory: "Featured AI templates",
    labels: ["标签1", "标签2"],
    dslFiles: [
      // 支持多平台，每个平台一个对象，三者成套
      { platformName: "Dify", fileUrl: "Dify平台DSL文件URL", svgPreview: "Dify平台SVG预览图URL" },
      { platformName: "n8n", fileUrl: "n8n平台DSL文件URL", svgPreview: "n8n平台SVG预览图URL" }
    ],
    readme: "Markdown内容"
  }
]
```

---

## **前端接口设计（生产环境）**

AvaMarket 前端页面所需的主要接口如下，便于后端开发和联调：

### 1. 分类与子分类接口

- **用途**：首页分类导航、二级分类展示
- **接口**：`GET /api/categories`
- **返回示例**：
  ```json
  [
    {
      "name": "AI",
      "subcategories": [
        { "id": "ai-featured", "name": "Featured AI templates", "description": "精选AI模板", "icon": "🤖" }
        // ...
      ]
    }
    // ...
  ]
  ```

### 2. 内容列表（模板/平台）检索接口

- **用途**：首页内容卡片、搜索、分类/子分类筛选
- **接口**：`GET /api/contents`
- **请求参数**：
  - `category`（可选）：一级分类名，如 "AI"
  - `subcategory`（可选）：二级分类名，如 "AI Chatbot"
  - `search`（可选）：搜索关键词
  - `type`（可选）："template" 或 "platform"
  - `sort`（可选）："relevancy"、"downloads"、"latest"
  - `page`、`pageSize`（可选）：分页
- **返回示例**：
  ```json
  [
    {
      "id": "template-1",
      "title": "Angie, Personal AI Assistant with Telegram Voice and Text",
      "author": { "name": "Alice", "avatar": "...", "isVerified": true, "isOfficial": false },
      "downloads": 2345,
      "category": "AI",
      "subcategory": "Featured AI templates",
      "labels": ["Telegram", "OpenAI", ...],
      "svgPreview": "...",
      "description": "...",
      "lastUpdate": "1 week ago",
      "dslFiles": [{ "platformName": "Dify", "fileUrl": "..." }, ...],
      "readme": "..." // 可选，详情页用
    }
    // ...
  ]
  ```

### 3. 内容详情接口

- **用途**：详情页展示模板/平台详细信息
- **接口**：`GET /api/contents/{id}`
- **返回示例**：同上单条内容结构，包含所有字段（如 dslFiles、readme、author、downloads、labels、category、subcategory、lastUpdate 等）

### 4. 发布内容接口

- **用途**：发布模板/平台（PublishPage.jsx）
- **接口**：`POST /api/contents`
- **请求体**（以模板为例）：
  ```json
  {
    "type": "template", // 或 "platform"
    "title": "xxx",
    "labels": ["OpenAI", "Google Sheets"],
    "category": "AI",
    "subcategory": "AI Chatbot",
    "svgPreview": "...", // 可选
    "dslFiles": [{ "platformName": "Dify", "fileUrl": "..." }],
    "projectUrl": "", // 平台类型时必填
    "readme": "markdown内容"
  }
  ```
- **返回**：新建内容的 id 或完整内容对象

### 5. 技术标签接口（可选）

- **用途**：标签选择器自动补全
- **接口**：`GET /api/tech-labels`
- **返回**：`["Google Sheets", "OpenAI", ...]`

#### 接口清单表格

| 接口路径              | 方法 | 说明         | 主要参数/字段         |
|----------------------|------|--------------|----------------------|
| /api/categories      | GET  | 获取分类     | -                    |
| /api/contents        | GET  | 内容检索     | category, subcategory, search, type, sort, page, pageSize |
| /api/contents/{id}   | GET  | 内容详情     | id                   |
| /api/contents        | POST | 发布内容     | type, title, labels, category, subcategory, dslFiles, projectUrl, readme |
| /api/tech-labels     | GET  | 技术标签     | -                    |

> 所有内容（模板/平台）结构字段以 mockData.js 为准，生产环境需后端返回一致结构。  
> **dslFiles 字段为数组，支持多平台（如 Dify、n8n、Coze），每个平台一个对象，包含 platformName（平台名，限定可选）、fileUrl（DSL 文件）、svgPreview（SVG 预览图，三者成套）。**  
> 内容卡片和详情页根据 dslFiles[0]?.svgPreview 或当前平台 svgPreview 展示预览图。  
> readme 字段为 markdown 文本，支持详情页渲染和下载，发布页支持本地 .md 文件上传自动填充。  
> 分类、子分类、标签等建议由后端统一维护，前端仅做展示和选择。

---

## **特色功能**

### **1. SVG预览系统**
- **交互式预览**: 支持拖拽和缩放操作
- **加载状态**: 优雅的加载动画和状态提示
- **刷新动画**: 左上到右下的对角线刷新效果

### **2. 认证徽章系统**
- **官方认证**: 蓝色盾牌图标，表示官方内容
- **用户认证**: 绿色对勾图标，表示认证用户
- **社区用户**: 无特殊标识的普通用户

### **3. 平台集成支持**
- **多平台DSL**: 支持Dify、n8n等平台的配置文件
- **动态切换**: 用户可在不同平台间切换查看
- **文件下载**: 支持DSL文件的直接下载

### **4. 高级UI组件**
- **SVG预览窗口**: 自定义的window组件，包含标题、加载状态和刷新动画
- **内发光效果**: 窗口组件支持内发光效果，增强视觉层次
- **刷新动画**: 左上到右下的对角线白光扫过效果，支持循环播放
- **按钮发光**: Publish按钮支持内发光和悬停时的光效动画

## **开发与部署**

### **开发环境**
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### **项目结构**
```
src/
├── components/          # 可复用组件
│   ├── Header.jsx      # 顶部导航栏
│   ├── ContentCard.jsx # 内容卡片组件
│   ├── CategoryFilter.jsx # 分类筛选器
│   └── SubcategoryCard.jsx # 二级分类卡片
├── pages/              # 页面组件
│   ├── HomePage.jsx    # 主页
│   ├── DetailPage.jsx  # 内容详情页
│   └── PublishPage.jsx # 内容发布页
├── data/               # 模拟数据和配置
│   ├── mockData.js     # 模拟数据
│   └── mockReadme.md   # 示例README文件
├── assets/             # 静态资源
│   ├── dify.ai.svg     # Dify平台图标
│   └── n8n.io.svg      # n8n平台图标
└── index.css           # 全局样式和CSS变量
```

### **自定义配置**
- **主题变量**: 在`:root`中定义的颜色、字体、间距等变量
- **组件样式**: 预定义的按钮、卡片、输入框等样式类
- **响应式断点**: 基于Tailwind CSS的响应式设计系统

## **未来扩展计划**

### **功能增强**
- **用户认证系统**: 完整的登录注册流程
- **内容管理**: 用户发布内容的编辑和删除
- **评论系统**: 用户对内容的评价和讨论
- **收藏功能**: 用户收藏感兴趣的内容

### **技术升级**
- **状态管理**: 引入Redux或Zustand进行状态管理
- **路由系统**: 使用React Router进行更完善的路由管理
- **API集成**: 连接后端API，替换模拟数据
- **测试覆盖**: 添加单元测试和集成测试
