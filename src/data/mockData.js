// 模拟数据
export const categories = {
  "AI": {
    name: "AI",
    subcategories: [
      { id: "ai-featured", name: "Featured AI templates", description: "精选AI模板", icon: "🤖" },
      { id: "ai-chatbot", name: "AI Chatbot", description: "AI聊天机器人", icon: "💬" },
      { id: "ai-rag", name: "AI RAG", description: "AI检索增强生成", icon: "🔍" },
      { id: "ai-summarization", name: "AI Summarization", description: "AI摘要生成", icon: "📝" },
      { id: "ai-multimodal", name: "Multimodal AI", description: "多模态AI", icon: "🎨" }
    ]
  },
  "Sales": {
    name: "Sales",
    subcategories: [
      { id: "sales-crm", name: "CRM Integration", description: "客户关系管理集成", icon: "👥" },
      { id: "sales-automation", name: "Sales Automation", description: "销售自动化", icon: "⚡" }
    ]
  },
  "IT Ops": {
    name: "IT Ops",
    subcategories: [
      { id: "it-monitoring", name: "System Monitoring", description: "系统监控", icon: "📊" },
      { id: "it-deployment", name: "Deployment", description: "部署管理", icon: "🚀" }
    ]
  },
  "Marketing": {
    name: "Marketing",
    subcategories: [
      { id: "marketing-social", name: "Social Media", description: "社交媒体营销", icon: "📱" },
      { id: "marketing-email", name: "Email Marketing", description: "邮件营销", icon: "📧" }
    ]
  },
  "Document Ops": {
    name: "Document Ops",
    subcategories: [
      { id: "doc-automation", name: "Document Automation", description: "文档自动化", icon: "📄" },
      { id: "doc-collaboration", name: "Collaboration", description: "协作工具", icon: "🤝" }
    ]
  },
  "Other": {
    name: "Other",
    subcategories: [
      { id: "other-utilities", name: "Utilities", description: "实用工具", icon: "🔧" }
    ]
  },
  "Support": {
    name: "Support",
    subcategories: [
      { id: "support-ticket", name: "Ticket System", description: "工单系统", icon: "🎫" }
    ]
  }
};

export const techLabels = [
  "Google Sheets", "Feishu/Lark", "OpenAI", "Telegram", "Gmall", 
  "MySQL", "Postgres", "Discord", "Google Drive", "Slack", 
  "Notion", "Microsoft Outlook", "Microsoft Excel 365", 
  "Google Calendar", "AWS Bedrock Chat Model", "AWS Certificate Manager"
];

export const templates = [
  {
    id: "template-1",
    title: "AI Customer Service Bot",
    author: { name: "John Doe", avatar: "https://via.placeholder.com/40", isVerified: true, isOfficial: false },
    downloads: 1247,
    category: "AI",
    subcategory: "AI Chatbot",
    labels: ["OpenAI", "Discord", "Google Sheets"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "智能客服机器人，支持多平台集成",
    lastUpdate: "2个月前",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }, { platformName: "n8n", fileUrl: "#" }],
    readme: "# AI Customer Service Bot\n\n## 功能特性\n- 智能问答\n- 多平台支持\n- 自动学习\n\n## 使用方法\n1. 下载DSL文件\n2. 导入到对应平台\n3. 配置API密钥"
  }
];

export const platforms = [
  {
    id: "platform-1",
    title: "Dify AI Platform",
    author: { name: "Dify Team", avatar: "https://via.placeholder.com/40", isVerified: true, isOfficial: true },
    downloads: 5678,
    category: "AI",
    subcategory: "Featured AI templates",
    labels: ["OpenAI", "Google Drive", "Slack"],
    projectUrl: "https://dify.ai",
    description: "开源的LLMOps平台",
    lastUpdate: "1周前",
    readme: "# Dify AI Platform\n\n## 平台特性\n- 可视化工作流\n- 多模型支持\n- 企业级功能"
  }
];
