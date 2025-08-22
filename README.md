# 🐠 AquaFeed Monitor - Automatic Fish Feeder

A modern web application for monitoring and controlling an automatic fish feeder system with real-time water quality monitoring.

![AquaFeed Monitor Dashboard](https://via.placeholder.com/800x400?text=AquaFeed+Monitor+Dashboard)

## 🌟 Features

- **Real-time Monitoring**: Track water temperature and pH levels
- **Automatic Feeding**: Control and schedule fish feeding remotely
- **Data Visualization**: Beautiful charts showing sensor data history
- **Alert System**: Get notified when water conditions need attention
- **Feeding Log**: Keep track of all feeding activities
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Quick Start

This guide will help you get the application running on your computer, even if you have no coding experience.

### Prerequisites

Before you begin, you'll need to install these programs on your computer:

1. **Node.js** (version 16 or higher)
   - Go to [nodejs.org](https://nodejs.org/)
   - Download the "LTS" version (recommended for most users)
   - Run the installer and follow the setup wizard
   - To verify installation, open Terminal/Command Prompt and type: `node --version`

2. **Git** (optional, but recommended)
   - Go to [git-scm.com](https://git-scm.com/)
   - Download and install for your operating system

### 📦 Installation

#### Option 1: Using Git (Recommended)

1. **Open Terminal/Command Prompt**
   - **Windows**: Press `Win + R`, type `cmd`, press Enter
   - **Mac**: Press `Cmd + Space`, type "Terminal", press Enter
   - **Linux**: Press `Ctrl + Alt + T`

2. **Navigate to where you want to install the app**
   ```bash
   cd Desktop
   ```

3. **Download the application**
   ```bash
   git clone https://github.com/musajubril/automatic-fish-feeder.git
   cd automatic-fish-feeder
   ```

#### Option 2: Download ZIP file

1. Click the green "Code" button on the GitHub page
2. Select "Download ZIP"
3. Extract the ZIP file to your desired location
4. Open Terminal/Command Prompt and navigate to the extracted folder

### 🔧 Setup

1. **Install dependencies** (this downloads all the required components)
   ```bash
   npm install
   ```
   
   This may take a few minutes. You'll see a progress indicator.

2. **Start the application**
   ```bash
   npm run dev
   ```

3. **Open your web browser** and go to:
   ```
   http://localhost:5173
   ```

🎉 **Congratulations!** The AquaFeed Monitor should now be running in your browser.

## 📱 How to Use

### Dashboard Overview
- **Sensor Readings**: View current water temperature and pH levels
- **Feed Control**: Manually feed your fish with the feed button
- **Alerts**: Monitor any water quality warnings
- **Charts**: See historical data trends
- **Feeding Log**: Review past feeding activities

### Manual Feeding
1. Click the "Feed Fish" button in the Feed Control section
2. The system will dispense food automatically
3. The feeding will be logged with timestamp

### Monitoring Water Quality
- **Temperature**: Should typically be between 72-78°F (22-26°C) for most fish
- **pH Level**: Should be between 6.5-7.5 for most freshwater fish
- **Alerts**: The system will warn you if levels are outside safe ranges

## 🛠️ Troubleshooting

### Common Issues

**Problem**: `npm: command not found`
- **Solution**: Node.js is not installed properly. Reinstall Node.js from [nodejs.org](https://nodejs.org/)

**Problem**: `Port 5173 is already in use`
- **Solution**: Close other applications using this port, or the app will automatically use a different port

**Problem**: Page shows "Cannot GET /"
- **Solution**: Make sure you're accessing `http://localhost:5173` (note the port number)

**Problem**: Sensor readings show "No data"
- **Solution**: This is normal for the demo version. Real sensor data would come from your hardware setup

### Getting Help

If you encounter any issues:

1. **Check the Terminal/Command Prompt** for error messages
2. **Try refreshing your browser** (press F5 or Ctrl+R)
3. **Restart the application**:
   - Press `Ctrl + C` in Terminal to stop
   - Run `npm run dev` again to restart

## 🔧 Building for Production

If you want to create a version that can be deployed to a web server:

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

## 📁 Project Structure

```
project/
├── src/                    # Source code
│   ├── components/         # User interface components
│   ├── hooks/             # Data management
│   └── types/             # Data definitions
├── package.json           # Project configuration
├── index.html            # Main HTML file
└── README.md             # This file
```

## 🔄 Updating the Application

To get the latest version:

1. **Stop the application** (press `Ctrl + C` in Terminal)
2. **Pull updates**:
   ```bash
   git pull origin main
   ```
3. **Update dependencies**:
   ```bash
   npm install
   ```
4. **Restart**:
   ```bash
   npm run dev
   ```

## 💡 Tips for Beginners

- **Keep Terminal open**: Don't close the Terminal/Command Prompt window while using the app
- **Browser refresh**: If something looks wrong, try refreshing your browser
- **Multiple tabs**: You can open the app in multiple browser tabs
- **Data persistence**: Currently, data resets when you restart the app (this is normal for the demo)

## 🤝 Contributing

This project welcomes contributions! If you'd like to help improve it:

1. Fork the repository
2. Create a new branch for your changes
3. Make your improvements
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

- **Issues**: Report bugs on the [GitHub Issues page](https://github.com/musajubril/automatic-fish-feeder/issues)
- **Documentation**: Check this README for common questions
- **Community**: Join discussions in the repository

---

Made with ❤️ for fish enthusiasts and aquarium hobbyists
