import { UAParser } from "ua-parser-js";

export interface ParsedDeviceInfo {
    label: string;
    os: string;
}

export function parseDeviceInfo(
    userAgent: string | undefined,
): ParsedDeviceInfo | undefined {
    if (!userAgent) {
        return undefined;
    }

    const { browser, os, device } = UAParser(userAgent);

    const osName = os.name ?? "Неизвестная ОС";
    const browserName = browser.name ?? "Неизвестный браузер";
    const deviceLabel =
        device.type && device.type !== "desktop"
            ? ` (${device.model ?? device.type})`
            : "";

    return {
        label: `${osName} · ${browserName}${deviceLabel}`,
        os: osName.toLowerCase(),
    };
}
