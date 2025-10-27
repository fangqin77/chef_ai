@echo off
REM 检查是否已设置JAVA_HOME
if defined JAVA_HOME (
    echo JAVA_HOME已设置为: %JAVA_HOME%
) else (
    echo 未设置JAVA_HOME环境变量
    echo 请设置JAVA_HOME环境变量指向你的Java安装目录
    echo 例如: set JAVA_HOME=C:\Program Files\Java\jdk-17
    pause
    exit /b
)

REM 检查Java是否可用
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo 未找到Java命令，请检查Java安装和PATH环境变量
    pause
    exit /b
)

REM 启动后端服务
mvnw spring-boot:run