import { defineExtensionMessaging } from '@webext-core/messaging';

interface ProtocolMap {
  runScript(script: string): void;
}

export const ipc = defineExtensionMessaging<ProtocolMap>();
