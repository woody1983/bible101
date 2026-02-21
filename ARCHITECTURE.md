# Bible101 架构文档

> 本文档是 Bible101 项目的全局架构地图，供开发者和 AI Agent 参考。
> 最后更新：2026-02-20

## 0. AI Agent 行动协议（Global Rules）

> 本章节定义 AI Agent 阅读 Issue 和执行任务时的触发规则和工作流程。

### 0.1 关键字触发器

| 关键字 | 触发动作 | 工作流程 |
|--------|----------|----------|
| `#plan#` | 进入规划模式 | 1. 分析需求<br>2. 制定实施计划<br>3. 列出任务清单<br>4. **等待用户确认后再实施** |
| `#tdd#` | 强制 TDD 模式 | 1. 先写测试<br>2. 运行测试（失败）<br>3. 写实现<br>4. 运行测试（通过）<br>5. 重构<br>6. 提交 |
| `#split#` | 拆分 Issue | 1. 分析 Issue 复杂度<br>2. 识别独立模块<br>3. 拆分为 3 个小 Issue<br>4. 创建子 Issue 并关联 |
| `#adr#` | 创建架构决策 | 1. 识别架构层面变更<br>2. 起草 ADR（提案状态）<br>3. 添加到 ARCHITECTURE.md<br>4. **等待评审** |
| `#urgent#` | 紧急模式 | 1. 暂停其他任务<br>2. 优先处理<br>3. 简化流程（可跳过非关键测试）<br>4. 快速交付 |
| `#review#` | 代码审查 | 1. 检查代码质量<br>2. 检查测试覆盖<br>3. 检查是否符合规范<br>4. 给出改进建议 |
| `#doc#` | 文档优先 | 1. 更新相关文档<br>2. 添加代码注释<br>3. 更新 README/API 文档<br>4. 再写代码 |

### 0.2 默认行为规则

**如果没有关键字，按以下优先级执行：**

1. **新 Issue** → 自动进入 `#plan#` 模式
2. **Bug 修复** → 自动进入 `#tdd#` 模式
3. **功能添加** → 自动进入 `#tdd#` 模式
4. **架构变更** → 自动进入 `#adr#` 模式
5. **大 Issue** (>500字) → 提示使用 `#split#`

### 0.3 禁止行为

❌ **绝对禁止：**
- 未经测试直接提交代码
- 未经用户确认直接实施 `#plan#` 的内容
- 跳过 ADR 流程进行架构变更
- 忽略 `#urgent#` 的优先级

### 0.4 确认机制

**以下情况必须等待用户明确回复：**
- `#plan#` 完成后（实施前）
- `#split#` 完成后（创建 Issue 前）
- `#adr#` 草稿完成后（评审前）
- 涉及数据库变更的操作
- 涉及删除文件的操作

### 0.5 Label 自动触发规则

| Label | 触发模式 | 说明 |
|-------|----------|------|
| `bug` | `#tdd#` + 紧急 | 程序报错或逻辑不符，需紧急修复 |
| `documentation` | `#doc#` | 架构文档、README、ADR、注释修改 |
| `enhancement` | `#plan#` | 现有功能优化或新特性添加 |
| `question` | 暂停开发 | 需求有疑问，等待用户澄清 |
| `wontfix` | 立即停止 | 决定不做，记录原因后停止 |

### 0.6 Priority 关键字规则

**Issue 或 Comment 中出现以下关键字：**

| 关键字 | 处理方式 |
|--------|----------|
| `priority: high` | 暂停其他任务，优先处理此 Issue |
| `priority: med` | 正常排队处理（默认） |
| `priority: low` | 有空时处理，不紧急 |

### 0.7 Status 状态规则

| 关键字 | 处理方式 |
|--------|----------|
| `status: refining` | **只读模式** - 分析 comment 阶段，请勿开发 |
| `status: ready-for-ai` | **自动开始** - 分析完成，Agent 自动开始开发 |

**重要：** 看到 `status: ready-for-ai` 后：
1. 检查是否需要开新分支（按 ARCHITECTURE.md 约定）
2. 自动开始开发流程
3. 完成后更新状态

