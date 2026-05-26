# 3D Model System — PROJECT.md

## Overview
This project is a code-first 3D model editor built for developers working with 3D printing.
It allows users to create, edit, and visualize 3D models using OpenJSCAD code, with real-time rendering and STL export.

The system focuses on developer experience, providing an IDE-like environment where code directly generates 3D geometry ready for printing.

---

## Core Philosophy
- Code-first approach
- Code is the single source of truth
- 3D visualization is derived from code execution
- STL is an output format, not the primary source

> The system transforms code into printable 3D models.

---

## Main Features
- Code editor powered by Monaco (VS Code-like experience)
- Real-time 3D rendering
- Export models to STL
- Upload STL files
- Convert STL to OpenJSCAD code (experimental)

---

## User Flow

### Create Model (Code-first)
1. User writes OpenJSCAD code
2. Code is executed in the browser
3. Geometry is generated
4. Model is rendered in the viewer
5. User exports STL

### Edit via STL (Experimental)
1. User uploads an STL file
2. System attempts to generate equivalent OpenJSCAD code
3. User edits the generated code
4. Visualization updates in real time

---

## System Architecture

### Frontend
- Next.js (App Router)
- Server Components by default

### Editor
- Monaco Editor

### 3D Engine
- OpenJSCAD for geometry generation
- Three.js + react-three-fiber for rendering

### Execution
- Code runs directly in the browser

### State Management
- Zustand for global state
- Context API for feature-scoped state

### Data Flow
```
Editor → OpenJSCAD → Geometry → Renderer (R3F) → Canvas
```

---

## Core Modules

### Code Editor
Handles code input using Monaco, providing an IDE-like experience.

### JSCAD Engine
Executes OpenJSCAD code and generates geometry.

### 3D Renderer
Uses Three.js and react-three-fiber to render models.

### STL Parser & Exporter
Responsible for exporting models to STL and parsing uploaded files.

---

## Technical Decisions
- OpenJSCAD: enables procedural modeling via code
- Monaco: provides a real IDE experience
- Browser execution: removes backend dependency
- Three.js / R3F: efficient and flexible rendering
- Zustand: simple and lightweight global state
- Context API: scoped state for features
- Tailwind CSS: fast and consistent styling
- No external UI libraries: full control over UI

---

## Project Structure (Summary)
- components/ui: base UI primitives
- components/shared: shared components
- components/features: feature-specific components
- services: API logic and integrations
- hooks: reusable logic
- store: global state (Zustand)
- actions: server actions (future use)
- interfaces: global TypeScript interfaces
- utils: pure utility functions

---

## Constraints & Limitations
- STL to code conversion is experimental and may not be accurate
- Code execution in the browser may have performance limits
- Complex models may impact rendering performance
- No persistence or backend storage (initial version)

---

## Future Vision
- Save and load projects
- Share and export models
- Model preset library
- Real-time collaboration
- Improved STL to code conversion
