# Graph Report - my-ml-app  (2026-11-14)

## Corpus Check
- 12 files · ~12,041 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 274 nodes · 488 edges · 37 communities (16 shown, 21 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 44 edges (avg confidence: 0.88)
- Token cost: 1,200 input · 450 output

## Community Hubs (Navigation)
- Plant Disease ML Inference Pipeline
- Expo App Configuration (app.json)
- Project Specifications & AI Guardrails
- UI Theming & System Splash Components
- Pindai Cepat & Main App Navigation
- Core Runtime & Asset Dependencies
- Project Manifest & Styling Dependencies
- Project Template Reset Utilities
- Plant Photo Datasets & Samples
- Metro Bundler & NativeWind Integration
- TypeScript Base Configuration
- Android Adaptive Icons & Branding
- Build Scripts & Platform Tasks
- Navigation Tab Bar Icons
- Application Brand Logos & Web Assets
- React Framework Branding Assets
- Expo Platform Badges
- Expo Splash Screen Icons
- Expo Constants Integration
- Expo Dev Client Integration
- Expo Device Hardware Integration
- Expo Font Loading Module
- Expo Glass Effect Module
- Expo Image Display Component
- Expo Linking & Deep Navigation
- Expo Status Bar Controls
- Expo UI UI Primitives
- Expo Web Browser Wrapper
- React DOM Web Target Support
- React Native Gesture Handler Support
- React Native SVG Vector Rendering
- React Native Worklets Engine
- TensorFlow.js Core Inference Engine
- TensorFlow.js React Native Adapter

## God Nodes (most connected - your core abstractions)
1. `react-native` - 22 edges
2. `lucide-react-native` - 16 edges
3. `Smart Plant Disease App (Expo Project)` - 15 edges
4. `expo` - 14 edges
5. `expo-router` - 14 edges
6. `react` - 14 edges
7. `HeaderDetectComponent()` - 10 edges
8. `react-native-safe-area-context` - 10 edges
9. `TipsComponent()` - 9 edges
10. `TitleCardComponent()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Expo` --branded_with--> `Expo Symbol SVG Icon (expo-symbol 2.svg)`  [INFERRED]
  README.md → assets/expo.icon/Assets/expo-symbol 2.svg
- `Smart Plant Disease App (Expo Project)` --uses_asset--> `Expo Symbol SVG Icon (expo-symbol 2.svg)`  [INFERRED]
  README.md → assets/expo.icon/Assets/expo-symbol 2.svg
- `STAGE1_CLASSES` --implements--> `Two-Stage ML Pipeline Specification`  [INFERRED]
  src/app/pindai_cepat.tsx → AGENTS.md
- `DISEASE_MODEL_ASSETS` --implements--> `Two-Stage ML Pipeline Specification`  [INFERRED]
  src/app/pindai_cepat.tsx → AGENTS.md
- `PindaiCepatApp()` --implements--> `Pindai Cepat Feature Specification`  [INFERRED]
  src/app/pindai_cepat.tsx → AGENTS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Pindai Cepat Subsystem** — agents_md_pindai_cepat_feature, agents_md_two_stage_ml_pipeline, src_app_pindai_cepat_pindaicepatapp, src_components_bottom_navigation_bottomnavigationcomponent [INFERRED 0.85]

## Communities (37 total, 21 thin omitted)

### Community 0 - "Plant Disease ML Inference Pipeline"
Cohesion: 0.19
Nodes (21): PLANT_DATA, buffer, expo-asset, expo-file-system, expo-image-manipulator, expo-image-picker, jpeg-js, react (+13 more)

### Community 1 - "Expo App Configuration (app.json)"
Cohesion: 0.07
Nodes (29): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, projectId (+21 more)

### Community 2 - "Project Specifications & AI Guardrails"
Cohesion: 0.08
Nodes (27): AGENTS.md System Prompt & Project Context, Tensor Processing & Normalization [1, 224, 224, 3], Two-Stage ML Pipeline Specification, Expo Symbol SVG Icon (expo-symbol 2.svg), SVG Path Shape (white filled A/chevron symbol, 652x606), Android Emulator, app directory (file-based routing), app-example directory (+19 more)

### Community 3 - "UI Theming & System Splash Components"
Cohesion: 0.10
Nodes (15): expo-splash-screen@~57.0.10, expo-symbols@~57.0.3, react-native-reanimated@4.5.1, expo-splash-screen, expo-symbols, react-native-reanimated, Collapsible(), styles (+7 more)

### Community 4 - "Pindai Cepat & Main App Navigation"
Cohesion: 0.23
Nodes (10): Pindai Cepat Feature Specification, expo-router, lucide-react-native, react-native, App(), PanduanApp(), PindaiCepatApp(), BottomNavigationComponent() (+2 more)

### Community 5 - "Core Runtime & Asset Dependencies"
Cohesion: 0.12
Nodes (17): dependencies, buffer@^6.0.3, expo-asset@~57.0.20, expo-file-system@~57.0.7, expo-image-manipulator@~57.0.21, expo-image-picker@~57.0.20, expo-router@~57.0.28, expo-system-ui@~57.0.4 (+9 more)

### Community 6 - "Project Manifest & Styling Dependencies"
Cohesion: 0.18
Nodes (13): react-native-screens@~4.26.0, devDependencies, tailwindcss@^3.4.19, @types/react@~19.2.2, typescript@~6.0.3, main, name, private (+5 more)

### Community 7 - "Project Template Reset Utilities"
Cohesion: 0.17
Nodes (7): exampleDirPath, fs, oldDirs, path, readline, rl, root

### Community 8 - "Plant Photo Datasets & Samples"
Cohesion: 0.71
Nodes (8): Chili Plant Photo (Cabai), Corn/Maize Plant Photo (Jagung), Potato Plant Photo (Kentang), Rice Plant Photo (Padi), Tomato Plant Photo (Tomat), Home / Plant Selection Screen (Beranda - Pilih Tanaman), Guide / Tutorial Screen (Panduan), Tomato Disease Detection Result Screen

### Community 9 - "Metro Bundler & NativeWind Integration"
Cohesion: 0.25
Nodes (7): config, { getDefaultConfig }, { withNativeWind }, expo@~57.0.30, nativewind@^4.2.7, expo, nativewind

### Community 10 - "TypeScript Base Configuration"
Cohesion: 0.25
Nodes (7): expo/tsconfig.base, compilerOptions, paths, strict, extends, include, @/assets/*

### Community 11 - "Android Adaptive Icons & Branding"
Cohesion: 0.29
Nodes (7): Expo Icon Grid Overlay Template (1024x1024), Android Adaptive Icon Background (512x512), Android Adaptive Icon Foreground (512x512), Android Monochrome Icon (432x432), Web Favicon (48x48), App Icon (1024x1024), Logo Glow Effect (604x604)

### Community 12 - "Build Scripts & Platform Tasks"
Cohesion: 0.29
Nodes (7): scripts, android, ios, lint, reset-project, start, web

### Community 13 - "Navigation Tab Bar Icons"
Cohesion: 0.33
Nodes (6): Tab Icon: Explore - 1x/2x/3x density variants, Explore Tab Icon @2x, Explore Tab Icon @3x, Tab Icon: Home - 1x/2x/3x density variants, Home Tab Icon @2x, Home Tab Icon @3x

### Community 14 - "Application Brand Logos & Web Assets"
Cohesion: 0.67
Nodes (3): App Plant Logo (2000x2000), Smart Plant Disease Logo (170x177), Tutorial Web Screenshot (1480x855)

### Community 15 - "React Framework Branding Assets"
Cohesion: 0.67
Nodes (3): React Logo - 1x/2x/3x density variants, React Logo @2x, React Logo @3x

## Knowledge Gaps
- **33 isolated node(s):** `expo/tsconfig.base`, `Expo Icon Grid Overlay Template (1024x1024)`, `Android Monochrome Icon (432x432)`, `Web Favicon (48x48)`, `Android Adaptive Icon Background (512x512)` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 110 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AGENTS.md System Prompt & Project Context` connect `Project Specifications & AI Guardrails` to `Pindai Cepat & Main App Navigation`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Smart Plant Disease App (Expo Project)` (e.g. with `AGENTS.md System Prompt & Project Context` and `Expo Symbol SVG Icon (expo-symbol 2.svg)`) actually correct?**
  _`Smart Plant Disease App (Expo Project)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `expo/tsconfig.base`, `Expo Icon Grid Overlay Template (1024x1024)`, `Android Monochrome Icon (432x432)` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Expo App Configuration (app.json)` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `Pindai Cepat & Main App Navigation` to `Plant Disease ML Inference Pipeline`, `UI Theming & System Splash Components`, `Core Runtime & Asset Dependencies`, `Project Manifest & Styling Dependencies`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Should `Project Specifications & AI Guardrails` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Should `UI Theming & System Splash Components` be split into smaller, more focused modules?**
  _Cohesion score 0.09666666666666666 - nodes in this community are weakly interconnected._