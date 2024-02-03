export type GptRequestMessage = { role: string, content: string };

export type GptRequestMessages = GptRequestMessage[];

export interface GptProviderInterface {
  runFullSync(text: string, preprend?: GptRequestMessages): Promise<string>;

  isActive(): boolean;
}
