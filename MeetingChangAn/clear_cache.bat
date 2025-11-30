@echo off
echo 正在清理微信小程序缓存...

:: 删除可能的缓存目录
if exist ".temp" rmdir /s /q ".temp"
if exist "miniprogram_npm" rmdir /s /q "miniprogram_npm"
if exist "node_modules" rmdir /s /q "node_modules"

:: 删除IDE可能的缓存文件
if exist ".idea\.workspace.xml" del ".idea\.workspace.xml"

echo 清理完成！请在微信开发者工具中重新编译项目。

pause