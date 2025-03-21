import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    trace: 'on',
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'], // 控制台报告
    ['allure-playwright'] // 启用 Allure 报告
  ],
});