### 0.8 冲突解决优先级

**多个 label/关键字冲突时，按以下优先级处理：**

```
1. wontfix > 其他所有（立即停止，记录原因）
2. priority: high > priority: med > priority: low
3. status: refining > status: ready-for-ai（refining 优先）
4. bug > enhancement（bug 优先修复）
```

### 0.9 输出格式

**执行关键字后，按以下格式回复：**

```
🎯 触发模式：[关键字/Label]
🏷️ 识别标签：[label1, label2, ...]
⚡ 优先级：[high/med/low]
📊 当前状态：[refining/ready-for-ai]

📋 执行步骤：
1. [步骤1]
2. [步骤2]
3. [步骤3]

⏳ 等待确认：[是/否]
⛔ 停止原因：[如果是 wontfix]
```

### 0.10 强制准则：分析过程必须添加到 Comment

**⚠️ 重要：所有有关 Issue 的分析过程必须添加到 GitHub Comment**

#### 要求
- ✅ 分析 Issue 时，将思考过程写成 Comment
- ✅ 开发完成后，将开发记录总结成 Comment
- ✅ 讨论和想法必须公开在 Issue 中
- ❌ 禁止私下分析不记录

#### Comment 内容应包括
1. **理解分析** - 对 Issue 需求的理解和澄清
2. **方案设计** - 技术选型和实现思路
3. **开发记录** - 具体实现了哪些功能
4. **测试情况** - 测试覆盖率和结果
5. **待确认事项** - 需要用户决策的问题

#### 示例 Comment 结构
```markdown
## 💭 分析
[对 Issue 的理解和分析]

## 🎯 方案
[技术方案和实现思路]

## ✅ 已完成
[具体实现的功能列表]

## 🧪 测试
[测试覆盖情况]

## ❓ 待确认
[需要用户确认的问题]
```

### 0.11 PR 提交准则：关闭 Issue 并记录过程

**⚠️ 重要：提交 PR 时必须一并关闭相关 Issue，并将结果和过程作为 Comment**

#### PR 提交流程
```
开发完成 → 创建 PR → 关联 Issue → 添加结果 Comment → 关闭 Issue
```

#### PR 描述要求
1. **关联 Issue** - 使用 `Fixes #123` 或 `Closes #123`
2. **变更摘要** - 简要说明改了什么
3. **测试情况** - 测试是否通过
4. **截图/演示** - 如有 UI 变更提供截图

#### 关闭 Issue 时的 Comment 内容
```markdown
## ✅ 已完成

### 实现内容
[具体实现了哪些功能]

### 文件变更
- [文件1] - [变更说明]
- [文件2] - [变更说明]

### 测试情况
- ✅ 所有测试通过 [X/X]
- ✅ 代码审查通过

### 关联 PR
[PR链接]

### 部署状态
- [ ] 已合并到 main
- [ ] 已部署到生产环境
```

#### 关闭关键词
使用以下关键词自动关闭 Issue：
- `Fixes #123`
- `Closes #123`
- `Resolves #123`

## 1. 项目概述

### 1.1 项目愿景
Bible101 是一个现代化的圣经学习平台，旨在帮助用户通过结构化的方式深入理解圣经。项目采用"章节即单元"的学习理念，为每一章圣经提供：
- 中英对照经文阅读
- 智能问答题（考官模式）
- 学习进度追踪
- 每日随机经文

### 1.2 核心功能
- 📖 **经文阅读**：66卷书，1189章，中英对照
- 📝 **考官模式**：基于章节内容自动生成问答题
- 🎨 **现代UI**：Sacred Modernism 设计风格
- 📱 **响应式**：支持桌面和移动端
- 🔄 **每日经文**：随机经文，优先诗篇和箴言

## 2. 技术栈

### 2.1 核心技术
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | UI 框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 7.x | 构建工具 |
| Tailwind CSS | 4.x | 样式系统 |
| React Router | 7.x | 路由管理 |
| Zustand | 5.x | 状态管理 |

### 2.2 开发工具
- **测试**：Vitest + React Testing Library
- **图标**：Lucide React
- **动画**：Framer Motion

