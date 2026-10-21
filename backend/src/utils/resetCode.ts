import { createResetCode, invalidateUserCodes } from '../models/passwordResetCode.model';

const RESET_CODE_TTL_MINUTES = Number(process.env.RESET_CODE_TTL_MINUTES ?? 15);

// Общая логика для /auth/restore и админского сброса пароля:
// старые коды пользователя удаляются, выдаётся новый одноразовый.
export async function issueResetCode(user: { id: string; email: string }) {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + RESET_CODE_TTL_MINUTES * 60 * 1000);

    await invalidateUserCodes(user.id);
    await createResetCode(user.id, code, expiresAt);

    // TODO: подключить реальную отправку письма (nodemailer / Resend). Пока код логируется.
    console.log(`[DEV] Код восстановления для ${user.email}: ${code} (действует ${RESET_CODE_TTL_MINUTES} мин)`);
}
