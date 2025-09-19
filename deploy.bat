@echo off
echo ========================================
echo     Portfolio Deployment Helper
echo ========================================
echo.

echo This script will help you prepare your portfolio for deployment.
echo.

echo Checking your portfolio files...
echo.

REM Check if main files exist
if exist "index.html" (
    echo ✓ index.html found
) else (
    echo ✗ index.html missing!
    goto :error
)

if exist "css\style.css" (
    echo ✓ CSS files found
) else (
    echo ✗ CSS files missing!
    goto :error
)

if exist "js\script.js" (
    echo ✓ JavaScript files found
) else (
    echo ✗ JavaScript files missing!
    goto :error
)

echo.
echo ========================================
echo     Pre-Deployment Checklist
echo ========================================
echo.

echo Please confirm you have updated the following:
echo.
echo 1. Personal information in js/data.js
set /p q1="   Have you updated your name, bio, and contact info? (y/n): "

echo 2. Contact information
set /p q2="   Have you updated your email and phone number? (y/n): "

echo 3. Social media links
set /p q3="   Have you updated your LinkedIn, GitHub, etc. links? (y/n): "

echo 4. Project information
set /p q4="   Have you updated your project details? (y/n): "

echo 5. Images
set /p q5="   Have you added your profile picture and project images? (y/n): "

echo.

if /i "%q1%"=="y" if /i "%q2%"=="y" if /i "%q3%"=="y" if /i "%q4%"=="y" if /i "%q5%"=="y" (
    echo ✓ All items confirmed!
    goto :deployment_options
) else (
    echo.
    echo ⚠️  Please complete the missing items before deployment.
    echo   Check DEVELOPMENT.md for detailed instructions.
    pause
    exit /b 1
)

:deployment_options
echo.
echo ========================================
echo     Deployment Options
echo ========================================
echo.
echo Choose your deployment method:
echo.
echo 1. GitHub Pages (Recommended for beginners)
echo 2. Netlify (Drag and drop)
echo 3. Vercel (Performance focused)
echo 4. Create ZIP for manual upload
echo 5. Open hosting guide
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto :github_pages
if "%choice%"=="2" goto :netlify
if "%choice%"=="3" goto :vercel
if "%choice%"=="4" goto :create_zip
if "%choice%"=="5" goto :open_guide
goto :invalid_choice

:github_pages
echo.
echo ========================================
echo     GitHub Pages Deployment
echo ========================================
echo.
echo 1. Create a GitHub account at https://github.com
echo 2. Create a new repository named 'portfolio'
echo 3. Upload all your files to the repository
echo 4. Go to Settings → Pages → Enable GitHub Pages
echo.
echo Would you like me to open GitHub for you?
set /p open_github="Open GitHub in browser? (y/n): "
if /i "%open_github%"=="y" start https://github.com
echo.
echo For detailed instructions, check HOSTING.md
pause
goto :end

:netlify
echo.
echo ========================================
echo     Netlify Deployment
echo ========================================
echo.
echo 1. Go to https://netlify.com and create account
echo 2. Drag and drop your portfolio folder to deploy
echo 3. Your site will be live instantly!
echo.
echo Would you like me to open Netlify for you?
set /p open_netlify="Open Netlify in browser? (y/n): "
if /i "%open_netlify%"=="y" start https://netlify.com
echo.
echo Creating ZIP file for upload...
goto :create_zip

:vercel
echo.
echo ========================================
echo     Vercel Deployment
echo ========================================
echo.
echo 1. Go to https://vercel.com and sign up
echo 2. Import your project from GitHub
echo 3. Deploy with one click!
echo.
echo Would you like me to open Vercel for you?
set /p open_vercel="Open Vercel in browser? (y/n): "
if /i "%open_vercel%"=="y" start https://vercel.com
pause
goto :end

:create_zip
echo.
echo ========================================
echo     Creating Deployment Package
echo ========================================
echo.

REM Create deployment folder
if exist "portfolio-deploy" rmdir /s /q "portfolio-deploy"
mkdir "portfolio-deploy"

REM Copy files (excluding development files)
echo Copying files...
copy "index.html" "portfolio-deploy\" >nul
xcopy "css" "portfolio-deploy\css\" /e /i /q >nul
xcopy "js" "portfolio-deploy\js\" /e /i /q >nul
xcopy "assets" "portfolio-deploy\assets\" /e /i /q >nul

REM Copy documentation
copy "README.md" "portfolio-deploy\" >nul

echo.
echo ✓ Files prepared in 'portfolio-deploy' folder
echo.
echo You can now:
echo 1. ZIP the 'portfolio-deploy' folder
echo 2. Upload to your hosting provider
echo 3. Or drag-drop to Netlify/Surge
echo.

REM Open folder
echo Opening deployment folder...
start explorer "portfolio-deploy"

pause
goto :end

:open_guide
echo.
echo Opening hosting guide...
if exist "HOSTING.md" (
    start notepad "HOSTING.md"
) else (
    echo HOSTING.md not found!
)
pause
goto :end

:invalid_choice
echo.
echo Invalid choice. Please enter 1-5.
echo.
goto :deployment_options

:error
echo.
echo ❌ Error: Missing required files!
echo Make sure you're running this from your portfolio directory.
echo.
pause
exit /b 1

:end
echo.
echo ========================================
echo     Deployment Helper Complete
echo ========================================
echo.
echo Good luck with your portfolio! 🚀
echo.
echo For support:
echo - Check HOSTING.md for detailed instructions
echo - Check DEVELOPMENT.md for customization
echo.
pause