### 2.3 架构决策
- **为什么选择 React + TypeScript？**
  - 组件化开发，易于维护
  - 类型安全，减少运行时错误
  - 生态丰富，社区支持好

- **为什么使用 Zustand 而不是 Redux？**
  - 更轻量，学习成本低
  - 无需 Provider 包裹
  - 代码更简洁

- **为什么采用 TDD 开发模式？**
  - 确保代码质量
  - 便于重构
  - 文档即测试

## 3. 目录结构

```
bible101/
├── src/
│   ├── components/          # React 组件
│   │   ├── layout/         # 布局组件
│   │   │   ├── Navbar.tsx
│   │   │   └── GlassNavbar.tsx    # 玻璃拟态导航栏
│   │   ├── features/       # 功能组件
│   │   │   ├── ExamMode.tsx       # 考官模式
│   │   │   ├── HeroSection.tsx    # 首页 Hero
│   │   │   ├── RandomVerseCard.tsx # 随机经文卡片
│   │   │   └── StudyCard.tsx      # 学习卡片
│   │   └── ui/             # UI 基础组件
│   ├── pages/              # 页面组件
│   │   ├── HomePage.tsx
│   │   ├── BooksPage.tsx
│   │   ├── BookPage.tsx
│   │   ├── ChapterPage.tsx
│   │   ├── SearchPage.tsx
│   │   └── SettingsPage.tsx
│   ├── lib/                # 工具函数
│   │   ├── bibleParser.ts      # 圣经数据解析
│   │   ├── examGenerator.ts    # 问题生成器
│   │   └── randomVerse.ts      # 随机经文生成
│   ├── hooks/              # 自定义 Hooks
│   │   └── useRandomVerse.ts
│   ├── stores/             # 状态管理
│   │   └── appStore.ts
│   ├── types/              # TypeScript 类型
│   │   ├── index.ts
│   │   └── exam.ts
│   ├── styles/             # 样式系统
│   │   └── colors.ts       # 配色方案
│   ├── data/               # 数据文件（Git LFS）
│   │   ├── bibleData.ts    # 书卷元数据
│   │   ├── kjvBible.json   # KJV 圣经数据（10MB+）
│   │   └── bibleSearchIndex.json # 搜索索引（24MB+）
│   └── test/               # 测试配置
│       └── setup.ts
├── scripts/                # 构建脚本
│   └── parseBible.cjs      # EPUB 解析脚本
├── doc/                    # 文档
│   └── KJV.epub           # 原始圣经文件
├── public/                 # 静态资源
├── ARCHITECTURE.md         # 本文档
└── package.json
```

## 4. 核心模块

### 4.1 数据层

#### Bible 数据结构
```typescript
interface Book {
  id: string;           // 唯一标识，如 "genesis"
  name: string;         // 中文名，如 "创世记"
  nameEn: string;       // 英文名，如 "Genesis"
  chapters: Chapter[];
}

interface Chapter {
  chapter: number;
  verses: Verse[];
}

interface Verse {
  verse: number;
  text: string;         // 中文经文
  textEn: string;       // 英文经文（KJV）
}
```

#### 数据来源
- **中文**：和合本（已从 EPUB 提取）
- **英文**：King James Version (KJV)
- **格式**：JSON，按书卷-章节-经文层级组织

### 4.2 业务逻辑层

#### 考官模式 (Exam Mode)
- **输入**：章节数据
- **处理**：基于规则生成四类问题
  - 记忆类：关于具体事实
  - 理解类：关于章节主旨
  - 分析类：关于关系和意义
  - 应用类：关于实际应用
- **输出**：ExamQuestion[]

#### 随机经文 (Random Verse)
- **算法**：70% 概率选择诗篇/箴言，30% 其他书卷
- **去重**：短时间内避免重复显示
- **缓存**：本地存储浏览历史

### 4.3 展示层

#### 配色方案（Sacred Modernism）
```typescript
// Primary - Life/Growth
#89D385 (Botanist)
#D1EFBD (Matcha Latte)

// Secondary - Peace/Water
#6CD1F0 (Aquamarine)

// Accent - Spirit/Joy
#A1A1F7 (Grape Soda)
#EFCCEA (Pink Diamond)
```

