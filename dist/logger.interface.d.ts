export interface Logger {
    error(logmessage: string, logPayload: string): void;
    info(logmessage: string, logPayload: string): void;
}
