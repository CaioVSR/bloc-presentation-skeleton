# 🚀 Bloc Presentation Skeleton

[![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)](https://github.com/CaioVSR/bloc-presentation-skeleton)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.102.0+-brightgreen.svg)](https://code.visualstudio.com/)
[![Flutter](https://img.shields.io/badge/Flutter-Ready-02569B.svg)](https://flutter.dev/)

**Supercharge your Flutter development with instant Cubit boilerplate generation!**

Generate complete, production-ready Cubit architecture files with a single right-click. This extension follows Flutter best practices and automatically adapts to your project structure and dependencies.

## ✨ Features

### 🎯 One-Click Generation
- **Right-click any folder** → Select "Presentation Skeleton: New Cubit"
- **Enter class name** → Get 3 perfectly structured files instantly
- **Smart folder detection** → Works anywhere in your project

### 🧠 Intelligent Project Analysis
- **📦 Auto-detects package name** from `pubspec.yaml`
- **🔍 Scans dependencies** (Equatable support)
- **📁 Smart import paths** generation
- **🎯 Adaptive folder creation** (creates `cubit` folder when needed)

### 📄 Generated Files
1. **`{name}_cubit.dart`** - Main Cubit logic with proper imports
2. **`{name}_state.dart`** - State definitions (with/without Equatable)
3. **`{name}_presentation_event.dart`** - Event definitions

### 🔧 Smart Behaviors
- **Inside cubit folder** → Creates files directly
- **Outside cubit folder** → Creates cubit folder + files
- **Equatable detected** → Includes Equatable inheritance and props
- **No Equatable** → Uses standard Dart equality

## 🚀 Quick Start

### 1. Installation
Install the extension from VS Code Marketplace or install manually.

### 2. Usage
1. **Right-click** on any folder in your Flutter project
2. Select **"Presentation Skeleton: New Cubit"**
3. **Enter your class name** (e.g., `UserProfile`, `Counter`, `Auth`)
4. **Done!** ✨ Three files are created with proper boilerplate

## 📋 Requirements

- **VS Code** 1.102.0 or higher
- **Flutter project** with `pubspec.yaml`
- **Dart** support enabled

## 📝 Generated Code Example

For a class named `UserProfile`, you'll get:

### 📄 `user_profile_cubit.dart`
```dart
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:your_app/path/user_profile_state.dart';
import 'package:your_app/path/user_profile_presentation_event.dart';

class UserProfileCubit extends Cubit<UserProfileState> {
  UserProfileCubit() : super(UserProfileInitial());

  void handleEvent(UserProfilePresentationEvent event) {
    // TODO: Implement event handling logic
  }
}
```

### 📄 `user_profile_state.dart`
```dart
import 'package:equatable/equatable.dart';

abstract class UserProfileState extends Equatable {
  const UserProfileState();

  @override
  List<Object> get props => [];
}

class UserProfileInitial extends UserProfileState {}

class UserProfileLoading extends UserProfileState {}

class UserProfileSuccess extends UserProfileState {}

class UserProfileError extends UserProfileState {
  final String message;

  const UserProfileError(this.message);

  @override
  List<Object> get props => [message];
}
```

### 📄 `user_profile_presentation_event.dart`
```dart
import 'package:equatable/equatable.dart';

abstract class UserProfilePresentationEvent extends Equatable {
  const UserProfilePresentationEvent();

  @override
  List<Object> get props => [];
}
```

## 🏗️ Architecture

This extension follows clean architecture principles:

```
src/
├── services/           # Core business logic
│   ├── command-handler.ts    # VS Code command handling
│   ├── code-generator.ts     # File generation orchestration
│   └── flutter-analyzer.ts   # Project analysis
├── templates/          # Code templates
│   ├── cubit-template.ts
│   ├── state-template.ts
│   └── presentation-event-template.ts
├── utils/             # Utilities
│   ├── file-utils.ts        # File system operations
│   └── string-utils.ts      # String manipulation
└── extension.ts       # Entry point
```

## 🎯 Naming Conventions

- **Input**: PascalCase (e.g., `UserProfile`, `ShoppingCart`)
- **Files**: snake_case (e.g., `user_profile_cubit.dart`)
- **Classes**: PascalCase (e.g., `UserProfileCubit`)

## 🔄 Smart Folder Detection

| Current Location | Action |
|-----------------|--------|
| `📁 any_folder/` | Creates `📁 cubit/` + files |
| `📁 cubit/` | Creates files directly |
| `📁 bloc/` | Creates files directly |

## 🚧 Coming Soon

- 🎪 **Bloc support** (in addition to Cubit)
- 📊 **Repository pattern** generation
- 🧪 **Test file** generation
- ⚙️ **Customizable templates**
- 🎨 **Code snippets**

## 🐛 Known Issues

Currently no known issues. If you find any, please [open an issue](https://github.com/CaioVSR/bloc-presentation-skeleton/issues).

## 📈 Release Notes

### 0.0.1 - Initial Release
- ✅ Cubit generation with smart folder detection
- ✅ Automatic Flutter project analysis
- ✅ Equatable dependency detection
- ✅ Clean architecture implementation
- ✅ Proper import path generation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License.

## 💝 Support

If this extension helps you, consider:
- ⭐ **Starring** the repository
- 🐛 **Reporting** issues
- 💡 **Suggesting** features
- 📢 **Sharing** with colleagues

---

**Happy coding!** 🎉

Made with ❤️ for the Flutter community