#### 设计原则
- 大量留白（White Space）
- 圆角设计（Rounded Corners）
- 玻璃拟态（Glassmorphism）
- 衬线字体用于经文

## 5. 数据流

```
用户操作 → 组件 → Hook/Store → 业务逻辑 → 数据层
                ↓
              状态更新 → UI 重新渲染
```

### 5.1 状态管理
- **全局状态**：Zustand（用户偏好、学习进度）
- **本地状态**：React useState（组件级别）
- **数据获取**：直接导入 JSON（静态数据）

### 5.2 数据流向示例
**章节页面加载**：
1. URL 解析 bookId 和 chapterNumber
2. 从 bibleParser 获取章节数据
3. 渲染经文内容
4. 生成考官模式问题（异步）
5. 显示 UI

## 6. 开发规范

### 6.1 代码风格
- **语言**：TypeScript（严格模式）
- **样式**：Tailwind CSS + 内联样式（动态颜色）
- **组件**：函数组件 + Hooks
- **文件命名**：PascalCase（组件），camelCase（工具）

### 6.2 测试要求（TDD）- ⚠️ **强制规定**

> **🚨 重要：任何改动在没有通过 TDD 全面测试之前，不允许提交和 commit！**

#### 强制流程
```
写测试 → 运行测试（失败）→ 写实现 → 运行测试（通过）→ 重构 → 提交
```

#### 测试要求
- **覆盖率**：所有新功能必须有测试
- **测试框架**：Vitest + React Testing Library
- **测试文件**：`*.test.ts` 或 `*.test.tsx`
- **运行命令**：`npm test`

#### 提交前检查清单
- [ ] 所有测试通过（`npm test`）
- [ ] 没有测试失败的文件
- [ ] 新功能有对应的测试文件
- [ ] 代码审查通过

#### 违规后果
- ❌ 未通过测试的代码禁止提交
- ❌ 禁止跳过测试直接 commit
- ❌ 禁止提交带有 `.skip` 或 `.only` 的测试

### 6.3 Git 工作流
- **主分支**：`main`
- **功能分支**：`feature/issue-number-short-name`
- **提交规范**：清晰的提交信息，说明"为什么"而非"什么"

### 6.4 文件命名规范
```
组件：PascalCase.tsx（如 ExamMode.tsx）
工具：camelCase.ts（如 examGenerator.ts）
类型：PascalCase.ts（如 ExamQuestion.ts）
测试：*.test.ts
```

## 7. 架构决策记录 (ADR)

### 什么时候需要写 ADR？

**必须写 ADR 的情况**（涉及架构层面）：
- ✅ 引入新的技术栈或框架
- ✅ 改变数据存储方式（如：从 API 改为静态 JSON）
- ✅ 修改项目结构或目录组织
- ✅ 改变状态管理方案
- ✅ 修改构建或部署流程
- ✅ 引入新的设计模式
- ✅ 性能优化策略（影响整体架构）

**不需要写 ADR 的情况**（功能层面）：
- ❌ 添加新的 UI 组件
- ❌ 修改样式或配色
- ❌ 添加新的页面
- ❌ 修复 Bug
- ❌ 添加工具函数

### ADR 流程

```
发现问题/需求 → 讨论方案 → 写 ADR（草稿）→ 评审 → 实施 → 更新 ADR（已接受）
```

### ADR-001：数据文件不上传 Git
**状态**：已接受

**背景**：KJV Bible 数据文件超过 10MB，不适合 Git 版本控制。

**决策**：
- 大文件（>5MB）加入 .gitignore
- 在 CI/CD 中通过其他方式获取数据
- 开发时本地保留数据文件

**后果**：
- ✅ 减少仓库体积
- ✅ 加快克隆速度
- ❌ 新开发者需要手动获取数据文件

### ADR-002：使用静态 JSON 而非 API
**状态**：已接受

**背景**：圣经数据是静态的，不需要频繁更新。

