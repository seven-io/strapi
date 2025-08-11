# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Strapi plugin for Seven.io SMS and text-to-speech services, **migrated to Strapi v5**. The plugin enables sending SMS messages and making text-to-speech calls through the Seven.io API within a Strapi CMS application.

**Key Components:**
- `@seven.io/strapi` npm package (v1.0.0 for Strapi v5)
- Strapi v5 plugin architecture with Plugin SDK
- React-based admin interface with internationalization (English/German)
- REST API endpoints for SMS/Voice functionality
- Integration with Strapi's users-permissions plugin

## Development Commands

```bash
# Build the plugin
npm run build

# Watch mode for development
npm run develop

# Verify plugin structure
npm run verify
```

## Architecture (Strapi v5)

### Core Structure
- **Entry Points**:
  - `strapi-server.js`: Server-side functionality entry point
  - `strapi-admin.js`: Admin panel integration entry point

- **Frontend (admin/)**: React components using Strapi Design System v2
  - `admin/src/containers/`: Main app components (App, Settings, SMS, Voice)
  - `admin/src/components/`: Reusable UI components (Filters, Forms, etc.)
  - `admin/src/translations/`: i18n support (en.json, de.json)

- **Backend (server/)**:
  - `server/controllers/seven.js`: HTTP request handlers with Document Service API
  - `server/services/store.js`: Settings persistence via plugin store
  - `server/routes/index.js`: Route definitions in v5 format
  - `server/config/index.js`: Plugin configuration

- **Utilities**:
  - `Util.js`: Core business logic updated for Document Service API
  - `constants/`: Default settings, parameters, and configuration values
  - Environment variable: `SEVEN_STRAPI_PHONE_ATTRIBUTE` (default: 'mobile_phone')

### Key Dependencies (Strapi v5)
- `@strapi/strapi`: ^5.0.0
- `@strapi/design-system`: ^2.0.0 (replaces strapi-helper-plugin)
- `@strapi/icons`: ^2.0.0
- `sms77-client`: Seven.io API client library
- `node-fetch`: HTTP requests (updated to v3)
- React 18, React Router v6

## API Changes (v3 to v5 Migration)

### Document Service API Migration
- **OLD (v3)**: `strapi.query('user', 'users-permissions').find()`
- **NEW (v5)**: `strapi.documents('plugin::users-permissions.user').findMany()`

### Plugin Service Access
- **OLD (v3)**: `strapi.plugins.seven.services.store`
- **NEW (v5)**: `strapi.plugin('seven').service('store')`

### Role Querying
- **OLD (v3)**: `strapi.query('role', 'users-permissions').find({_limit: -1})`
- **NEW (v5)**: `strapi.documents('plugin::users-permissions.role').findMany()`

## API Endpoints

The plugin exposes these REST endpoints under `/seven`:
- `GET /`: Plugin home page
- `GET /bulk-filters`: Get user roles for bulk messaging
- `GET|POST /plugin-settings`: Manage plugin configuration
- `GET /settings`: View email settings
- `POST /sms`: Send SMS messages
- `POST /voice`: Make text-to-speech calls

## User Phone Integration

The plugin integrates with Strapi's users-permissions system:
- Requires `mobile_phone` field on the `users-permissions_user` collection
- Phone attribute can be customized via `SEVEN_STRAPI_PHONE_ATTRIBUTE` environment variable
- Supports bulk messaging by user roles using Document Service API

## Migration Notes (v3 → v5)

- **Plugin SDK**: Built using `@strapi/sdk-plugin`
- **Design System**: Migrated from `strapi-helper-plugin` to `@strapi/design-system`
- **Router**: Updated from React Router v5 to v6 patterns
- **API Changes**: All database queries use Document Service API
- **Node.js**: Requires Node.js 18-20 (updated from 10-14)
- **Dependencies**: React 18, no more aliased dependencies