export interface BrowserInfo {
    name: 'Chrome' | 'Firefox' | 'Safari' | 'Unknown'
    version: number
}

export function useBrowserInfo(): BrowserInfo {
    if (!import.meta.client) {
        return { name: 'Unknown', version: 0 }
    }

    const ua = navigator.userAgent

    if (ua.includes('Chrome')) {
        const version = parseInt(ua.match(/Chrome\/(\d+)/)?.[1] ?? '0', 10)
        return { name: 'Chrome', version }
    }

    if (ua.includes('Firefox')) {
        const version = parseInt(ua.match(/Firefox\/(\d+)/)?.[1] ?? '0', 10)
        return { name: 'Firefox', version }
    }

    if (ua.includes('Safari') && !ua.includes('Chrome')) {
        const version = parseFloat(ua.match(/Version\/(\d+(\.\d+)?)/)?.[1] ?? '0')
        return { name: 'Safari', version }
    }

    return { name: 'Unknown', version: 0 }
}