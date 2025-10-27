# 项目运行指南

## 环境要求

1. Java 17 或更高版本
2. Node.js (推荐使用最新稳定版)
3. MySQL 8.0 或更高版本

## 后端服务启动步骤

### 1. 设置Java环境变量

在Windows系统中：

1. 打开"控制面板" -> "系统和安全" -> "系统" -> "高级系统设置"
2. 点击"环境变量"
3. 在"系统变量"中找到"Path"，选中后点击"编辑"
4. 添加Java的bin目录路径，例如：`C:\Program Files\Java\jdk-17\bin`
5. 或者新建一个系统变量`JAVA_HOME`，值为Java安装目录，例如：`C:\Program Files\Java\jdk-17`

### 2. 配置数据库

1. 确保MySQL服务正在运行
2. 创建数据库：
   ```sql
   CREATE DATABASE chef_ai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. 在`chef_ai_backend/src/main/resources/application.properties`中配置数据库连接信息：
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/chef_ai?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
   spring.datasource.username=你的数据库用户名
   spring.datasource.password=你的数据库密码
   ```

### 3. 启动后端服务

方法一：使用启动脚本（推荐）
```
cd chef_ai_backend
start_backend.bat
```

方法二：手动启动
```
cd chef_ai_backend
./mvnw spring-boot:run
```

### 4. 导入数据（可选）

运行`schema.sql`文件创建表结构：
```sql
source chef_ai_backend/src/main/schema.sql
```

## 前端运行步骤

1. 安装HBuilderX开发工具
2. 导入项目
3. 点击运行按钮

## 常见问题排查

### 1. 连接被拒绝（ERR_CONNECTION_REFUSED）

这通常表示后端服务没有运行或端口配置不正确：

1. 检查后端服务是否正常启动
2. 检查前端配置文件`config/api.js`中的端口是否正确（应为8081）
3. 检查防火墙设置是否阻止了端口访问

### 2. 数据库连接失败

1. 检查MySQL服务是否正在运行
2. 检查`application.properties`中的数据库配置是否正确
3. 确保数据库用户有正确的权限

### 3. 页面数据无法加载

1. 检查浏览器控制台是否有错误信息
2. 确认后端API是否返回了正确的数据
3. 检查前端代码中的请求URL是否正确