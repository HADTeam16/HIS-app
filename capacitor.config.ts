import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'his-app',
  webDir: 'dist/his-app/browser',
  server: {
    url: 'http://localhost:4200',
    cleartext: true
  }
};

export default config;
