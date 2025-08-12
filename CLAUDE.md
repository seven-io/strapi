# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Strapi v4 plugin (@seven.io/strapi) for sending SMS messages and making text-to-speech calls via the seven.io service. The plugin integrates with Strapi's users-permissions system to send bulk messages to users based on their roles.

## Development Commands

Since this is a Strapi plugin, there are no specific build/test commands in this package. The plugin is meant to be installed in a Strapi v4 application where it will be built as part of the main Strapi project.

## Architecture

### Core Components (Strapi v4 Structure)

- **Backend**: Standard Strapi v4 plugin structure
  - `strapi-server.js` - Server-side plugin entry point
  - `server/` - Server-side code directory
    - `server/controllers/seven.js` - HTTP endpoints for plugin functionality
    - `server/services/store.js` - Settings storage service using Strapi's plugin store
    - `server/bootstrap.js` - Plugin initialization and validation
    - `server/routes/` - Route definitions
  - `Util.js` - Core utility class handling seven.io API integration and user management

- **Frontend**: React admin interface using Strapi v4 Design System
  - `strapi-admin.js` - Admin panel entry point
  - `admin/src/` - Admin interface source code
    - `admin/src/containers/` - Main UI containers (Settings, SMS, Voice)
    - `admin/src/components/` - Reusable form components (Filters, From, Text, To)
    - Uses React Router for navigation between plugin sections

### Key Dependencies (Strapi v4)

- `sms77-client` - Official seven.io client library
- `node-fetch` - HTTP client for API requests (v3.x for Node.js 16+)
- `@strapi/helper-plugin` - Strapi v4 admin utilities
- `@strapi/design-system` - Strapi v4 design system components
- `@strapi/icons` - Icon library for admin interface
- `react-intl` - Internationalization (German and English translations)

### Configuration

- Plugin settings stored via Strapi v4 plugin store system
- Default settings in `constants/defaultSettings.js`
- Environment variable `SEVEN_STRAPI_PHONE_ATTRIBUTE` configures user phone field (defaults to `mobile_phone`)

### Phone Attribute Requirement

The plugin requires a phone field on the users-permissions User model. By default it looks for `mobile_phone` but this can be customized via the `SEVEN_STRAPI_PHONE_ATTRIBUTE` environment variable. In v4, the model is referenced as `plugin::users-permissions.user`.

### API Integration (Updated for v4)

The plugin communicates with seven.io via the `sms77-client` library. The `Util.js` class handles:
- Client initialization with API key from settings
- User phone number collection using Strapi v4 Entity Service API (`strapi.entityService.findMany`)
- Message sending for both SMS and voice calls
- Response formatting and error handling

### Routes Structure (Strapi v4)

Plugin routes are defined in `server/routes/index.js`. Key endpoints:
- GET `/seven/plugin-settings` - Retrieve plugin configuration
- POST `/seven/plugin-settings` - Update plugin configuration  
- POST `/seven/sms` - Send SMS messages
- POST `/seven/voice` - Make text-to-speech calls
- GET `/seven/bulk-filters` - Get user role filters for bulk messaging

### Frontend State Management (v4 Design System)

The admin interface uses:
- Strapi v4 Design System components (Layout, HeaderLayout, ContentLayout, etc.)
- `@strapi/helper-plugin` utilities (request, useNotification)
- Standard React patterns with hooks for state management
- Settings are fetched/saved via API calls to the backend endpoints

### Migration Notes from v3 to v4

- Replaced `strapi-helper-plugin` with `@strapi/helper-plugin`
- Updated to use `@strapi/design-system` components
- Changed query API from `strapi.query()` to `strapi.entityService`
- Updated plugin registration format
- Removed v3-specific files (old config/, controllers/, services/ directories)
- Updated Node.js requirement to 16+ for node-fetch v3 compatibility