# 项目进度

English translation: [PROGRESS.en.md](PROGRESS.en.md)

更新时间：2026-10-11。项目目录 build-with-ai-basics-2026；用户已明确授权完成材料、公开发布和最终提交，不需重复请求发布权限。

## 已完成与证据
- 独立新项目；官方 Skill Pack 固定 a0f0657，先规划后编码（85aa076→3b61980→4889ad8）。课程默认逐份审阅/采访节奏按用户自主执行要求调整，未编造个人练习或确认。
- RuleTrace 核心流程：规则/更新→原文证据→截止冲突→明确选择→清单→Markdown/ICS 下载。无运行时模型、付费服务或第三方 npm 依赖。
- 12 项测试通过；真实桌面/移动端检查、来源弹窗、恶意文本、失效结果、UTC 导出均验证。详见 docs/verification.md。
- 公开仓库已创建并推送：https://github.com/cgair/ruletrace 。API 确認 public/MIT；匿名 HTTP 200。
- 免费演示已发布：https://cgair.github.io/ruletrace/ 。匿名首页/模块 HTTP 200；浏览器实际点击示例/分析显示 2 sources / 14 evidence candidates / 2 review flags，日期选择前禁用日历。
- 真实连续演示捕获完成：669 帧、138.005秒原始过程，编码 MP4 138.20秒；附英文字幕、无音轨、明确合成示例，无用户无关页面。整段解码通过并检查关键帧。文件 artifacts/video/ruletrace-demo.mp4。
- 已准备英文提交内容/Skill Pack 说明、图片、封面、技术字幕文字稿；公开文档 docs/submission-content.en.md、docs/media/、docs/demo-transcript.en.md。
- 官网恢复；当前规则及支付/税务条款已核实在 docs/rules-checklist.md。截止北京时间 2026-10-27 05:00。

## 当前阻碍
- Devpost 账号已登录，但赛事未报名。My projects 明确要求 Register for this hackathon。
- 报名页要求本人开发信心(1–5)、身份类别、资格/规则声明。已异步请用户到后台报名页自行完成，尚未收到答复；未编造任何个人答案或勾选声明。
- 年龄、居住地、利益冲突事实也已集中询问，无答复。用户先前要求个人资格声明由本人完成仍有效。
- 最终提交表单在报名之后才能查看；当前只确认公告新增 Skill Pack 说明、成年勾选，以及 Try it out 必须放公开仓库。无最终提交成功凭证。
- YouTube 已公开发布：https://youtu.be/yXzfrWDzOv0 。Studio 返回 Video published；匿名 oEmbed HTTP 200 标题一致。平台显示2:19，本地实际138.20秒。

## 保留的后台任务页
专用 Chrome：报名 https://learn-ai-basics.devpost.com/register 、My projects、YouTube Studio、本项目本地/线上演示、官方规则。默认后台，不切换用户当前窗口。MCP 使用最新 visible_chrome.py 固定持久专用 profile，不用旧 autoConnect。桥接交互应关闭本任务 PTY canonical/echo，避免长文案截断；具体命令见本 session 工具记录。

## 下一步
1. 发布材料已齐；等待用户本人完成赛事报名与必要资格事实。
2. 用户本人报名并补必要资格事实后，读取真实最终表单，填入已备内容/图片/链接。
3. 如有本人主观学习/退出问卷，只请用户补该项；不得代造。文案如有本人撰写声明须按实际文本处理。
4. 按已有授权正式提交，保存成功凭证；不要把仓库/视频发布称为参赛提交成功。

## 本地启动
npm start → http://127.0.0.1:4173 。端口只绑定回环；不影响旧交易项目或调度。个人 learner-profile、凭据文件、raw captures/工具均未纳入 Git。
