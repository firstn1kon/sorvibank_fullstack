// Пустой базовый путь = same-origin: в dev запрос ловит vite-прокси (vite.config.ts),
// в докере — nginx (см. CLAUDE.md/деплой). Абсолютный URL нужен только если фронт
// и бэк реально разнесены по разным доменам — тогда задать VITE_API_URL на этапе билда.
export const API_URL = import.meta.env.VITE_API_URL || '/api';
