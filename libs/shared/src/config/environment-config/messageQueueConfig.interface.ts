export interface IMessageQueueConfig {
  getMessageQueueUser(): string;
  getMessageQueuePass(): string;
  getMessageQueueHost(): string;
  getMessageQueueAuthQueue(): string;
}
