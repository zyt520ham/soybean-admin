commit type:

```csv
init:     项目初始化
feat:     添加新特性
fix:      修复bug
docs:     仅仅修改文档
style:    仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
refactor: 代码重构，没有加新功能或者修复bug
perf:     优化相关，比如提升性能、体验
test:     添加测试用例
build:    依赖相关的内容
ci:       CI配置相关，例如对k8s，docker的配置文件的修改
```

commit scope:

```csv
projects                       (项目搭建)
components                     (组件相关)
hooks                          (hook 相关)
utils                          (utils 相关)
types                          (ts类型相关)
styles                         (样式相关)
deps                           (项目依赖)
auth                           (对 auth 修改)
release                        (版本发布)
other                          (其他修改)
```
