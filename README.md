# IDMS

*Dummy Version*

## Overview

**IDMS** is designed to be the most user-friendly solution for managing **Inventory & Distributorship** in the supply chain industry.

- **Visually Delightful:** A clean, minimal interface that reduces cognitive load.
- **Quick to Start:** Preconfigured setup gets you up and running in minutes.
- **Effortless Navigation:** Move through the app with ease—via sidebar, shortcuts, or command palette.
- **Blazing Fast:** Optimized for instant, seamless performance.
- **Feature-Rich & Future-Ready:** Everything you need—and more—is built in.
- **Quality-of-Life Enhancements:** Thoughtfully designed features to elevate the user experience.
- **Fully Customizable:** Tailor the app to match your brand and workflow.

## Setup

### Backend

1. Clone the repository

```git
git clone https://github.com/jkcsoftwaresllp/ibserver.git
```

2. Install the dependencies using package manager of your choice

```bash
bun i
```

3. Create `.env` at project root

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=test
DB_PORT=3306
DB_NAME=idms

DOMAIN_NAME=localhost
PORT=8000

ACCESS_TOKEN_SECRET=e6b1d7f61f8e3a0f2db4c9fa06b4e71e1a8fd67a0c3c2d91f0e6f7f7b6a4d1cd
REFRESH_TOKEN_SECRET=Qw9vTg3dNmU1eGJZa29qc2Rsa1pWTWJjQnhnR2xuMkE

```

4. Initialize a mysql instance on your system, create database `idms` and migrate relevant tables from `src/shared/database/schema.sql`.

6. Start the server

```bash
bun dev
```