**决策**：
- 使用静态 JSON 文件
- 直接导入到前端
- 构建时打包

**后果**：
- ✅ 无需后端服务器
- ✅ 离线可用
- ✅ 响应速度快
- ❌ 初始加载文件较大（8MB+）

### ADR-003：TDD 开发模式
**状态**：已接受

**背景**：需要确保代码质量和可维护性。

**决策**：
- 先写测试，再写实现
- 每个功能必须有对应测试
- 测试作为文档的一部分

**后果**：
- ✅ 代码质量高
- ✅ 便于重构
- ✅ 减少 Bug
- ❌ 开发时间增加 20-30%

### ADR-004：Issue 拆分原则
**状态**：已接受

**背景**：大 Issue 难以管理和实施，需要明确拆分标准。

**决策**：

#### 什么时候必须拆分 Issue？
满足以下任一条件：
- 描述超过 500 字或 10 个要点
- 涉及 3 个以上独立功能模块
- 预计开发时间超过 1 周
- 需要修改 3 个以上不同目录的文件
- 包含"和"、"同时"、"另外"等多个并行任务

#### 拆分原则（Decomposition Rules）

**1. 单一职责原则**
- 每个 Issue 只解决一个问题
- 每个 Issue 只实现一个功能

**2. 独立性原则**
- 拆分后的 Issue 可以独立开发
- 拆分后的 Issue 可以独立测试
- 拆分后的 Issue 可以独立部署

**3. 可交付原则**
- 每个小 Issue 都有明确的交付物
- 每个小 Issue 都能在 3 天内完成

#### 拆分示例

**❌ 大 Issue（需要拆分）**
```
标题：重构整个网站
内容：
1. 更换 UI 框架
2. 重写所有组件
3. 添加用户系统
4. 添加支付功能
5. 添加后台管理
```

**✅ 拆分后的小 Issue**
- Issue #1: 更换 UI 框架（基础架构）
- Issue #2: 实现用户系统（功能模块）
- Issue #3: 添加支付功能（功能模块）
- Issue #4: 添加后台管理（功能模块）

**后果**：
- ✅ Issue 更清晰，易于理解
- ✅ 可以并行开发
- ✅ 便于代码审查
- ✅ 减少开发风险
- ❌ 需要更多时间进行 Issue 管理

## 8. 性能优化

### 8.1 当前优化
- **代码分割**：Vite 自动分割
- **懒加载**：React.lazy（待实现）
- **图片优化**：使用 SVG 图标

### 8.2 待优化项
- [ ] 圣经数据按需加载（当前打包 8MB+）
- [ ] 虚拟滚动（长列表）
- [ ] Service Worker 缓存
- [ ] 图片懒加载

### 8.3 性能指标
- **首屏加载**：< 3s（目标）
- **交互响应**：< 100ms
- ** Lighthouse 评分**：> 90

## 9. 扩展指南

### 9.1 如何添加新的圣经版本？
1. 准备新版本的 JSON 数据
2. 在 `src/data/` 添加数据文件
3. 在 `bibleParser.ts` 添加版本切换逻辑
4. 在 Settings 页面添加版本选择器

### 9.2 如何添加新的学习模式？
1. 在 `src/types/` 定义新模式的数据类型
2. 在 `src/lib/` 创建业务逻辑
3. 在 `src/components/features/` 创建 UI 组件
4. 在对应页面集成新组件
5. 编写测试

### 9.3 如何支持多语言？
1. 使用 i18n 库（如 react-i18next）
2. 提取所有文本到翻译文件
3. 添加语言切换器
4. 考虑 RTL 布局（如果需要）

## 10. 更新日志

### 2026-02-20
- 创建 ARCHITECTURE.md
- 记录当前架构状态
- 添加 ADR 记录

---

## 附录

### 常用命令
```bash
# 开发
npm run dev

# 测试
npm test

# 构建
npm run build

# 预览
npm run preview
```

### 相关文档
- [开发文档](./Bible101_开发文档.md)
- [GitHub Issues](https://github.com/woody1983/bible101/issues)

### 联系方式
- 项目维护者：woody1983
- 问题反馈：GitHub Issues
