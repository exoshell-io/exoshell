import { defineExtensionMessaging } from '@webext-core/messaging';

interface ProtocolMap {
  runScript(script: string): void;
  toggleQuickBar(show?: boolean): void;
}

export const ipc = defineExtensionMessaging<ProtocolMap>();
