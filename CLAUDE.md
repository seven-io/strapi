# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Strapi v5 plugin (@seven.io/strapi) written in TypeScript for sending SMS messages and making text-to-speech calls via the seven.io service. The plugin integrates with Strapi's users-permissions system to send bulk messages to users based on their roles.

## Development Commands

Since this is a Strapi plugin, there are no specific build/test commands in this package. The plugin is meant to be installed in a Strapi v5 application where it will be built as part of the main Strapi project.

## Architecture

### Core Components (Strapi v5 Structure)

- **Backend**: Standard Strapi v5 plugin structure
  - `strapi-server.js` - Server-side plugin factory function
  - `server/` - Server-side code directory
    - `server/controllers/seven.js` - HTTP endpoints for plugin functionality  
    - `server/services/store.js` - Settings storage service using Strapi's plugin store
    - `server/bootstrap.js` - Plugin initialization and validation
    - `server/routes/` - Route definitions
  - `Util.js` - Core utility class handling seven.io API integration and user management

- **Frontend**: React admin interface using Strapi v5 Admin API
  - `strapi-admin.js` - Admin panel entry point
  - `admin/src/` - Admin interface source code
    - `admin/src/pages/` - Page components (HomePage, SmsPage, VoicePage)
    - `admin/src/components/` - Reusable form components (Filters, From, To)
    - Uses React Router v6 for navigation between plugin pages

### Key Dependencies (Strapi v5 + TypeScript)

- `sms77-client` - Official seven.io client library
- `@strapi/admin` - Strapi v5 admin framework  
- `@strapi/design-system` - Strapi v5 design system components (v2.x)
- `@strapi/icons` - Icon library for admin interface (v2.x)
- `@strapi/typescript-utils` - Strapi TypeScript utilities and configurations
- `typescript` - TypeScript compiler (v5.x)
- `@types/react` - React TypeScript definitions
- `@types/react-dom` - React DOM TypeScript definitions
- `@types/node` - Node.js TypeScript definitions
- `react` - React 18.3+
- `react-router-dom` - React Router v6 for navigation
- `react-intl` - Internationalization (German and English translations)
- `styled-components` - CSS-in-JS styling (v6.x)

### Configuration

- Plugin settings stored via Strapi v5 plugin store system
- Default settings in `constants/defaultSettings.js`
- Environment variable `SEVEN_STRAPI_PHONE_ATTRIBUTE` configures user phone field (defaults to `mobile_phone`)

### Phone Attribute Requirement

The plugin requires a phone field on the users-permissions User model. By default it looks for `mobile_phone` but this can be customized via the `SEVEN_STRAPI_PHONE_ATTRIBUTE` environment variable. In v5, the model is referenced as `plugin::users-permissions.user`.

### API Integration (Updated for v5)

The plugin communicates with seven.io via the `sms77-client` library. The `Util.js` class handles:
- Client initialization with API key from settings
- User phone number collection using Strapi v5 Document Service API (`strapi.documents().findMany`)
- Message sending for both SMS and voice calls
- Response formatting and error handling
- Uses built-in fetch (no node-fetch dependency needed)

### Routes Structure (Strapi v5)

Plugin routes are defined in `server/routes/index.js`. Key endpoints:
- GET `/seven/plugin-settings` - Retrieve plugin configuration
- POST `/seven/plugin-settings` - Update plugin configuration  
- POST `/seven/sms` - Send SMS messages
- POST `/seven/voice` - Make text-to-speech calls
- GET `/seven/bulk-filters` - Get user role filters for bulk messaging

### Frontend State Management (v5 Admin API)

The admin interface uses:
- Strapi v5 Admin API components (Layouts, Page, Notifications)
- Strapi v5 Design System components (Grid, Box, Button, etc.)
- React Router v6 for page routing
- Built-in fetch for API calls (no helper-plugin request utility)
- Standard React patterns with hooks for state management

### TypeScript Implementation

- **Full TypeScript coverage**: All server and admin code written in TypeScript
- **Type definitions**: Custom type definitions for Strapi v5 APIs and plugin interfaces
- **Configuration files**: Separate `tsconfig.json` for server and admin code
- **Type safety**: Proper typing for all components, services, and utility functions
- **Interface definitions**: Well-defined interfaces for SMS/Voice parameters, roles, and settings

### File Structure (TypeScript)

```
src/plugins/seven/
├── types/
│   └── strapi.d.ts           # Server-side type definitions
├── server/
│   ├── controllers/seven.ts   # Typed controllers
│   ├── services/store.ts      # Typed services
│   └── [other].ts            # All TypeScript files
├── admin/src/
│   ├── types/admin.d.ts      # Admin-side type definitions
│   ├── components/           # Typed React components
│   ├── pages/               # Typed page components
│   └── utils/               # Typed utility functions
├── Util.ts                  # Main utility class (TypeScript)
├── tsconfig.json           # Root TypeScript configuration
└── admin/tsconfig.json     # Admin TypeScript configuration
```

### Migration Notes from v4 to v5 + TypeScript

- **TypeScript conversion**: Converted entire codebase from JavaScript to TypeScript
- **Type safety**: Added comprehensive type definitions for all APIs and interfaces
- **Updated plugin structure**: Factory functions with proper TypeScript typing
- **Document Service API**: Migrated to `strapi.documents()` with TypeScript support
- **Admin interface**: Strapi v5 Admin API patterns with full TypeScript integration
- **React components**: All components converted to TypeScript with proper prop typing
- **Modern tooling**: TypeScript 5.x with latest compiler options
- **Configuration**: Separate TypeScript configurations for server and admin code